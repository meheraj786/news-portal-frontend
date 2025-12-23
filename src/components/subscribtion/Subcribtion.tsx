import { useSubscribe } from "@/api/hooks/subscribtion";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const Subcribtion = () => {
  const subscripMutation = useSubscribe();
  // ১. State-ke string type dewa hoyeche
  const [subEmail, setSubEmail] = useState<string>("");

  const handleSubmit = () => {
    if (!subEmail) {
      return toast.error("Please enter your email!");
    }

    // ২. TYPE FIX: এখানিই মূল পরিবর্তন।
    // hook-er type onujayi shora-shori subEmail (string) pathano holo
    subscripMutation.mutate(subEmail, {
      onSuccess: () => {
        toast.success("Subscribed successfully!");
        setSubEmail("");
      },
      onError: (err: any) => {
        const errMsg = err?.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
      },
    });
  };

  return (
    <div>
      <div className="bg-linear-to-r from-red-600 via-red-500 to-green-700 p-6 flex flex-col gap-y-2 rounded-lg">
        <h2 className="font-bold font-secondary text-[17px] text-white">
          নিউজলেটার সাবস্ক্রাইব করুন
        </h2>

        <p className="font-semibold font-secondary text-[14px] text-white">
          সর্বশেষ খবর সরাসরি আপনার ইমেইলে পান
        </p>

        <input
          type="email"
          value={subEmail}
          // ৩. Input event handling
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSubEmail(e.target.value)
          }
          placeholder="Your Email..."
          className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
        />

        <button
          onClick={handleSubmit}
          // ৪. Mutation pending state check
          disabled={subscripMutation.isPending}
          className={`font-semibold font-primary text-[15px] text-black cursor-pointer bg-white py-3 rounded-lg transition-all ${
            subscripMutation.isPending
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          {subscripMutation.isPending ? "Subscribing..." : "Subscribe"}
        </button>

        {/* ৫. Mutation error handling */}
        {subscripMutation.isError && (
          <p className="text-sm text-yellow-300 mt-2 font-medium">
            {(subscripMutation.error as any)?.response?.data?.message ||
              "Check your email again"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Subcribtion;
