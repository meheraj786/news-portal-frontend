import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { UserInput } from "@/validators/user";
// import { useAuth } from "react-express-auth-kit"
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";
// ১. useState এবং আইকনগুলো ইম্পোর্ট করুন
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type LoginFormProps = React.ComponentProps<"div"> & {
  form: UseFormReturn<UserInput>;
};

export function LoginForm({ className, form, ...props }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const navigate = useNavigate();
  // const {login}=useAuth()

  // ২. পাসওয়ার্ড দেখানোর জন্য একটি স্টেট তৈরি করুন (ডিফল্ট false মানে লুকানো থাকবে)
  const [showPassword, setShowPassword] = useState(false);

  // ৩. টগল ফাংশন (ক্লিক করলে true/false উল্টে যাবে)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: UserInput) => {
    console.log("Login data:", data);
    // login(data.email,data.password)
    axios
      .post("http://localhost:4100/api/v1/admin/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
        toast.success("Login successful!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed!");
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email Field (No changes here) */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </Field>

              {/* Password Field (Changes made here) */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                {/* ৪. Input এবং আইকন বাটনকে একটি relative div এর মধ্যে রাখা হলো */}
                <div className="relative">
                  <Input
                    id="password"
                    // ৫. টাইপ ডায়নামিক করা হলো: showPassword সত্য হলে "text", মিথ্যা হলে "password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    // ইনপুটের ডানদিকে আইকনের জন্য জায়গা রাখা হলো (যাতে টেক্সট আইকনের নিচে না চলে যায়)
                    className="pr-10"
                    {...register("password")}
                  />

                  {/* ৬. আইকন বাটন যোগ করা হলো */}
                  <button
                    type="button" // এটি খুব গুরুত্বপূর্ণ! না হলে ফর্ম সাবমিট হয়ে যাবে।
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1} // ট্যাব চাপলে যাতে এই বাটনে ফোকাস না যায় (অপশনাল)
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                    {/* অ্যাক্সেসিবিলিটির জন্য স্ক্রিন রিডার টেক্সট */}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
