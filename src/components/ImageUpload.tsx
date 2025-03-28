"use client";

import { useState, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlus, X, Upload, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { AspectRatio } from "./ui/aspect-ratio";

interface PhotoUploadProps {
  file?: File;
  setFile: (file: File) => void;
}

const ImageUpload = ({ file, setFile }: PhotoUploadProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setUploadProgress(0);

      const newPhoto = URL.createObjectURL(acceptedFiles[0]);
      console.log("newPhoto", newPhoto);

      setPhoto(newPhoto);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      if (acceptedFiles[0]) {
        setFile(acceptedFiles[0]);
      }
    },
    [file]
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setUploading(false);
    fileRejections.forEach((file: FileRejection) => {
      if (
        file.errors.some(
          (error: { code: string }) => error.code === "file-too-large"
        )
      ) {
        alert("File is too large. Maximum size is 5MB.");
      } else if (
        file.errors.some(
          (error: { code: string }) => error.code === "file-invalid-type"
        )
      ) {
        alert(
          "Invalid file type. Please upload a JPEG, JPG, PNG, or WEBP file."
        );
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected, // Add this callback
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-none ${
            photo ? "bg-none" : "bg-secondary"
          } shadow-none h-[150px] text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }
          ${photo && "border-none"}
       
        `}
      >
        {photo !== null && (
          <div className="relative group">
            <AspectRatio ratio={4 / 3}>
              <img
                src={photo}
                alt="Uploaded photo"
                className="max-h-[150px] mx-auto overflow-hidden "
              />
            </AspectRatio>
            {/* <Image width={200} height={200} src={photo} alt="Uploaded photo" /> */}
            <Button
              variant="destructive"
              size="icon"
              className="absolute z-10 top-2 w-6 h-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setPhoto(null);
              }}
            >
              <X className="h-1 w-1" />
            </Button>
          </div>
        )}
        <Input className="bg-accent" {...getInputProps()} />
        <div
          className={`flex flex-col relative items-center justify-center gap-2 ${
            photo ? "hidden" : ""
          } h-full`}
        >
          <Plus className="w-8 h-8 text-accent absolute" />
        </div>
      </div>
      {uploading && (
        <div className="space-y-2 w-1/2 mx-auto">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 animate-bounce" />
            <span className="text-sm">Uploading...</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
