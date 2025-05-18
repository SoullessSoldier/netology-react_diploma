from flask import Flask, request, jsonify
import os
import time
import json
from flask_cors import CORS

# Загружаем данные из файлов
categories = json.load(open("data/categories.json"))
items = json.load(open("data/products.json"))
top_sale_ids = [66, 65, 73]
more_count = 6

def basic_item_mapper(item):
    """Создаем упрощенную версию товара"""
    return {
        "id": item["id"],
        "category": item["category"],
        "title": item["title"],
        "price": item["price"],
        "images": item["images"]
    }

def random_number(start, stop):
    """Генерируем случайное число между стартовым и конечным значением"""
    return int(random.uniform(start, stop))

def delayed_response(body=None, status=200, delay=0):
    """
    Возвращает промис, который выполняется спустя задержку (delay),
    отправляя response статус и тело ответа.
    """
    # Имитация задержки перед отправкой ответа
    time.sleep(delay / 1000)
    
    return jsonify(body), status

# Создаем приложение Flask
app = Flask(__name__)
CORS(app)
#for prod
#CORS(app, resources={r"/*": {"origins": "https://your-frontend-domain.com"}})

@app.route("/api/top-sales")
def top_sales():
    # Получаем товары топ-продаж
    result = list(map(basic_item_mapper, filter(lambda x: x['id'] in top_sale_ids, items)))
    return delayed_response(result)

@app.route("/api/categories")
def all_categories():
    # Отправляем список категорий
    return delayed_response(categories)

@app.route("/api/items")
def search_items():
    # Параметры фильтра товаров
    category_id = int(request.args.get("categoryId", 0))
    offset = int(request.args.get("offset", 0))
    query_string = request.args.get("q", "").strip().lower()

    # Фильтрация товаров
    filtered_items = [
        i for i in items
        if (category_id == 0 or i["category"] == category_id)
           and (i["title"].lower().find(query_string) != -1 or i["color"].lower() == query_string)
    ]
    
    # Ограничиваем выборку по количеству и возвращаем
    limited_items = map(basic_item_mapper, filtered_items[offset:offset+more_count])
    return delayed_response(list(limited_items))

@app.route("/api/items/<int:id>")
def single_item(id):
    # Поиск конкретного товара по ID
    found_item = next((x for x in items if x["id"] == id), None)
    if not found_item:
        return delayed_response({"message": "Item not found"}, 404)
    else:
        return delayed_response(found_item)

@app.route("/api/order", methods=["POST"])
def create_order():
    data = request.get_json(force=True)
    
    try:
        # Проверка обязательных полей заказа
        phone = str(data["owner"]["phone"])
        address = str(data["owner"]["address"])
        
        # Проверяем структуру списка продуктов
        if isinstance(data["items"], list) and len(data["items"]) > 0:
            for product in data["items"]:
                assert isinstance(product["id"], int) and product["id"] > 0
                assert isinstance(product["price"], float) and product["price"] > 0
                assert isinstance(product["count"], int) and product["count"] > 0
            
            # Заказ успешно проверен, возврат пустого тела и статуса 204
            return delayed_response(status=204)
        else:
            raise ValueError("Invalid order structure.")
    except Exception as e:
        print(e)
        return delayed_response({"message": f"Bad Request: {str(e)}"}, 400)

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 443))
    app.run(host="0.0.0.0", port=PORT)