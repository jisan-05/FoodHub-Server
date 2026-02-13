var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.3.0",
      "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
      "activeProvider": "postgresql",
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n// User schema from better auth\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role UserRole @default(CUSTOMER)\n\n  userStatus      UserStatus        @default(ACTIVATE)\n  providerProfile ProviderProfile[]\n  orders          Order[]\n  reviews         Review[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserRole {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVATE\n  SUSPENDED\n}\n\n// Provider Model\n\nmodel ProviderProfile {\n  id     String @id @default(uuid())\n  userId String\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  restaurantName String\n  address        String\n  description    String?\n  image          String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  meals          Meal[]\n  orders         Order[]\n}\n\n// Category Model\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String   @unique\n  description String?\n  image       String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  meals       Meal[]\n}\n\nmodel Meal {\n  id                String             @id @default(uuid())\n  name              String\n  description       String?\n  price             Float\n  image             String?\n  categoryId        String\n  category          Category           @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n  providerId        String\n  provider          ProviderProfile    @relation(fields: [providerId], references: [id])\n  createdAt         DateTime           @default(now())\n  updatedAt         DateTime           @updatedAt\n  orderItems        OrderItem[]\n  reviews           Review[]\n  orderItemForCarts OrderItemForCart[]\n}\n\n// Order model\n\nmodel Order {\n  id                String             @id @default(uuid())\n  customerId        String\n  customer          User               @relation(fields: [customerId], references: [id])\n  providerId        String\n  provider          ProviderProfile    @relation(fields: [providerId], references: [id])\n  status            OrderStatus        @default(PLACED)\n  address           String\n  createdAt         DateTime           @default(now())\n  updatedAt         DateTime           @updatedAt\n  orderItems        OrderItem[]\n  orderItemForCarts OrderItemForCart[]\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nmodel OrderItem {\n  id      String @id @default(uuid())\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  mealId  String\n  meal    Meal   @relation(fields: [mealId], references: [id], onDelete: Cascade)\n\n  quantity Int\n  price    Float\n}\n\nmodel OrderItemForCart {\n  id      String @id @default(uuid())\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  mealId  String\n  meal    Meal   @relation(fields: [mealId], references: [id], onDelete: Cascade)\n\n  quantity Int\n  price    Float\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int\n  comment String?\n  mealId  String\n  meal    Meal    @relation(fields: [mealId], references: [id], onDelete: Cascade)\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n\n  @@unique([mealId, userId]) // one review per meal per user\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"userStatus","kind":"enum","type":"UserStatus"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"orderItemForCarts","kind":"object","type":"OrderItemForCart","relationName":"MealToOrderItemForCart"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"orderItemForCarts","kind":"object","type":"OrderItemForCart","relationName":"OrderToOrderItemForCart"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"}],"dbName":null},"OrderItemForCart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItemForCart"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItemForCart"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext, NullTypes2, TransactionIsolationLevel, defineExtension;
var init_prismaNamespace = __esm({
  "generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// generated/prisma/enums.ts
var init_enums = __esm({
  "generated/prisma/enums.ts"() {
    "use strict";
  }
});

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";
var PrismaClient;
var init_client = __esm({
  "generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
    PrismaClient = getPrismaClientClass();
  }
});

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    "use strict";
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth;
var init_auth = __esm({
  "src/lib/auth.ts"() {
    "use strict";
    init_prisma();
    auth = betterAuth({
      database: prismaAdapter(prisma, {
        provider: "postgresql"
      }),
      trustedOrigins: [process.env.APP_URL],
      // ✅ SESSION CONFIG (from docs)
      session: {
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60
          // 5 minutes
        }
      },
      // ✅ ADVANCED CONFIG (from docs)
      advanced: {
        cookiePrefix: "better-auth",
        useSecureCookies: process.env.NODE_ENV === "production",
        crossSubDomainCookies: {
          enabled: false
        },
        disableCSRFCheck: true
        // Postman / mobile app support
      },
      // ✅ USER EXTRA FIELDS
      user: {
        additionalFields: {
          role: {
            type: "string",
            defaultValue: "CUSTOMER",
            required: false
          },
          userStatus: {
            type: "string",
            defaultValue: "ACTIVATE",
            required: false
          }
        }
      },
      // ✅ EMAIL/PASSWORD LOGIN
      emailAndPassword: {
        enabled: true
      },
      // ✅ GOOGLE LOGIN
      socialProviders: {
        google: {
          prompt: "select_account consent",
          accessType: "offline",
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }
      }
    });
  }
});

