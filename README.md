# netology-react_diploma

Окружение

Файл api.rest в папке бэка навел на мысль, что нужно установить расширение REST Client для VS Code, с этим плагином можно запускать запросы к бэку прямо в окне редактора с открытым файлом api.rest   

Требование про правила линтера airbnb отстало от современности - вышел ESLint 9  с новым форматом конфига и всё сломалось.  
Тем не менее, в проекте есть eslint с плагинами для реакта и prettier с рекомендованными и базовыми правилами соответственно.  
В VS Code включена настройка автоформатирования при выходе - "editor.formatOnSave": true  
Форматирование меняет код по правилам, eslint при запуске ругается на код, если ошибки есть, VS Code ошибки линтера подсвечивает.

Топик с SoF про airbnb: https://stackoverflow.com/questions/74925642/how-to-use-eslint-config-airbnb-with-the-new-eslint-config-spec

```sh
cd frontend
npm create vite@latest .
npm i -D eslint eslint-plugin-react eslint-plugin-react-hooks
npm i -D vite-plugin-eslint
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

```sh
cd backend
npm i
npm audit fix
```

ESLint & Prettier old stuff:
- https://dev.to/suprabhasupi/learn-to-configure-eslint-and-prettier-in-react-4gp0
- https://github.com/prettier/eslint-plugin-prettier
- https://prettier.io/docs/precommit
- https://dev.to/aolyang/eslint-9-flat-config-tutorial-2bm5
- https://react-v9.holt.courses/lessons/tools/linting
- https://store-restack.vercel.app/p/vite-knowledge-react-eslint-prettier-typescript
- https://www.geeksforgeeks.org/how-to-set-up-vite-with-eslint-and-prettier/
- https://dev.to/bushblade/add-eslint-to-a-react-vite-project-4pib
- https://eslint.org/docs/latest/use/configure/configuration-files#extending-configuration-files
- https://pkolt.ru/blog/eslint9/
- https://blog.logrocket.com/12-essential-eslint-rules-react/
- https://github.com/jsx-eslint/eslint-plugin-react
- https://www.robinwieruch.de/vite-eslint/
- https://eslint.org/docs/latest/use/getting-started
- https://www.freecodecamp.org/news/how-to-add-eslint-to-your-react-project/
- https://tproger.ru/articles/podgotovka-okruzhenija-react-prilozhenija-vscode-prettier-eslint-stylelint-husky
- https://habr.com/ru/articles/417841/
- https://github.com/airbnb/javascript
- https://github.com/airbnb/javascript/tree/master/react
- https://shaifarfan.com/blog/airbnb-eslint-prettier-setup-react-typescript/
- https://mwh-deploy.netlify.app/blog/react-eslint-airbnb-prettier
- https://stackoverflow.com/questions/71020035/setup-vite-template-react-and-eslint-airbnb


### Иконки для сайта
Создана favicon, сайт https://realfavicongenerator.net/

### Bootstrap
В версиях Bootstrap5 и Bootstrap 4.3.1 (из проекта) есть различия, пришлось использовать ту версию, которая указана в проекте.  
Хотя надо обновляться хотя бы до 4.6.2 или мигрировать на v5.


### Routing
С библиотекой react-router-dom@6 реализован роутинг - компоненты шапки сайта, баннера и подвала не перезагружаются, компоненты разных маршрутов отрисовываются внутри тега \<main\> с помощью элемента Outlet из баблиотеки роутинга.


### Создание статических компонентов

#### Header
Реализовано появление/скрытие поля поиска при клике по иконке поиска.  
Реализован переход на страницу корзины при клике на иконку корзины.  
При переходе по любым маршрутам (при клике на NavLink), поле поиска скрывается и восстанавливается изначальное состояние.


#### Footer
В представленной верстке есть ошибка, ширина футера визуально больше, чем у хидера, исправил.  
Открытый адрес электронной почты - это подарок ботам и спамерам. 


#### 404
Реализован компонент, отображающийся при переходе по неверному маршруту (404)


#### Хиты продаж
