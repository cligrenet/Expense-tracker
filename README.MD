# Expense Tracker

## About

This is a full stack project using Express, PostgreSQL and React.

## Prerequisites

Node.js, React.js

## Dependencies

Authentication:

-   [bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Backend framework related:

-   [express](https://expressjs.com/)
-   [colors](https://www.npmjs.com/package/colors)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [morgan](https://www.npmjs.com/package/morgan)

DB related:

-   [pg](https://www.npmjs.com/package/pg): First try, then move to Prisma
-   [Prisma](https://www.prisma.io/)
-   Docker compose

Testing:

-   Jest
-   [SuperTest](https://github.com/visionmedia/supertest#readme): It extends another library SuperAgent, to provide a high-level abstraction for testing HTTP

Misc:

-   [concurrently](https://www.npmjs.com/package/concurrently)
-   [nodemon](https://www.npmjs.com/package/nodemon)

Frontend related:

-   [React Router V6](https://reactrouter.com/): Routing for React
-   [axios](https://axios-http.com/)
-   [react-icons](https://react-icons.github.io/react-icons/)
-   [tailwindcss](https://tailwindcss.com/)
-   [framer-motion](https://www.npmjs.com/package/framer-motion): Animation library for React
-   [Chart.js v3](https://www.chartjs.org/docs/latest/)
-   [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2#docs): Charts for React
-   [react-toastify](https://www.npmjs.com/package/react-toastify): Snackbar notifications for React
-   [react-modal](https://www.npmjs.com/package/react-modal): Accessible modal dialog component for React
-   [React Select](https://react-select.com/home): A select control build with and for React

## Installation

```bash
$ npm install
```

## Running the server

```bash
# development (run this command on the project root, concurrently)
$ npm run dev

# backend
npm run server

# frontend
$ npm start

# check prisma studio (run on backend dir, on port 5555)
$ npx dotenv -e .env -- prisma studio

# API e2e test
$ npm run test
$ npm run test:watch
$ npm run test:e2e

```

## Ports

-   Backend: `127.0.0.1:8080`
-   Frontend: `127.0.0.1:3000`

-   Docker dompose holds two dbs:
    ⋅⋅* Dev DB runs on 5434
    ⋅⋅* Test DB runs on 5435

## Screen shots

![alt text](https://github.com/cligrenet/Expense-tracker/blob/main/frontend/public/main.png 'main')
![alt text](https://github.com/cligrenet/Expense-tracker/blob/main/frontend/public/expenses.png 'expenses')
![alt text](https://github.com/cligrenet/Expense-tracker/blob/main/frontend/public/modal.png 'add transaction modal')
![alt text](https://github.com/cligrenet/Expense-tracker/blob/main/frontend/public/login.png 'log in')
![alt text](https://github.com/cligrenet/Expense-tracker/blob/main/frontend/public/signup.png 'sign up')