// src/middlewares/auth.ts
var auth2, auth_default;
var init_auth2 = __esm({
  "src/middlewares/auth.ts"() {
    "use strict";
    init_auth();
    auth2 = (...roles) => {
      return async (req, res, next) => {
        try {
          const session = await auth.api.getSession({
            headers: req.headers
          });
          if (!session) {
            return res.status(401).json({
              success: false,
              message: "You are not authorized!"
            });
          }
          req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role,
            emailVerified: session.user.emailVerified
          };
          if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
              success: false,
              message: "Forbidden ! You don't have permission to access the resources"
            });
          }
          next();
        } catch (error) {
          next(error);
        }
      };
    };
    auth_default = auth2;
  }
});

// src/middlewares/Admin/admin.service.ts
var getAllOrders, adminService;
var init_admin_service = __esm({
  "src/middlewares/Admin/admin.service.ts"() {
    "use strict";
    init_prisma();
    getAllOrders = async () => {
      return await prisma.order.findMany();
    };
    adminService = {
      getAllOrders
    };
  }
});

// src/middlewares/Admin/admin.controller.ts
var getAllOrders2, adminController;
var init_admin_controller = __esm({
  "src/middlewares/Admin/admin.controller.ts"() {
    "use strict";
    init_admin_service();
    getAllOrders2 = async (req, res) => {
      try {
        const result = await adminService.getAllOrders();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get all category failed!",
          details: error
        });
      }
    };
    adminController = {
      getAllOrders: getAllOrders2
    };
  }
});

// src/middlewares/Admin/admin.routes.ts
import express from "express";
var router, AdminRouter;
var init_admin_routes = __esm({
  "src/middlewares/Admin/admin.routes.ts"() {
    "use strict";
    init_auth2();
    init_admin_controller();
    router = express.Router();
    router.get("/", auth_default("ADMIN" /* ADMIN */), adminController.getAllOrders);
    AdminRouter = router;
  }
});

// src/middlewares/Category/category.service.ts
var createCategory, getAllCategories, updateCategory, deleteCategory, categoryService;
var init_category_service = __esm({
  "src/middlewares/Category/category.service.ts"() {
    "use strict";
    init_prisma();
    createCategory = async (payload) => {
      const result = await prisma.category.create({
        data: {
          ...payload
        }
      });
      return result;
    };
    getAllCategories = async () => {
      return await prisma.category.findMany();
    };
    updateCategory = async (categoryId, payload) => {
      const result = await prisma.category.update({
        where: {
          id: categoryId
        },
        data: {
          ...payload
        }
      });
      return result;
    };
    deleteCategory = async (categoryId) => {
      return await prisma.category.delete({
        where: {
          id: categoryId
        }
      });
    };
    categoryService = {
      createCategory,
      getAllCategories,
      updateCategory,
      deleteCategory
    };
  }
});

