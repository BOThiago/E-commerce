import { getIP } from "../../functions/ip";
import { getPort } from "../../functions/port";

console.log(getIP());
console.log(getPort());

let btnSignin = document.querySelector("#signin");
let btnSignup = document.querySelector("#signup");

let body = document.querySelector("body");

btnSignin.addEventListener("click", function() {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function() {
    body.className = "sign-up-js";
});

document.getElementById("registro").addEventListener("submit", function(event) {
    event.preventDefault(); // evita que o formulário seja enviado usando o método padrão

    let nameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let cpfInput = document.getElementById("cpf");
    let passwordInput = document.getElementById("password");
    dados = {
        nome: nameInput.value,
        email: emailInput.value,
        cpf: cpfInput.value,
        password: passwordInput.value,
    };
    console.log(dados);
    fetch(`${getIP()}:${getPort()}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // faça algo com a resposta da API
        })
        .catch((error) => {
            console.error(error); // trate erros de rede ou da API
        });
});
document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault(); // evita que o formulário seja enviado usando o método padrão
    let emailcpfInput = document.getElementById("emailcpf");
    let passwordloginInput = document.getElementById("passwordlogin");
    dados = {
        login: emailcpfInput.value,
        password: passwordloginInput.value,
    };
    fetch(`${getIP()}:${getPort()}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let token = data.token;
            document.cookie = "x-access-token=" + token + "; path=/";
            window.location.href = "../Home/home.html";
            // faça algo com a resposta da API
        })
        .catch((error) => {
            console.error(error); // trate erros de rede ou da API
        });
});
