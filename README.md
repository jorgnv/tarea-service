<h1 align="center">
  REST API Services
</h1>

This repository contain all the code that REST API Services Base use in the backend.

Fell free to create Issues or PR if you think the code can be better.

## 🚀 Quick start

1.  **Install dependencies.**

    ```shell
    cd tarea-services/
    npm i
    ```

2.  **Start developing.**

    Start it up.

    ```shell
    npm run dev
    ```

3.  **Open the source code and start editing!**

    The site is now running at `http://localhost:5000`!

    Open the `tarea-services` directory in your code editor of choice and edit. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── .eslintrc
    ├── .babelrc
    ├── .env.example
    ├── jest.config.js
    ├── bitbucket-pipelines.yml
    ├── index.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will use in the backend of your service. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`.eslintrc`**: This is a configuration file for [ESLint](https://eslint.org/). ESLint is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

6.  **`.babelrc`**: This is a configuration file for [Babel](https://babeljs.io/). Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

7.  **`.env.example`**: This is a configuration file to use environment variables and hide secret information out of the code. An _environment variable_ is a dynamic-named value that can affect the way running processes will behave on a computer.

8.  **`jest.config.js`**: This is a configuration file for [Jest](https://jestjs.io/). Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

9.  **`bitbucket-pipelines.yml`**: This is a configuration file for [Bitbucket Pipelines](https://bitbucket.org/product/en/features/pipelines). Integrated CI/CD for Bitbucket Cloud that's trivial to set up, automating your code from test to production.

10. **`ecosystem.config.js`**: This is a configuration file for [PM2](https://pm2.keymetrics.io/). Advanced process manager for production Node.js applications. Load balancer, logs facility, startup script, micro service management, at a glance.

11. **`Dockerfile`**: This is a configuration file for [Docker](https://www.docker.com/). Package Software into Standardized Units for Development, Shipment and Deployment

12. **`index.js`**: This is the entry point of your app were all the files come together to initialize the server and run the queries.

13. **`LICENSE`**: This GraphQL MongoDB Server is licensed under the MIT license.

14. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

15. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

16. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 How to use?

in the `package.json` you will se this scripts:

```json
{
  //..//
  "scripts": {
    "dev": "nodemon src/server.js --ext js --exec babel-node",
    "start": "node build/server.js",
    "build": "babel -d ./build ./src",
    "lint": "eslint .",
    "test": "npm run jest && npm run mocha",
    "jest": "jest --forceExit --detectOpenHandles",
    "mocha": "mocha --timeout 20000 --require @babel/register ./test/**/*.js --exit",
    "coverage": "nyc npm run test",
    "report": "nyc report --reporter=html && open coverage/index.html",
    "//": "If you are on Windows use 'start' instead of 'open'"
  }
  //...//
}
```

1.  **`dev`**: This script will initialize the app in development mode.

2.  **`start`**: This script will initialize the app in production mode.

3.  **`build`**: This script will build the application.

4.  **`lint`**: This script will search for code error with ESLint.

5.  **`test`**: This scripts will execute `jest` and `mocha` to test the code.

6.  **`jest`**: This script will execute `jest` to test the code.

7.  **`mocha`**: This script will execute `mocha` to test the code.

8.  **`coverage`**: This script will execute `test` and give a table with results in console.

9.  **`report`**: This script will going to create a report from the `coverage` that made before.

## 🎓 How to create a test?

Inside some folders like `graphql/types`, `graphql/resolvers` or `models` there is a folder named `__test__` and inside that we have the files that we are doing test before push to production, here is an example:

```javascript
// models/Todo.js

// Dependencies
import { Schema, model } from 'mongoose'

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Todo = model('todos', TodoSchema)

export default Todo
```

This is our model _Todo_ its a simple file that declare the type of fields, now inside our `models` folder we are going to create a folder named `__test__` and inside we are going to create a file named `Todo.test.js`, and we are going to create a simple test to see i f the `modelName` match:

```javascript
// models/__test__/Todo.test.js

// Model
import Todo from '../Todo'

describe('#Todo', () => {
  it('should have correct model name', () => {
    expect(Todo.modelName).toBe('todos')
  })
})
```

In this file we are creating a simple test that search for the name of the model and see if match, and if not the code is not going to be processed in production.

## 🤔 Docker?

We use Docker for create scalable applications using containers and exposing the port of the application in any server, this is the `Dockerfile` that we are using:

```Dockerfile
FROM keymetrics/pm2:10-alpine
ENV NODE_ENV production

COPY package*.json ./

RUN apk add --no-cache curl && \
    npm install @babel/cli @babel/core -g && \
    npm install && \
    rm -rf build/*

COPY . .

RUN npm run build && \
    rm -rf src/

EXPOSE 5000

CMD [ "npm", "run", "start" ]
```

Change it if you need to add new behavior or edit an existing one

## 💫 Deploy

To deploy the app follow the next steps:

1. Create a server (Amazon Web Services, Google Cloud Platform or Digital Ocean)
2. Install Docker in the server
3. Clone the repo in the server
4. Enter to the folder of the project
5. Build the image of docker with `docker build -t restapi-services .` -- ensure you have docker service running and run the service with `docker run -p 5000:5000 restapi-services`
