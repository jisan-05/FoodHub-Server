import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { ProviderRouter } from "./middlewares/Providers/provider.routes";
import { CategoryRouter } from "./middlewares/Category/category.routes";
import { MealRouter } from "./middlewares/Meal/meal.router";
import { CustomerRouter } from "./middlewares/Customer/customer.router";
import { profileRouter } from "./middlewares/Users/users.routes";
import { ordersRouter } from "./middlewares/Orders/orders.router";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
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

app.get("/", (req, res) => {
  res.send("Hello,world");
});

export default app;
