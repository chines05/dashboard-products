import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {
  const allProducts = await prisma.product.findMany();

  res.status(200).send(allProducts);
});

app.post("/products", async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    },
  });

  res.status(201).send(product);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
