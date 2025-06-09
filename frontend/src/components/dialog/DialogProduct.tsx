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
      await api.post("/products", {
        name: data.name,
        price: data.price,
        description: data.description,
      });

      toast.success(product ? "Produto atualizado!" : "Produto criado!");
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      toast.error("Ocorreu um erro");
      console.error(error);
    }
  };

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    } else {
      form.reset();
    }
  }, [product, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {product ? "Editar produto" : "Novo produto"}
              </DialogTitle>
              <DialogDescription>
                Preencha os dados do produto
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
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
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Preço do produto"
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {product ? "Salvar alterações" : "Criar produto"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProduct;
