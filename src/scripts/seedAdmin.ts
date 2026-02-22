import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import fetch from "node-fetch";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Mr. Admin",
      email: "admin@gmail.com",
      role: UserRole.ADMIN,
      password: "12345678"
    };
    // check user exist on db or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists !");
    }

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      },
    );

    if(signUpAdmin.status === 200){
      await prisma.user.update({
        where:{
          email:adminData.email
        },
        data:{
          emailVerified:true
        }
      })
    }

  } catch (error) {
    console.log(error);
  }
}

seedAdmin();
