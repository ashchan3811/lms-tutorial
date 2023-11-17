"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Course, Chapter } from "@prisma/client";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1),
});

type ChapterFormsType = z.infer<typeof formSchema>;

interface ChapterFormsProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const ChapterForms = ({ initialData, courseId }: ChapterFormsProps) => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreate = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm<ChapterFormsType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: ChapterFormsType) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      router.refresh();
      toggleCreate();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course chapters
        <Button variant={"ghost"} onClick={toggleCreate}>
          {!isCreating ? (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a chapter
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder='e.g intro to the course'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type='submit'>
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length ? "No chapters" : <>List of chapters</>}
        </div>
      )}

      {!isCreating && initialData.chapters.length > 0 && (
        <p className='text-xs text-muted-foreground mt-4'>
          Drag ad drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForms;
