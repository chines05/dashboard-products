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

  if (allProducts.length === 0) {
    res.status(404).send({ menssage: "Nenhum product encontrado!" });
  }

  res.status(200).send(allProducts);
});

app.post("/products", async (req: Request, res: Response) => {
  const { name, price, description } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });

  res.status(201).send({ menssage: "Product criado com sucesso!", product });
});

app.delete("/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send({ menssage: "Product não encontrado!" });
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.status(200).send({ menssage: "Product deletado com sucesso!" });
});

app.put("/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!id) {
    res.status(404).send({ menssage: "Product não encontrado!" });
  }

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      description,
    },
  });

  res
    .status(200)
    .send({ menssage: "Product atualizado com sucesso!", product });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
