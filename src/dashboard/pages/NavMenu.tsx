import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

import { useFetchAllCategories } from "@/api/hooks/category";
import { useFetchNavMenu, useUpdateNavMenu } from "@/api/hooks/navMenu";
import { toast } from "sonner";

export default function NavMenu() {
  const { data: categories = [], isLoading: categoriesLoading } = useFetchAllCategories();
  const { data: navMenu, isLoading: navMenuLoading } = useFetchNavMenu();
  const { mutate: updateNavMenu, isPending } = useUpdateNavMenu();
  
  // Get initial IDs from navMenu
  const initialIds = useMemo(() => {
    return navMenu && Array.isArray(navMenu) ? navMenu.map((c) => c._id) : [];
  }, [navMenu]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Determine actual selected items (use initialIds if selectedItems is empty)
  const actualSelectedItems = selectedItems.length > 0 ? selectedItems : initialIds;

  const handleCheckboxChange = (id: string) => {
    const current = actualSelectedItems;
    setSelectedItems(
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 10
        ? [...current, id]
        : current
    );
  };

  const handleSubmit = () => {
    if (actualSelectedItems.length > 10) {
      toast.error("Maximum 10 categories allowed!");
      return;
    }

    console.log("Submitting categoryIds:", actualSelectedItems);

    updateNavMenu(
      { categoryIds: actualSelectedItems },
      {
        onSuccess: () => {
          toast.success("Navigation menu updated successfully!");
          // Reset selectedItems so it uses initialIds again on next render
          setSelectedItems([]);
        },
        onError: (error) => {
          console.error("Update error:", error);
          toast.error("Failed to update navigation menu");
        },
      }
    );
  };

  const handleCancel = () => {
    setSelectedItems([]);
  };

  // Calculate if there are changes
  const hasChanges = 
    actualSelectedItems.length !== initialIds.length ||
    actualSelectedItems.some((id) => !initialIds.includes(id)) ||
    initialIds.some((id) => !actualSelectedItems.includes(id));

  const isLoading = categoriesLoading || navMenuLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-muted-foreground">Loading navigation menu...</p>
      </div>
    );
  }

  return (
    <div className="border-2 px-5 rounded-md">
      <div className="py-5">
        <h2 className="text-lg font-semibold mb-4">
          Navigation Menu Categories (Max 10)
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Selected: <span className="font-medium">{actualSelectedItems.length}</span> / 10
        </p>
        
        <div className="flex flex-wrap gap-6">
          {categories.map((item) => {
            const isSelected = actualSelectedItems.includes(item._id);
            const canSelect = actualSelectedItems.length < 10 || isSelected;
            
            return (
              <div
                key={item._id}
                className={`flex items-center gap-3 border py-3 px-7 rounded transition-all ${
                  isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200"
                } ${!item.isActive ? "opacity-50" : ""}`}
              >
                <Checkbox
                  id={item._id}
                  checked={isSelected}
                  onCheckedChange={() => handleCheckboxChange(item._id)}
                  disabled={!item.isActive || (!canSelect && !isSelected)}
                />
                <Label 
                  htmlFor={item._id}
                  className={`cursor-pointer ${!item.isActive || (!canSelect && !isSelected) ? "cursor-not-allowed" : ""}`}
                >
                  {item.name}
                  {!item.isActive && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      (Inactive)
                    </span>
                  )}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3 p-5 justify-end border-t">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isPending || !hasChanges}
        >
          Cancel
        </Button>

        <Button 
          onClick={handleSubmit} 
          disabled={isPending || !hasChanges || actualSelectedItems.length > 10}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}