// src/middlewares/Category/category.controller.ts
var createCategory2, getAllCategories2, updateCategory2, deleteCategory2, categoryController;
var init_category_controller = __esm({
  "src/middlewares/Category/category.controller.ts"() {
    "use strict";
    init_category_service();
    createCategory2 = async (req, res) => {
      try {
        const result = await categoryService.createCategory(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "create category failed!",
          details: error
        });
      }
    };
    getAllCategories2 = async (req, res) => {
      try {
        const result = await categoryService.getAllCategories();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get all category failed!",
          details: error
        });
      }
    };
    updateCategory2 = async (req, res) => {
      try {
        const { categoryId } = req.params;
        const result = await categoryService.updateCategory(categoryId, req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "create category failed!",
          details: error
        });
      }
    };
    deleteCategory2 = async (req, res) => {
      try {
        const { categoryId } = req.params;
        const result = await categoryService.deleteCategory(categoryId);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "create category failed!",
          details: error
        });
      }
    };
    categoryController = {
      createCategory: createCategory2,
      getAllCategories: getAllCategories2,
      updateCategory: updateCategory2,
      deleteCategory: deleteCategory2
    };
  }
});

// src/middlewares/Category/category.routes.ts
import express2 from "express";
var router2, CategoryRouter;
var init_category_routes = __esm({
  "src/middlewares/Category/category.routes.ts"() {
    "use strict";
    init_auth2();
    init_category_controller();
    router2 = express2.Router();
    router2.post("/", auth_default(), categoryController.createCategory);
    router2.get("/", categoryController.getAllCategories);
    router2.patch("/:categoryId", auth_default("ADMIN" /* ADMIN */), categoryController.updateCategory);
    router2.delete("/:categoryId", auth_default("ADMIN" /* ADMIN */), categoryController.deleteCategory);
    CategoryRouter = router2;
  }
});

