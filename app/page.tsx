"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the registration page
    router.push("/register");
  }, [router]);

  return null; // Render nothing while redirecting
}