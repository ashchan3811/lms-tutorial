"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
});

type CreateCategoryFormType = z.infer<typeof formSchema>;

const CreateCategoryPage = () => {
  const router = useRouter();

  const form = useForm<CreateCategoryFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CreateCategoryFormType) => {
    try {
      await axios.post("/api/categories", values);
      router.push(`/admin/category`);
      toast.success("Category Created");
    } catch {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your category</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your category? Don&apos;t worry, you can
          change it later.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Engineering"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href={"/admin/category"}>
                <Button variant={"outline"} type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
