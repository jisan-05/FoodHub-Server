import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import { AdminRouter } from "./middlewares/Admin/admin.routes";
import { CategoryRouter } from "./middlewares/Category/category.routes";
import { CustomerRouter } from "./middlewares/Customer/customer.router";
import { MealRouter } from "./middlewares/Meal/meal.router";
import { ordersRouter } from "./middlewares/Orders/orders.router";
import { ProviderRouter } from "./middlewares/Providers/provider.routes";
import { profileRouter } from "./middlewares/Users/users.routes";

const app: Application = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: [process.env.APP_URL as string, process.env.APP_URL2 as string],
//     credentials: true,
//   }),
// );

// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.APP_URL2, // Production frontend URL
].filter(Boolean); // Remove undefined values


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);




app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/provider/profile", ProviderRouter);

app.use("/api/categories", CategoryRouter);

app.use("/api/meals", MealRouter);

// customer feature

app.use("/api/customer", CustomerRouter);

// profile

app.use("/api/users", profileRouter);

app.use("/api/provider/orders", ordersRouter);

// admin
app.use("/api/admin/orders", AdminRouter);

app.get("/", (req, res) => {
  res.send("Hello,world");
});

export default app;
