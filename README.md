# MERN User Dashboard (Simplified Package)
This archive contains a working simplified MERN project (JavaScript) with:

- server: Express + Mongoose (CRUD /users)
- client: React (Vite) + Redux Toolkit + Formik + Yup (JS)
- mock: json-server for quick demo

## Quick start (mock)
1. Install dependencies:
   ```
   npm install
   npm --workspace mock install
   npm --workspace client install
   npm --workspace server install
   ```
2. Start mock API and client:
   ```
   npm run dev:mock
   npm run dev:client
   ```
3. Open http://localhost:5173

## Full backend (MongoDB)
1. Create server/.env with:
   MONGO_URI=mongodb://127.0.0.1:27017/mern_users
   ORIGIN=http://localhost:5173
   PORT=4000
2. Run:
   ```
   npm install
   npm run dev
   ```

