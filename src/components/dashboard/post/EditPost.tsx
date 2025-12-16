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
import { Textarea } from "@/components/ui/textarea";
import { postSchema, type Post } from "@/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function EditPost({ data }: { data: Post }) {
  const { data: categories } = useFetchAllCategories();
  const [open, isOpen] = useState(false);
  const postMutation = useUpdatePost();
  const queryClient = useQueryClient();

  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      _id: data?._id,
      title: data?.title,
      content: data?.content,
      image: data?.image,
      category: data?.category,
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
      image: data?.image,
      category: data?.category,
      tags: data?.tags || [],
      isDraft: data?.isDraft,
      views: data?.views,
    });
  }, [data, form]);

  const handleSubmit = (values: Post) => {
    postMutation.mutate(
      { id: values._id as string, ...values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["post", "all"] });
          toast.success("Post updated successfully!");
          form.reset();
          isOpen(false);
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

  return (
    <Dialog open={open} onOpenChange={isOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-500 text-white">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Update post details.</DialogDescription>
          </DialogHeader>

          <div className="grid my-3 gap-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input {...form.register("title")} />
              {form.formState.errors.title && (
                <span className="text-red-500 text-xs">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="grid gap-2">
              <Label>Content</Label>
              <Textarea {...form.register("content")} />
            </div>

            {/* Image */}
            <div className="grid gap-2">
              <Label>Image</Label>
              <Input {...form.register("image")} placeholder="Image URL" />
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) =>
                  form.setValue("category", value, {
                    shouldValidate: true,
                  })
                }
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

            {/* Tags */}
            <div className="grid gap-2">
              <Label>Tags</Label>
              <Input
                defaultValue={data?.tags?.join(", ")}
                placeholder="news, tech, politics"
                onChange={(e) => {
                  const tags = e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);

                  form.setValue("tags", tags, { shouldValidate: true });
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-green-500" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
