"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        toast({ title: "Error", description: res.error });
      }
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Continue with an account
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            You must log in or register to continue.
          </p>

          <Button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full mb-3 bg-white border hover:bg-gray-50 text-gray-700"
            variant="outline"
          >
            <span className="mr-2">🌐</span> Continue with Google
          </Button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Logging in..." : "Login with Email"}
              </Button>
            </div>
          </form>

          <p className="text-sm text-center mt-6">
            New User?{" "}
            <a
              href="/auth/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Create New Account
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
