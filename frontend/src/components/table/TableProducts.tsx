import { Product } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { LucideEdit, LucideTrash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import DialogConfirmarAcao from "../dialog/DialogConfirmarAcao";

type Props = {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
};

const TableProducts = ({ products, onEdit, onDelete }: Props) => {
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete || !onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(productToDelete);
      setOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium min-w-[120px]">
                {product.name}
              </TableCell>
              <TableCell className="min-w-[80px]">R${product.price}</TableCell>
              <TableCell className="min-w-[200px]">
                {product.description}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {onEdit && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" onClick={() => onEdit(product)}>
                          <LucideEdit className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {onDelete && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <LucideTrash className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogConfirmarAcao
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
};

export default TableProducts;
