import { getIP } from "../../functions/ip";
import { getPort } from "../../functions/port";

window.onload = async function() {
    let token = getCookie("x-access-token");
    // Se o token existir, envie uma solicitação POST para validar o token
    if (token) {
        let data = { "x-access-token": token };

        const teste = await fetch(`${getIP()}:${getPort()}/home`, {
            method: "GET",
            headers: {
                "x-access-token": token,
            },
        });
        console
            .log(teste)
            .then((response) => {
                if (response.status === 401) {
                    // Redireciona para a página de login se o token for inválido
                    window.location.href = "../Login/login.html";
                } else {
                    // faça algo com a resposta da API
                }
            })
            .catch((error) => {
                console.log(error);
                // gerencie o erro
            });
    } else {
        console.log("n existe");
        // Redireciona para a página de login se o token não existir
        window.location.href = "../Login/login.html";
    }
};
// Função auxiliar para ler um cookie por nome
function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}
