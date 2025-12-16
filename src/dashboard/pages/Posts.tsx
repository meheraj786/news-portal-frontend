import { useDeletePost, useFetchAllPosts } from "@/api/hooks/post";
import { AddPost } from "@/components/dashboard/post/AddPost";
import { EditPost } from "@/components/dashboard/post/EditPost";
import DataTable from "@/components/dataTable/DataTable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Post } from "@/validators/post";
import { Eye, Trash } from "lucide-react";
import { toast } from "sonner";


const Posts = () => {
  const {data:post, isLoading} = useFetchAllPosts();
  const deletePost = useDeletePost();
  console.log(post);
  



  
  const column = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell:({row}:{ row: { original: Post } })=>{

        return <p>{row.original.category.name}</p>

    
      }
    },
    {
      accessorKey: "subCategory",
      header: "Sub Category",
    },
    {
      accessorKey: "tags",
      header: "Tags",
            cell:({row}:{ row: { original: Post } })=>{

        return <p className="truncate w-40">{row.original.tags?.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}</p>
      }
    },
    {
      accessorKey: "content",
      header: "Content",
      cell:({row}:{ row: { original: Post } })=>{

        return <p className="truncate w-40">{row.original.content}</p>
      }
    },
    {
      accessorKey: "image",
      header: "Image",
      cell:({row}: {row: {original: Post}})=>{

        return <img src={row.original.image} className="w-10" alt="" />

      }
    },
    {
      header: "Actions",
      cell: ({row}:{ row: { original: Post } }) => (
        <div className="flex justify-center text-center items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-secondary" size={"sm"}>
                {" "}
                <Eye />{" "}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll">
              <img src={row.original.image} alt="" />
              <h3 className="text-sm sm:text-base font-semibold leading-snug text-gray-900 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors">{row.original.title}</h3>
              <p className="text-sm">{row.original.content}</p>
              <Badge>{row.original.category.name}</Badge>
              <p>{row.original?.tags?.join(", ")}</p>
              <span>Views: {row.original.views}</span>

            </DialogContent>
          </Dialog>
          <EditPost data={row.original} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"}>
                {" "}
                <Trash />{" "}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this Category
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => { deletePost.mutate(row.original._id as string, {onSuccess: () => { toast.success("Post deleted successfully!");}})}}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div>
            <div className="flex justify-between mb-5 items-center">
              <h2 className="font-bold text-2xl">Post</h2>
              <AddPost />
            </div>
      <DataTable loading={isLoading} search="title" data={post || []} columns={column} />
    </div>
  );
};

export default Posts;
