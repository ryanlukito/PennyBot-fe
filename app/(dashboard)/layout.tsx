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
      const { user, error, auth } = await getUser();
      console.log(`user: ${user}`);
      console.log(`authentication status: ${auth}`);
      if (error) {
        router.push("/Login");
        setIsSuccess(false);
        return;
      }
      setIsSuccess(true);
      console.log(user);
      console.log(auth);
    })();
  }, [router]);

  if (!isSuccess) {
    return <h1>Loading...</h1>;
  }
  return <main>{children}</main>;
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");
    console.log(data);
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
