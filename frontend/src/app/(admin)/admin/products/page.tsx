"use client";

import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import TableProducts from "@/components/table/TableProducts";
import DialogProduct from "@/components/dialog/DialogProduct";
import { Card } from "@/components/ui/card";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (e) {
      toast.error("Failed to load products");
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/product/${id}`);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (e) {
      toast.error("Failed to delete product");
      console.error(e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="px-8 py-12">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setOpenDialogProduct(true);
          }}
        >
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card className="mt-8">
        <TableProducts
          products={products}
          onEdit={(product) => {
            setEditingProduct(product);
            setOpenDialogProduct(true);
          }}
          onDelete={handleDelete}
        />
      </Card>

      <DialogProduct
        open={openDialogProduct}
        onClose={() => setOpenDialogProduct(false)}
        onSuccess={loadProducts}
        product={editingProduct ?? undefined}
      />
    </div>
  );
};

export default ProductsAdmin;
