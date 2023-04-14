import React from "react";
import useAuthorization from "./useAuthorization";

const Home: React.FC = () => {
  const { isLoading, conteudo } = useAuthorization({ endpoint: "/home" });

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        conteudo && (
          <>
            <h1>Usuário Logado</h1>
            <p>{conteudo}</p>
          </>
        )
      )}
    </div>
  );
};

export default Home;
