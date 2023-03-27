window.onload = function() {
  let token = getCookie("token");

  // Se o token existir, envie uma solicitação POST para validar o token
  if (token) {
    let data = { token: token };

    fetch("http://10.112.92.41:4335/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.status === 401) {
        // Redireciona para a página de login se o token for inválido
        window.location.href = "../Login/login.html";
      } else {
        // faça algo com a resposta da API
      }
    })
    .catch(error => {
      // gerencie o erro
    });
  } else {
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
