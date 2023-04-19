import { useEffect } from "react";
import { useRouter } from "next/router";

const CustomError = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
};

export default CustomError;
