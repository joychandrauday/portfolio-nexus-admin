"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from 'sonner'
export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (result?.error) {
        toast.error("Login failed. Please check your credentials.");
      } else {
        toast.success('Log In Successfully!!')
        router.push("/dashboard");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuroraBackground>
      <div className="flex justify-center items-center h-[100vh] p-5">
        <div className="flex w-full max-w-4xl border rounded-lg shadow-2xl overflow-hidden backdrop-blur-xl">

          {/* Left Side - Banner */}
          <div className="hidden md:flex w-1/2 items-center justify-center p-10">
            <div className="text-center">
              <Image src="/favicon.png" width={200} height={200} alt="Logo" priority className="mx-auto" />

              <h2 className="text-white text-3xl font-bold mt-5">Welcome Back!</h2>
              <p className="text-white mt-3">Sign in to access your admin dashboard.</p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 z-50 ">
            <h1 className="text-center text-4xl text-white font-bold mb-6">
              Login <span className="text-teal-400">Here</span>
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="mt-2 w-full p-3 rounded-md bg-transparent border border-teal-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  className="mt-2 w-full p-3 rounded-md bg-transparent border border-teal-500 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="ui-btn w-full bg-transparent text-white py-3 rounded-md shadow-md font-semibold transition-all border"
              >
                <span>Login</span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default LoginPage;
