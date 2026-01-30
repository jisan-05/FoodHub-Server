import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express"
import { auth } from "./lib/auth";
import cors from "cors"
import { ProviderRouter } from "./middlewares/Providers/provider.routes";

const app:Application = express()

app.use(express.json())

app.use(cors({
  origin:process.env.APP_URL || "http://localhost:4000",
  credentials:true
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use("/api/provider",ProviderRouter)

app.get("/",(req,res)=>{
  res.send("Hello,world")
})

export default app;