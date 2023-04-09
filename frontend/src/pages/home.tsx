import React from "react";
import useAuthorization from "./useAuthorization";

interface HomeProps {
  isLoading: boolean;
  conteudo: string;
}

const Home: React.FC<HomeProps> = () => {
    const { isLoading, conteudo } = useAuthorization({ endpoint: "/home" });

    return (
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Usuário Logado</h1>
            <p>{conteudo}</p>
          </>
        )}
      </div>
    );
  };
  

export default Home;