// src/middlewares/Customer/customer.service.ts
var addToCart, placeOrder, getMyOrders, getMyOrdersCard, getSingleOrder, leaveReview, getReviews, updateProfile, CustomerService;
var init_customer_service = __esm({
  "src/middlewares/Customer/customer.service.ts"() {
    "use strict";
    init_prisma();
    addToCart = async (payload, userId) => {
      const meal = await prisma.meal.findUniqueOrThrow({ where: { id: payload.mealId } });
      let order = await prisma.order.findFirst({
        where: { customerId: userId, status: "PLACED", providerId: meal.providerId }
      });
      if (!order) {
        order = await prisma.order.create({
          data: { customerId: userId, providerId: meal.providerId, status: "PLACED", address: "" }
        });
      }
      const existingCartItem = await prisma.orderItemForCart.findFirst({
        where: { orderId: order.id, mealId: meal.id }
      });
      if (existingCartItem) {
        await prisma.orderItemForCart.update({
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + payload.quantity, price: meal.price * (existingCartItem.quantity + payload.quantity) }
        });
      } else {
        await prisma.orderItemForCart.create({
          data: { orderId: order.id, mealId: meal.id, quantity: payload.quantity, price: meal.price * payload.quantity }
        });
      }
      return { message: "Added to cart \u2705" };
    };
    placeOrder = async (data, userId) => {
      const carts = await prisma.order.findMany({
        where: { customerId: userId },
        include: { orderItemForCarts: true }
      });
      if (!carts.length) throw new Error("No cart found");
      for (const cart of carts) {
        if (!cart.orderItemForCarts.length) continue;
        const orderItemsData = cart.orderItemForCarts.map((item) => ({
          orderId: cart.id,
          mealId: item.mealId,
          quantity: item.quantity,
          price: item.price
        }));
        await prisma.orderItem.createMany({ data: orderItemsData });
        await prisma.order.update({
          where: { id: cart.id },
          data: { address: data.address, status: "PLACED" }
        });
        await prisma.orderItemForCart.deleteMany({ where: { orderId: cart.id } });
      }
      return { message: "Checkout completed \u2705" };
    };
    getMyOrders = async (customerId) => {
      const result = await prisma.order.findMany({
        where: {
          customerId
        },
        include: {
          orderItems: {
            include: {
              meal: true
              // includes meal details for each order item
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      return result;
    };
    getMyOrdersCard = async (customerId) => {
      const result = await prisma.order.findMany({
        where: {
          customerId
        },
        include: {
          // Include regular order items
          orderItems: {
            include: {
              meal: true
            }
          },
          // Include cart order items
          orderItemForCarts: {
            include: {
              meal: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      return result;
    };
    getSingleOrder = async (orderId, customerId) => {
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          customerId
        },
        include: {
          orderItems: {
            include: {
              meal: true
            }
          },
          provider: true
        }
      });
      return order;
    };
    leaveReview = async (payload, userId) => {
      const order = await prisma.order.findFirst({
        where: {
          id: payload.orderId
        },
        include: {
          orderItems: true
        }
      });
      if (order?.status !== "DELIVERED") {
        throw new Error("You can review only after delivery");
      }
      const orderedMealIds = order.orderItems.map((i) => i.mealId);
      if (!orderedMealIds.includes(payload.mealId)) {
        throw new Error("You did not order this meal");
      }
      const result = await prisma.review.create({
        data: {
          mealId: payload.mealId,
          userId,
          rating: payload.rating,
          comment: payload.comment
        }
      });
      return result;
    };
    getReviews = async () => {
      return await prisma.review.findMany();
    };
    updateProfile = async () => {
    };
    CustomerService = {
      addToCart,
      placeOrder,
      leaveReview,
      getReviews,
      getMyOrders,
      updateProfile,
      getSingleOrder,
      getMyOrdersCard
    };
  }
});

// src/middlewares/Customer/customer.controller.ts
var addToCart2, placeOrder2, getMyOrders2, getMyOrdersCard2, getSingleOrder2, leaveReview2, getReviews2, customerController;
var init_customer_controller = __esm({
  "src/middlewares/Customer/customer.controller.ts"() {
    "use strict";
    init_customer_service();
    addToCart2 = async (req, res) => {
      try {
        if (!req.user) {
          return;
        }
        const userId = req.user.id;
        const result = await CustomerService.addToCart(req.body, userId);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "add To Card failed!",
          details: error
        });
      }
    };
    placeOrder2 = async (req, res) => {
      try {
        if (!req.user) {
          return res.status(400).json({
            error: "Unauthorized!"
          });
        }
        const userId = req.user.id;
        const result = await CustomerService.placeOrder(req.body, userId);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Place Order failed!",
          details: error
        });
      }
    };
    getMyOrders2 = async (req, res) => {
      try {
        if (!req.user) {
          return res.status(400).json({
            error: "Unauthorized!"
          });
        }
        const customerId = req.user?.id;
        const result = await CustomerService.getMyOrders(customerId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get my orders failed!",
          details: error
        });
      }
    };
    getMyOrdersCard2 = async (req, res) => {
      try {
        if (!req.user) {
          return res.status(400).json({
            error: "Unauthorized!"
          });
        }
        const customerId = req.user?.id;
        const result = await CustomerService.getMyOrdersCard(customerId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get my orders failed!",
          details: error
        });
      }
    };
    getSingleOrder2 = async (req, res) => {
      try {
        const customerId = req.user?.id;
        const { orderId } = req.params;
        if (!orderId) {
          return;
        }
        const result = await CustomerService.getSingleOrder(
          orderId,
          customerId
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get single orders failed!",
          details: error
        });
      }
    };
    leaveReview2 = async (req, res) => {
      try {
        const userId = req.user?.id;
        const result = await CustomerService.leaveReview(
          req.body,
          userId
        );
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Create Reviews failed!",
          details: error
        });
      }
    };
    getReviews2 = async (req, res) => {
      try {
        const result = await CustomerService.getReviews();
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Create Reviews failed!",
          details: error
        });
      }
    };
    customerController = {
      addToCart: addToCart2,
      placeOrder: placeOrder2,
      getMyOrders: getMyOrders2,
      getSingleOrder: getSingleOrder2,
      leaveReview: leaveReview2,
      getReviews: getReviews2,
      getMyOrdersCard: getMyOrdersCard2
    };
  }
});

