import { useSubscribe } from "@/api/hooks/subscribtion";
import { useState } from "react";
import { toast } from "sonner";

const Subcribtion = () => {
  const [subEmail, setSubEmail] = useState("");
  const { mutate, isPending } = useSubscribe();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault(); // Form reload bondho korbe

    if (!subEmail) {
      return toast.error("Please enter your email!");
    }

    mutate(subEmail, {
      onSuccess: () => {
        toast.success("Subscribed successfully!");
        setSubEmail(""); // Input field empty kore dibe
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-bold mb-2">Subscribe to News</h3>
      <form onSubmit={handleJoin} className="flex flex-col gap-2">
        <input
          type="email"
          value={subEmail}
          onChange={(e) => setSubEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          {isPending ? "Joining..." : "Join Now"}
        </button>
      </form>
    </div>
  );
};

export default Subcribtion;
