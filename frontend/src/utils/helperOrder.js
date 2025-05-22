const isValidOrderData = (order) => {
  // Проверка владельца
  if (!order.owner || typeof order.owner !== "object") return false;
  if (
    !order.owner.phone ||
    typeof order.owner.phone !== "string" ||
    !order.owner.phone.match(/^\+7\d{10}$/)
  )
    return false;
  if (
    !order.owner.address ||
    typeof order.owner.address !== "string" ||
    order.owner.address.trim() === ""
  )
    return false;

  // Проверка списка товаров
  if (!Array.isArray(order.items) || order.items.length === 0) return false;

  // Проверка каждого товара
  for (const item of order.items) {
    if (!item.id || typeof item.id !== "number") return false;
    if (!item.price || typeof item.price !== "number") return false;
    if (!item.count || typeof item.count !== "number") return false;
  }

  return true;
};

export { isValidOrderData };