// src/middlewares/Customer/customer.router.ts
import express3 from "express";
var router3, CustomerRouter;
var init_customer_router = __esm({
  "src/middlewares/Customer/customer.router.ts"() {
    "use strict";
    init_auth2();
    init_customer_controller();
    router3 = express3.Router();
    router3.post("/cart/add", auth_default(), customerController.addToCart);
    router3.post("/orders/checkout", auth_default(), customerController.placeOrder);
    router3.get("/orders/status/:id", auth_default(), customerController.placeOrder);
    router3.get("/orders", auth_default(), customerController.getMyOrders);
    router3.get("/orders-cart", auth_default(), customerController.getMyOrdersCard);
    router3.get("/orders/:orderId", auth_default(), customerController.getSingleOrder);
    router3.post("/reviews", auth_default("CUSTOMER" /* USER */), customerController.leaveReview);
    router3.get("/reviews", customerController.getReviews);
    CustomerRouter = router3;
  }
});

// src/middlewares/Meal/meal.service.ts
var createMeal, getAllMeals, getMealsByProvider, getMealById, updateMeals, deleteMeal, mealService;
var init_meal_service = __esm({
  "src/middlewares/Meal/meal.service.ts"() {
    "use strict";
    init_prisma();
    createMeal = async (payload, userId) => {
      const providerProfile = await prisma.providerProfile.findFirst({
        where: { userId }
      });
      if (!providerProfile) {
        throw new Error("Provider profile not found");
      }
      const result = await prisma.meal.create({
        data: {
          ...payload,
          providerId: providerProfile.id
        }
      });
      return result;
    };
    getAllMeals = async (categoryId, minPrice, maxPrice, mealName) => {
      console.log(categoryId, minPrice, maxPrice, mealName);
      const min = minPrice ? Number(minPrice) : void 0;
      const max = maxPrice ? Number(maxPrice) : void 0;
      const where = {};
      if (categoryId) where.categoryId = categoryId;
      if (mealName) {
        where.name = { contains: mealName, mode: "insensitive" };
      }
      if (min !== void 0 || max !== void 0) {
        where.price = {};
        if (min !== void 0) where.price.gte = min;
        if (max !== void 0) where.price.lte = max;
      }
      return await prisma.meal.findMany({
        where
      });
    };
    getMealsByProvider = async (providerId) => {
      return await prisma.meal.findMany({
        where: {
          providerId
        }
      });
    };
    getMealById = async (mealId) => {
      return await prisma.meal.findUnique({
        where: {
          id: mealId
        }
      });
    };
    updateMeals = async (mealsId, data) => {
      const mealsData = await prisma.meal.findUniqueOrThrow({
        where: {
          id: mealsId
        },
        select: {
          id: true
        }
      });
      const result = await prisma.meal.update({
        where: {
          id: mealsData.id
        },
        data: {
          ...data
        }
      });
      return result;
    };
    deleteMeal = async (mealsId) => {
      const result = await prisma.meal.delete({
        where: {
          id: mealsId
        }
      });
      return result;
    };
    mealService = {
      createMeal,
      getAllMeals,
      getMealsByProvider,
      updateMeals,
      getMealById,
      deleteMeal
    };
  }
});

