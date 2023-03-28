window.onload = function() {
  let token = getCookie("x-access-token");
  // Se o token existir, envie uma solicitação POST para validar o token
  if (token) {
    let data = { "x-access-token": token };

    fetch("http://10.112.92.41:4335/home", {
      method: "POST",
      headers: {
        "x-access-token": token
      },
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
      console.log(error);
      // gerencie o erro
    });
  } else {
    console.log('n existe');
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
