# Expense Tracker

## About

This is a full stack project using Express, PostgreSQL (Prisma as ORM) and React.

## Prerequisites

Node.js, React.js

## Dependencies

Authentication:

-   [bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Backend framework related:

-   [express](https://expressjs.com/)
-   [express-async-handler](https://www.npmjs.com/package/express-async-handler)
-   [colors](https://www.npmjs.com/package/colors)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [morgan](https://www.npmjs.com/package/morgan)

DB related:

-   [pg](https://www.npmjs.com/package/pg): First try, then move to Prisma
-   [Prisma](https://www.prisma.io/)

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
# development (run this command on the project root)
$ npm run dev

# check prisma studio (db)
$ npx prisma studio

```

## Ports

-   Backend: `127.0.0.1:8080`
-   Frontend: `127.0.0.1:3000`
