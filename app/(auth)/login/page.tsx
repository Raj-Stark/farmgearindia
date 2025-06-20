"use client";
import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import agri from "../../../public/agriculture-2.jpg";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai/react";
import { userAtom } from "@/app/atoms/userAtom";

const LoginPage = () => {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseGoogle = async (authResult: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code: authResult.code }),
        }
      );

      if (!response.ok) {
        throw new Error("Google login failed");
      }

      const data = await response.json();

      setUser({
        isLoggedIn: true,
        name: data.user.name,
        userId: data.user.userId,
      });

      if (data) {
        router.push("/");
      }
    } catch (error) {
      throw new Error(`Google login failed ${error}`);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={agri}
        alt="Background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Optional overlay to improve readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Login Card */}
      <div className="relative z-20 flex items-center justify-center w-full h-full px-4">
        <Card className="w-full max-w-sm text-center py-8 px-4 bg-white/90 backdrop-blur-md">
          <CardHeader className="flex flex-col items-center gap-2">
            <Lock className="w-10 h-10 text-green-500 stroke-[1.5]" />
            <CardTitle className="text-xl md:text-2xl font-semibold">
              Welcome Back!
            </CardTitle>
            <CardDescription>
              Sign in to access your SparePartsBharat account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <button
              className="flex items-center justify-center gap-2 w-full py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition text-sm font-medium bg-white"
              onClick={() => googleLogin()}
            >
              {/* ✅ Google SVG Full */}
              <svg
                className="w-4 h-4"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.3H272.1v95.3h146.8c-6.3 33.5-25.4 61.9-54 81v67.1h87.2c51-47 81.4-116.3 81.4-193.1z"
                  fill="#4285F4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.2-24.3 180.3-65.7l-87.2-67.1c-24.2 16.2-55.3 25.7-93.1 25.7-71.6 0-132.2-48.3-153.9-113.2H28v70.7c45.2 89.3 137.2 149.6 244.1 149.6z"
                  fill="#34A853"
                />
                <path
                  d="M118.2 324c-10.3-30.6-10.3-63.4 0-94l-70.2-70.7C-10 225.7-10 318.6 48 397.1l70.2-73.1z"
                  fill="#FBBC05"
                />
                <path
                  d="M272.1 107.7c39.9-.6 78.2 14.8 107.4 42.6l80.2-80.2C417.3 24.3 345.5 0 272.1 0 165.2 0 73.2 60.3 28 149.6l70.2 70.7c21.6-64.9 82.3-112.3 153.9-112.6z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </button>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-[10px] text-gray-500 text-center">
              By logging in, you agree to our{" "}
              <span className="text-green-600 underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-green-600 underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
