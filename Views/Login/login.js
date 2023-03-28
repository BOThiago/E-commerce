var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

document
    .getElementById("registro")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // evita que o formulário seja enviado usando o método padrão

        var nameInput = document.getElementById("username");
        var emailInput = document.getElementById("email");
        var cpfInput = document.getElementById("cpf");
        var passwordInput = document.getElementById("password");
        dados = {
            nome: nameInput.value,
            email: emailInput.value,
            cpf: cpfInput.value,
            password: passwordInput.value,
        };
        console.log(dados);
        fetch(`http://${IP}:4335/signup`, {
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
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // evita que o formulário seja enviado usando o método padrão
    var emailcpfInput = document.getElementById("emailcpf");
    var passwordloginInput = document.getElementById("passwordlogin");
    dados = {
        login: emailcpfInput.value,
        password: passwordloginInput.value,
    };
    fetch(`http://${IP}:4335/signin`, {
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
