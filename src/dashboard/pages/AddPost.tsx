import { useFetchAllCategories } from "@/api/hooks/category";
import { useCreatePost } from "@/api/hooks/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postSchema, type Post } from "@/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import JoditEditor from "jodit-react";

export function AddPost() {
  const { data: category } = useFetchAllCategories();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const form = useForm<Omit<Post, "image">>({
    resolver: zodResolver(postSchema.omit({ image: true })),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      isDraft: false,
      views: 0,
      tags: [],
    },
  });

  const postMutation = useCreatePost();
  const queryClient = useQueryClient();
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      minHeight: 280,
      height: 400,
      placeholder: "Start typing...",
    }),
    []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: Post) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("isDraft", String(values.isDraft));
    formData.append("views", String(values.views));
    formData.append("tags", JSON.stringify(values.tags));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    postMutation.mutate(formData as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["post", "all"] });
        toast.success("News added successfully!");
        form.reset();
        setImageFile(null);
        setImagePreview("");
      },
      onError: (error: unknown) => {
        if (error && (error as AxiosError).response) {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(
            axiosError.response?.data?.message || "Something went wrong!"
          );
        } else {
          toast.error("Something went wrong!");
        }
      },
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Add Post</h2>
        <p className="text-gray-600">Create a new post.</p>
      </div>

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-5 sm:space-y-6"
      >
        {/* Title */}
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Title" {...form.register("title")} />
          {form.formState.errors.title && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.title.message}
            </span>
          )}
        </div>

        {/* Image */}
        <div className="grid gap-3">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-[220px] aspect-square object-cover rounded-md"
            />
          )}
        </div>

        {/* Category */}
        <div className="grid gap-3">
          <Label>Category</Label>
          <Select
            onValueChange={(value) =>
              form.setValue("category", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {category?.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {form.formState.errors.category && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.category.message}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="grid gap-3">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="news, politics, tech"
            onChange={(e) => {
              const tagsArray = e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);
              form.setValue("tags", tagsArray, { shouldValidate: true });
            }}
          />
          {form.formState.errors.tags && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.tags.message as string}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="grid gap-3">
          <Label>Content</Label>
          <div className="w-full max-w-full overflow-hidden">
            <JoditEditor
              ref={editor}
              value={form.watch("content")}
              config={config}
              tabIndex={1}
              onBlur={(newContent) =>
                form.setValue("content", newContent, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          </div>
          {form.formState.errors.content && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.content.message}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button type="submit" className="bg-green-500">
            Post
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setImageFile(null);
              setImagePreview("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
