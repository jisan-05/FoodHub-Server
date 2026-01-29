import app from "./app";
import { prisma } from "./lib/prisma";

async function main() {
  const PORT = process.env.PORT || 5000

  try {
    await prisma.$connect()
    console.log("Connect to the Database Successfully");

    app.listen(PORT,()=>{
      console.log(`Server is Running on http://localhost:${PORT}`);
    })

  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()