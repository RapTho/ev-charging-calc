"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Settings page has been removed. Redirecting to home.
export default function SettingsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
