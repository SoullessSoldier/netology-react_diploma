# netology-react_diploma

Окружение

Требование про правила линтера airbnb отстало от современности - вышел ESLint 9  с новым форматом конфига и всё сломалось.  
Тем не менее, в проекте есть eslint с плагинами и prettier с рекомендованными и базовыми правилами соответственно.  
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
- https://shaifarfan.com/blog/airbnb-eslint-prettier-setup-react-typescript/
- https://mwh-deploy.netlify.app/blog/react-eslint-airbnb-prettier
- https://stackoverflow.com/questions/71020035/setup-vite-template-react-and-eslint-airbnb
