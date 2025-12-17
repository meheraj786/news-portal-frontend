// import { zodResolver } from "@hookform/resolvers/zod";
// import { userSchema, type UserInput } from "../validators/user";
// import { useForm } from "react-hook-form";
import { LoginForm } from "../../components/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserInput } from "../../validators/user";
import { useForm } from "react-hook-form";
import Logo from "@/components/logo/Logo";

const Login = () => {
  const form = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="mx-auto text-center">
          <Logo />
        </div>
        <LoginForm form={form} />
      </div>
    </div>
  );
};

export default Login;
