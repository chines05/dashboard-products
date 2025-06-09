import { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import api from "@/services/api";

const SchemaProduct = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  description: z.string().min(1, "Descrição é obrigatória"),
});

type FormData = z.infer<typeof SchemaProduct>;

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product;
};

const DialogProduct = ({ open, onClose, onSuccess, product }: Props) => {
  const form = useForm<FormData>({
    resolver: zodResolver(SchemaProduct),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (product) {
        await api.put(`/product/${product.id}`, data);
      } else {
        await api.post("/products", data);
      }

      toast.success(product ? "Product updated!" : "Product created!");
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      toast.error("Ocorreu um erro");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!product) {
      form.reset({
        name: "",
        price: 0,
        description: "",
      });
    } else {
      form.reset({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [product, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {product ? "Edit product" : "New product"}
              </DialogTitle>
              <DialogDescription>
                {product ? "Edit a product" : "Create a new product"}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {product ? "Update product" : "Create product"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProduct;
