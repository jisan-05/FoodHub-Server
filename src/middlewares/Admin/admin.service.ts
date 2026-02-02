import { prisma } from "../../lib/prisma"

const getAllOrders = async() =>{
  return await prisma.order.findMany()
}

export const adminService = {
getAllOrders
}