import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
import fetch from "node-fetch";

async function seedAdmin() {
  try {
    const adminData = {
      name: "admin shaheb",
      email: "admin1122asas2s2a@gmail.com",
      role: UserRole.ADMIN,
      password: "admin1234"
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
