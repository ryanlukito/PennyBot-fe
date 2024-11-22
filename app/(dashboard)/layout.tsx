"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
  auth: boolean | null;
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { error, auth } = await getUser();
      if (error) {
        router.push("/Login");
        return;
      }
      if (!auth){
        setIsSuccess(false);
      } else{
        setIsSuccess(true);
      }
    })();
  }, [router]);

  if (!isSuccess) {
    return <h1>Loading...</h1>;
  }
  return <main>{children}</main>;
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get(
      "https://tugas-akhir-paw-backend.vercel.app/auth/me"
    );
    return {
      user: data,
      auth: data.auth,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      user: null,
      auth: false,
      error,
    };
  }
}
