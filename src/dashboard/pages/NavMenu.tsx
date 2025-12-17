"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type NavCategory = {
  id: string;
  name: string;
  disable?: boolean;
};

const navcategories: NavCategory[] = [
  { id: "1", name: "politics" },
  { id: "2", name: "kheladula" },
  { id: "3", name: "sikha" },
  { id: "4", name: "sanvir akta ailsha", disable: true },
];

export default function NavMenu() {
  // ✅ STATE INSIDE COMPONENT
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [submittedItems, setSubmittedItems] = useState<string[]>([]);

  // ✅ HANDLERS INSIDE COMPONENT
  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSubmittedItems(selectedItems);
    console.log("Submitted:", selectedItems);
  };

  const handleCancel = () => {
    setSelectedItems([]);
  };

  return (
    <div className="border-2 px-5">
      <div className="flex mx-auto py-5 gap-6">
        {navcategories.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 border-2 py-3 px-7 rounded"
          >
            <Checkbox
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => handleCheckboxChange(item.id)}
              disabled={item.disable}
            />
            <Label htmlFor={item.id}>{item.name}</Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3 p-5 justify-end">
        <Button onClick={handleCancel} className="bg-blue-500">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

      <div className="text-sm text-gray-600">
        Submitted Array: {JSON.stringify(submittedItems)}
      </div>
    </div>
  );
}
