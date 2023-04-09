import { useState, useEffect } from "react";
import api from "./services/api";

interface UseAuthorizationOptions {
  endpoint: string;
}

interface UseAuthorizationResult {
  isLoading: boolean;
  conteudo: string;
}

const useAuthorization = ({ endpoint }: UseAuthorizationOptions): UseAuthorizationResult => {
  const [conteudo, setConteudo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function authorization(error: any) {
    if (error.response && error.response.status === 401) {
      reload();
      return;
    }
  }

  async function reload() {
    window.location.href = "/signin";
    return;
  }

  async function fetchData() {
    let token = window.localStorage.getItem("token");

    if (!token) {
      reload();
      return;
    }

    try {
      const response = await api.get(endpoint, {
        headers: {
          "x-access-token": token,
        },
      });

      setConteudo(response.data.message);
    } catch (error) {
      console.error(error);
      authorization(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, conteudo };
};

export default useAuthorization;
