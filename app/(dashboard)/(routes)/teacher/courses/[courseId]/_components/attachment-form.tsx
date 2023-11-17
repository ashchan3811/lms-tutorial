"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { FileUpload } from "@/components/file-upload";
import { Attachment, Course } from "@prisma/client";

interface AttachmentFormProps {
  initialData: Course & {
    attachments: Attachment[];
  };
  courseId: string;
}

const formSchema = z.object({
  url: z.string(),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: { url: string | null }) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      router.refresh();
      toggleEdit();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course attachments
        <Button variant={"ghost"} onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a file
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {!initialData.attachments?.length ? (
            <p className='text-sm mt-2 text-slate-500 italic'>
              No attachments yet
            </p>
          ) : (
            <div className='space-y-2'>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className='flex items-center p-3 w-full bg-sky-100 text-sky-700 rounded-md'
                >
                  <File className='h-4 w-4 mr-2 flex-shrink-0' />
                  <p className='text-xs line-clamp-1'>{attachment.name}</p>

                  {deletingId === attachment.id ? (
                    <div>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  ) : (
                    <button
                      className='ml-auto hover:opacity-75 transition'
                      onClick={() => {
                        onDelete(attachment.id);
                      }}
                    >
                      <X className='h-4 w-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint={"courseAttachments"}
            onChange={(url) => {
              url && onSubmit({ url: url });
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            Add anything your student might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