// src/middlewares/Meal/meal.controller.ts
var createMeal2, getAllMeals2, getMealsByProvider2, getMealById2, updateMeals2, deleteMeal2, mealController;
var init_meal_controller = __esm({
  "src/middlewares/Meal/meal.controller.ts"() {
    "use strict";
    init_meal_service();
    createMeal2 = async (req, res) => {
      try {
        if (!req.user) {
          throw new Error("You are Unauthorized");
        }
        const userId = req.user.id;
        const result = await mealService.createMeal(req.body, userId);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Meal Create failed!",
          details: error
        });
      }
    };
    getAllMeals2 = async (req, res) => {
      try {
        const { categoryId, minPrice, maxPrice, mealName } = req.query;
        const minPriceNumber = req.query.minPrice !== void 0 ? Number(req.query.minPrice) : void 0;
        const maxPriceNumber = req.query.maxPrice !== void 0 ? Number(req.query.maxPrice) : void 0;
        const result = await mealService.getAllMeals(
          categoryId,
          minPriceNumber,
          maxPriceNumber,
          mealName
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Get Meals failed!",
          details: error
        });
      }
    };
    getMealsByProvider2 = async (req, res) => {
      try {
        const { providerId } = req.params;
        const result = await mealService.getMealsByProvider(providerId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Get Meals failed!",
          details: error
        });
      }
    };
    getMealById2 = async (req, res) => {
      try {
        const { mealId } = req.params;
        const result = await mealService.getMealById(mealId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get single meal failed!",
          details: error
        });
      }
    };
    updateMeals2 = async (req, res) => {
      try {
        const { mealId } = req.params;
        const result = await mealService.updateMeals(mealId, req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Meal Update failed!",
          details: error
        });
      }
    };
    deleteMeal2 = async (req, res) => {
      try {
        const { mealId } = req.params;
        const result = await mealService.deleteMeal(mealId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Meal Delete failed!",
          details: error
        });
      }
    };
    mealController = {
      createMeal: createMeal2,
      getAllMeals: getAllMeals2,
      getMealsByProvider: getMealsByProvider2,
      updateMeals: updateMeals2,
      getMealById: getMealById2,
      deleteMeal: deleteMeal2
    };
  }
});

// src/middlewares/Meal/meal.router.ts
import express4 from "express";
var router4, MealRouter;
var init_meal_router = __esm({
  "src/middlewares/Meal/meal.router.ts"() {
    "use strict";
    init_auth2();
    init_meal_controller();
    router4 = express4.Router();
    router4.post("/", auth_default(), mealController.createMeal);
    router4.get("/", mealController.getAllMeals);
    router4.get("/provider/:providerId", mealController.getMealsByProvider);
    router4.get("/:mealId", mealController.getMealById);
    router4.patch("/:mealId", auth_default(), mealController.updateMeals);
    router4.delete("/:mealId", auth_default(), mealController.deleteMeal);
    MealRouter = router4;
  }
});

// src/middlewares/Orders/orders.service.ts
var getProviderOrders, updateOrderStatus, ordersService;
var init_orders_service = __esm({
  "src/middlewares/Orders/orders.service.ts"() {
    "use strict";
    init_prisma();
    getProviderOrders = async (providerId) => {
      const provider = await prisma.providerProfile.findFirst({
        where: {
          userId: providerId
        }
      });
      const result = await prisma.order.findMany({
        where: {
          providerId: provider.id
        },
        include: {
          orderItems: {
            include: { meal: true }
          },
          customer: true
        },
        orderBy: { createdAt: "desc" }
      });
      return result;
    };
    updateOrderStatus = async (status, userId, orderId) => {
      const provider = await prisma.providerProfile.findFirst({
        where: { userId }
      });
      const order = await prisma.order.findUnique({
        where: { id: orderId }
      });
      if (!order) {
        return;
      }
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status
        }
      });
      return updatedOrder;
    };
    ordersService = {
      getProviderOrders,
      updateOrderStatus
    };
  }
});

// src/middlewares/Orders/orders.controller.ts
var getProviderOrders2, updateOrderStatus2, ordersController;
var init_orders_controller = __esm({
  "src/middlewares/Orders/orders.controller.ts"() {
    "use strict";
    init_orders_service();
    getProviderOrders2 = async (req, res) => {
      try {
        const id = req.user?.id;
        const result = await ordersService.getProviderOrders(id);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get Provider all Orders failed!",
          details: error
        });
      }
    };
    updateOrderStatus2 = async (req, res) => {
      try {
        const { status } = req.body;
        const userId = req.user?.id;
        const orderId = req.params.id;
        const result = await ordersService.updateOrderStatus(status, userId, orderId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get Provider all Orders failed!",
          details: error
        });
      }
    };
    ordersController = {
      getProviderOrders: getProviderOrders2,
      updateOrderStatus: updateOrderStatus2
    };
  }
});

