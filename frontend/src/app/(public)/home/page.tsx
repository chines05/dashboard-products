"use client";

import api from "@/services/api";
import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
      toast.success("Products carregados com sucess!");
    } catch (e) {
      console.error(e);
      toast.error("Products carregados com sucess!");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      {products.length == 0 ? (
        <h1>Nehum produto cadastrado!</h1>
      ) : (
        <div>
          {products.map((products) => {
            return (
              <div key={products.id}>
                <h1>{products.name}</h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
