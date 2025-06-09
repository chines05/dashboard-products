"use client";

import { ProductCard } from "@/components/card/ProductCard";
import { SidebarSimplified } from "@/components/sidebar/SideBar";
import { Product } from "@/lib/types";
import api from "@/services/api";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (e) {
      toast.error("Failed to load products");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="flex h-screen">
      <SidebarSimplified />

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg border p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