// src/middlewares/Orders/orders.router.ts
import { Router as Router3 } from "express";
var router5, ordersRouter;
var init_orders_router = __esm({
  "src/middlewares/Orders/orders.router.ts"() {
    "use strict";
    init_orders_controller();
    init_auth2();
    router5 = Router3();
    router5.get("/", auth_default(), ordersController.getProviderOrders);
    router5.patch("/:id", auth_default(), ordersController.updateOrderStatus);
    ordersRouter = router5;
  }
});

// src/middlewares/Providers/provider.service.ts
var createProvider, getAllProvider, getProviderById, providerService;
var init_provider_service = __esm({
  "src/middlewares/Providers/provider.service.ts"() {
    "use strict";
    init_prisma();
    createProvider = async (payload, userId) => {
      try {
        const result = await prisma.providerProfile.create({
          data: {
            userId,
            ...payload
          }
        });
        return result;
      } catch (error) {
      }
    };
    getAllProvider = async () => {
      return await prisma.providerProfile.findMany();
    };
    getProviderById = async (providerId) => {
      const result = await prisma.providerProfile.findUnique({
        where: {
          id: providerId
        },
        include: {
          meals: true
        }
      });
      return result;
    };
    providerService = {
      createProvider,
      getAllProvider,
      getProviderById
    };
  }
});

// src/middlewares/Providers/provider.controller.ts
var createProvider2, getAllProvider2, getProviderById2, ProviderController;
var init_provider_controller = __esm({
  "src/middlewares/Providers/provider.controller.ts"() {
    "use strict";
    init_provider_service();
    createProvider2 = async (req, res) => {
      try {
        if (!req.user) {
          return res.status(400).json({
            error: "Unauthorized"
          });
        }
        const userId = req.user.id;
        const result = await providerService.createProvider(req.body, userId);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({
          error: "provider create failed!",
          details: error
        });
      }
    };
    getAllProvider2 = async (req, res) => {
      try {
        const result = await providerService.getAllProvider();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "Get Provider failed!",
          details: error
        });
      }
    };
    getProviderById2 = async (req, res) => {
      try {
        const { providerId } = req.params;
        const result = await providerService.getProviderById(providerId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get single Provider failed!",
          details: error
        });
      }
    };
    ProviderController = {
      createProvider: createProvider2,
      getAllProvider: getAllProvider2,
      getProviderById: getProviderById2
    };
  }
});

// src/middlewares/Providers/provider.routes.ts
import express5 from "express";
var router6, ProviderRouter;
var init_provider_routes = __esm({
  "src/middlewares/Providers/provider.routes.ts"() {
    "use strict";
    init_provider_controller();
    init_auth2();
    router6 = express5.Router();
    router6.post("/", auth_default("PROVIDER" /* PROVIDER */), ProviderController.createProvider);
    router6.get("/", ProviderController.getAllProvider);
    router6.get("/:providerId", auth_default(), ProviderController.getProviderById);
    ProviderRouter = router6;
  }
});

// src/middlewares/Users/users.service.ts
var getMyProfile, getAllUser, updateMyProfile, updateUserStatus, profileService;
var init_users_service = __esm({
  "src/middlewares/Users/users.service.ts"() {
    "use strict";
    init_prisma();
    getMyProfile = async (userId) => {
      const result = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      return result;
    };
    getAllUser = async () => {
      const result = await prisma.user.findMany();
      return result;
    };
    updateMyProfile = async (userId, name, image) => {
      const result = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          image
        }
      });
      return result;
    };
    updateUserStatus = async (userId, status) => {
      const result = await prisma.user.update({
        where: { id: userId },
        data: {
          userStatus: status
        }
      });
      return result;
    };
    profileService = {
      getMyProfile,
      updateMyProfile,
      getAllUser,
      updateUserStatus
    };
  }
});

