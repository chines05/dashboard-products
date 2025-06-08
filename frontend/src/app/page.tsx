"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const App = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return null;
};

export default App;
