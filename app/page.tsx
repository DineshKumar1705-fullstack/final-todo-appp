"use client";

import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<GoogleUser | null>(null);

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-sm w-full text-center">
        {!user ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Login with <span className="text-blue-600">Google</span>
            </h2>
            <div className="flex justify-center">

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential)
                 {
                    const decoded: any = jwtDecode(credentialResponse.credential);
                    setUser({
                      name: decoded.name,
                      email: decoded.email,
                      picture: decoded.picture,
                    });
                    router.push("/todo");
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <p className="text-gray-500 text-sm mt-8">
              Secure sign-in powered by Google OAuth
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={user.picture}
              alt="profile"
              className="w-24 h-24 rounded-full shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Welcome, {user.name}!
            </h3>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              onClick={() => {
                googleLogout();
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
