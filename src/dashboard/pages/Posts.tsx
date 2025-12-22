import { useDeletePost, useFetchAllPosts } from "@/api/hooks/post";
import { EditPost } from "@/components/dashboard/post/EditPost";
import DataTable from "@/components/dataTable/DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Trash } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { PostContent } from "@/components/post/PostContent";

interface Tag {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

interface PostImage {
  publicId: string;
  url: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  tags: Tag[];
  image: PostImage;
  views: number;
  isDraft: boolean;
}

const Posts = () => {
  const { data, isLoading } = useFetchAllPosts();
  const posts = data as unknown as Post[];
  const deletePost = useDeletePost();
  console.log(post, "post");

  type Tag = {
    id: string;
    name: string;

    _id: string;
  };

  const column = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: { row: { original: Post } }) => (
        <p>{row.original.category?.name || "N/A"}</p>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }: { row: { original: Post } }) => (
        <div className="flex gap-1 flex-wrap w-40">
          {row.original.tags?.map((tag: Tag) => (
            <Badge key={tag._id}>{tag.name}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }: { row: { original: Post } }) => (
        <p className="truncate w-40">{row.original.content}</p>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }: { row: { original: Post } }) => (
        <img
          src={row.original.image?.url}
          className="w-10 h-10 object-cover rounded"
          alt={row.original.title}
        />
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: { row: { original: Post } }) => (
        <div className="flex justify-center text-center items-center gap-2 ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-secondary" size={"sm"}>
                <Eye size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll">
              <img
                src={row.original.image?.url}
                alt={row.original.title}
                className="w-full rounded-lg"
              />
              <h3 className="text-sm sm:text-base font-semibold leading-snug text-gray-900 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors">
                {row.original.title}
              </h3>
              <PostContent content={row.original.content} />
              <Badge>{row.original.category?.name || "Uncategorized"}</Badge>
              <div className="flex gap-1 flex-wrap mt-2">
                {row.original.tags?.map((tag) => (
                  <Badge variant="outline" key={tag._id}>
                    {tag.name}
                  </Badge>
                ))}
              </div>
              <span className="text-sm text-gray-500 block mt-2">
                Views: {row.original.views || 0}
              </span>
            </DialogContent>
          </Dialog>

          <EditPost data={row.original as Post} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"}>
                <Trash size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this Post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deletePost.mutate(row.original._id, {
                      onSuccess: () => {
                        toast.success("Post deleted successfully!");
                      },
                    });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-5 items-center ">
        <h2 className="font-bold text-2xl">Post</h2>
        <Link to={"/dashboard/add-post"}>
          <Button>Add Post</Button>
        </Link>
      </div>
      <DataTable
        className="bg-gradient-to-br from-red-50 to-rose-100 "
        loading={isLoading}
        search="title"
        data={posts || []}
        columns={column}
      />
    </div>
  );
};

export default Posts;