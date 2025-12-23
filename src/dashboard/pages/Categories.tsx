import { useDeleteCategory, useFetchAllCategories } from "@/api/hooks/category";
import { AddCategory } from "@/components/dashboard/category/AddCategory";
import { EditCategory } from "@/components/dashboard/category/EditCategory";
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
import { Button } from "@/components/ui/button";
import type { Category } from "@/validators/category";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const Categories = () => {
  const { data: categories, isLoading } = useFetchAllCategories();
  const categoryDelete = useDeleteCategory();
  console.log(categories);
  const queryClient = useQueryClient();

  const column = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Actions",
      cell: ({ row }: { row: { original: Category } }) => (
        <div className="flex justify-center text-center items-center gap-2 ">
          <EditCategory data={row.original} />

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
                  This action cannot be undone. This will permanently delete
                  this Category
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    categoryDelete.mutate(row.original?._id as string, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["categories", "all"],
                        });
                        toast.success("Category deleted successfully!");
                      },
                    })
                  }
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
    <div className=" p-5 rounded-2xl border-1">
      <div className="flex justify-between mb-5 items-center   ">
        <h2 className="font-bold text-2xl">Categories</h2>
        <AddCategory />
      </div>
      <DataTable
        className=" bg-gradient-to-br from-red-50 to-rose-100 "
        search="name"
        data={(categories || []).map((c) => ({
          ...c,
          description: c.description || "",
        }))}
        columns={column}
        loading={isLoading}
      />
    </div>
  );
};

export default Categories;