// src/middlewares/Users/users.controller.ts
var getMyProfile2, getAllUser2, updateMyProfile2, updateUserStatus2, profileController;
var init_users_controller = __esm({
  "src/middlewares/Users/users.controller.ts"() {
    "use strict";
    init_users_service();
    getMyProfile2 = async (req, res) => {
      try {
        const userId = req.user?.id;
        const result = await profileService.getMyProfile(userId);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get my profile failed!",
          details: error
        });
      }
    };
    getAllUser2 = async (req, res) => {
      try {
        const result = await profileService.getAllUser();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "get all user profile failed!",
          details: error
        });
      }
    };
    updateMyProfile2 = async (req, res) => {
      try {
        const userId = req.user?.id;
        const { name, image } = req.body;
        const result = await profileService.updateMyProfile(
          userId,
          name,
          image
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "update profile failed!",
          details: error
        });
      }
    };
    updateUserStatus2 = async (req, res) => {
      try {
        const { userId, status } = req.body;
        const result = await profileService.updateUserStatus(
          userId,
          status
        );
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({
          error: "update profile failed!",
          details: error
        });
      }
    };
    profileController = {
      getMyProfile: getMyProfile2,
      updateMyProfile: updateMyProfile2,
      updateUserStatus: updateUserStatus2,
      getAllUser: getAllUser2
    };
  }
});

// src/middlewares/Users/users.routes.ts
import { Router as Router5 } from "express";
var router7, profileRouter;
var init_users_routes = __esm({
  "src/middlewares/Users/users.routes.ts"() {
    "use strict";
    init_users_controller();
    init_auth2();
    router7 = Router5();
    router7.get("/me", auth_default(), profileController.getMyProfile);
    router7.get("/", auth_default("ADMIN" /* ADMIN */), profileController.getAllUser);
    router7.patch("/me", auth_default(), profileController.updateMyProfile);
    router7.patch("/", auth_default("ADMIN" /* ADMIN */), profileController.updateUserStatus);
    profileRouter = router7;
  }
});

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express6 from "express";
var app, allowedOrigins, app_default;
var init_app = __esm({
  "src/app.ts"() {
    "use strict";
    init_auth();
    init_admin_routes();
    init_category_routes();
    init_customer_router();
    init_meal_router();
    init_orders_router();
    init_provider_routes();
    init_users_routes();
    app = express6();
    app.use(express6.json());
    allowedOrigins = [
      process.env.APP_URL || "http://localhost:3000",
      process.env.APP_URL2
      // Production frontend URL
    ].filter(Boolean);
    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
          if (isAllowed) {
            callback(null, true);
          } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
          }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"]
      })
    );
    app.all("/api/auth/*splat", toNodeHandler(auth));
    app.use("/api/provider/profile", ProviderRouter);
    app.use("/api/categories", CategoryRouter);
    app.use("/api/meals", MealRouter);
    app.use("/api/customer", CustomerRouter);
    app.use("/api/users", profileRouter);
    app.use("/api/provider/orders", ordersRouter);
    app.use("/api/admin/orders", AdminRouter);
    app.get("/", (req, res) => {
      res.send("Hello,world");
    });
    app_default = app;
  }
});

// src/index.ts
var require_index = __commonJS({
  "src/index.ts"() {
    init_app();
    init_prisma();
    async function main() {
      const PORT = process.env.PORT || 5e3;
      try {
        await prisma.$connect();
        console.log("Connect to the Database Successfully");
        app_default.listen(PORT, () => {
          console.log(`Server is Running on http://localhost:${PORT}`);
        });
      } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
      }
    }
    main();
  }
});
export default require_index();
