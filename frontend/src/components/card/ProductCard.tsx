"use client";

import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm font-medium text-blue-600">
          R$ {product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
}
