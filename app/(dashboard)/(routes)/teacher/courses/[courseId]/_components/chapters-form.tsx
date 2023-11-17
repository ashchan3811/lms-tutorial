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
import { Loader2, PlusCircle } from "lucide-react";
import { Course, Chapter } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChapterListPage from "./chapter-list";
import { IChapterReOrderItem } from "@/lib/models";

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
    form.reset();
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

  const onEdit = (chapterId: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  };

  const onReorder = async (updateData: IChapterReOrderItem[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapter reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='relative mt-6 border bg-slate-100 rounded-md p-4'>
      {isUpdating && (
        <div className='absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center'>
          <Loader2 className='h-6 w-6 animate-spin text-sky-700' />
        </div>
      )}
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
          {!initialData.chapters.length ? (
            "No chapters"
          ) : (
            <>
              <ChapterListPage
                onEdit={onEdit}
                onReorder={onReorder}
                items={initialData.chapters}
              />
            </>
          )}
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
