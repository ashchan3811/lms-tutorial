"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: {
    imageUrl: string | null;
  };
  courseId: string;
}

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: { imageUrl: string | null }) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      router.refresh();
      toggleEdit();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Image
        <Button variant={"ghost"} onClick={toggleEdit}>
          {!isEditing ? (
            <>
              {initialData.imageUrl ? (
                <>
                  <Pencil className='h-4 w-4 mr-2' />
                  Edit Image
                </>
              ) : (
                <>
                  <PlusCircle className='h-4 w-4 mr-2' />
                  Add an Image
                </>
              )}
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-sm mt-2'>
            <ImageIcon className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              src={initialData.imageUrl}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover rounded-md'
              alt='course image'
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint={"courseImage"}
            onChange={(url) => {
              url && onSubmit({ imageUrl: url });
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            16:9 aspect ratio recommended.
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
