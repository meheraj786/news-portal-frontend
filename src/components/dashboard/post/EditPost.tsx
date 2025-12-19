import { useFetchAllCategories } from "@/api/hooks/category";
import { useUpdatePost } from "@/api/hooks/post";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Pencil } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import JoditEditor from "jodit-react";

export function EditPost({ data }: { data: Post }) {
  const { data: categories } = useFetchAllCategories();
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const postMutation = useUpdatePost();
  const queryClient = useQueryClient();

  const editor = useRef(null);

  const getCategoryId = (category: unknown): string => {
    if (!category) return "";

    if (
      typeof category === "object" &&
      category !== null &&
      "_id" in category
    ) {
      return (category as { _id: string })._id;
    }
    if (typeof category === "string") {
      return category;
    }

    return "";
  };

  const form = useForm({
    // resolver: zodResolver(postSchema.omit({ image: true })),
    defaultValues: {
      _id: data?._id,
      title: data?.title,
      content: data?.content,
      category: getCategoryId(data?.category),
      tags: data?.tags || [],
      isDraft: data?.isDraft,
      views: data?.views,
    },
  });

  useEffect(() => {
    form.reset({
      _id: data?._id,
      title: data?.title,
      content: data?.content,
      category: getCategoryId(data?.category),
      tags: data?.tags || [],
      isDraft: data?.isDraft,
      views: data?.views,
    });
    setImagePreview(data?.image?.url || "");
    setImageFile(null);
  }, [data, form]);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      placeholder: "Update content...",
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
    const tagsToSend = values.tags.map((tag: any) => 
  typeof tag === "object" && tag.name ? tag.name : tag
);
console.log("Tags being sent:", tagsToSend);
console.log("Tags JSON:", JSON.stringify(tagsToSend));
formData.append("tags", JSON.stringify(tagsToSend));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    postMutation.mutate(
      { _id: values._id as string, formData: formData  },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["post", "all"] });
          toast.success("Post updated successfully!");
          setOpen(false);
          setImageFile(null);
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
      }
    );
  };
  console.log(form.formState.errors);
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-500 text-white">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Update post details.</DialogDescription>
          </DialogHeader>

          <div className="grid my-4 gap-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input {...form.register("title")} />
              {form.formState.errors.title && (
                <span className="text-red-500 text-xs">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => {
                  form.setValue("category", value, { shouldValidate: true });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories?.map((item) => (
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

            <div className="grid gap-2">
              <Label>Tags</Label>
              <Input
                defaultValue={data?.tags
                  ?.map((tag) =>
                    typeof tag === "object" && tag !== null && "name" in tag
                      ? (tag as { name: string }).name
                      : tag
                  )
                  .join(", ")}
                placeholder="news, tech, politics"
                onChange={(e) => {
                  const tagsArray = e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((name) => ({ name }));
                  form.setValue("tags", tagsArray , {
                    shouldValidate: true,
                  });
                }}
              />
              {form.formState.errors.tags && (
                <span className="text-red-500 text-xs">
                  {form.formState.errors.tags.message as string}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Content</Label>
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
              {form.formState.errors.content && (
                <span className="text-red-500 text-xs">
                  {form.formState.errors.content.message}
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-green-500">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
