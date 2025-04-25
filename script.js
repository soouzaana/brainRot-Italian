const campos = document.querySelectorAll(".campo");
const velocidades = [];

campos.forEach(() => {
  velocidades.push({
    dx: Math.random() * 40 - 3,
    dy: Math.random() * 40 - 3,
  });
});

function moverCampos() {
  campos.forEach((campo, i) => {
    if (campo.classList.contains("liberado")) return;

    const posicao = campo.getBoundingClientRect();
    let x = posicao.left + velocidades[i].dx;
    let y = posicao.top + velocidades[i].dy;

    const largura = window.innerWidth - posicao.width;
    const altura = window.innerHeight - posicao.height;

    if (x < 0 || x > largura) velocidades[i].dx *= -1;
    if (y < 0 || y > altura) velocidades[i].dy *= -1;

    campo.style.left = `${x}px`;
    campo.style.top = `${y}px`;
  });

  for (let i = 0; i < campos.length; i++) {
    for (let j = i + 1; j < campos.length; j++) {
      const campoA = campos[i];
      const campoB = campos[j];

      if (
        campoA.classList.contains("liberado") ||
        campoB.classList.contains("liberado")
      )
        continue;

      const a = campoA.getBoundingClientRect();
      const b = campoB.getBoundingClientRect();

      const colidiu = !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
      );

      if (colidiu) {
        velocidades[i].dx *= -1;
        velocidades[i].dy *= -1;
        velocidades[j].dx *= -1;
        velocidades[j].dy *= -1;
      }
    }
  }
}

setInterval(moverCampos, 50);

document.addEventListener("click", (event) => {
  const som = document.getElementById("tiro");
  som.currentTime = 0;
  som.play();

  campos.forEach((campo) => {
    const pos = campo.getBoundingClientRect();
    const clicadoDentro =
      event.clientX >= pos.left &&
      event.clientX <= pos.right &&
      event.clientY >= pos.top &&
      event.clientY <= pos.bottom;

    if (clicadoDentro && !campo.classList.contains("liberado")) {
      campo.classList.add("liberado");
      campo.querySelector("input").disabled = false;

      const feedback = document.getElementById("feedback");
      feedback.textContent = `Campo Liberado: ${
        campo.querySelector("input").placeholder
      }`;
    }
  });

  const todosLiberados = Array.from(campos).every((campo) =>
    campo.classList.contains("liberado")
  );

  if (todosLiberados) {
    document.getElementById("botaoFinalizar").style.display = "block";
  }
});

const destinos = [
  "Postar no Twitter",
  "Postar no Reddit",
  "Mandar pro Elon Musk",
  "Mandar para o Tralalero Tralala",
  "Mandar para a Ballerina Cappuccina",
  "Enviar para Bolsonaro",
  "Cadastrar em vaga de trabalho no Atacadão",
];

const botao = document.getElementById("botaoFinalizar");

botao.addEventListener("click", () => {
  const roleta = document.getElementById("roleta");
  const opcao = document.getElementById("opcaoRoleta");
  roleta.style.display = "block";

  let sorteado = "";
  let contador = 0;

  const intervalo = setInterval(() => {
    sorteado = destinos[Math.floor(Math.random() * destinos.length)];
    opcao.textContent = sorteado;
    contador++;

    if (contador > 20) {
      clearInterval(intervalo);
      setTimeout(() => {
        roleta.style.display = "none";
        executarAcao(sorteado);
      }, 500);
    }
  }, 100);
});

function executarAcao(destino) {
  alert(`Decisão final: ${destino}`);

  const imagemAntiga = document.getElementById("resultado");
  if (imagemAntiga) imagemAntiga.remove();

  const imagem = document.createElement("img");
  imagem.id = "resultado";
  imagem.style.position = "fixed";
  imagem.style.top = "50%";
  imagem.style.left = "50%";
  imagem.style.transform = "translate(-50%, -50%)";
  imagem.style.zIndex = "900";
  imagem.style.maxHeight = "500px";
  imagem.style.margin = "20px auto";

  switch (destino) {
    case "Postar no Twitter":
      window.open("https://x.com", "_blank");
      break;
    case "Postar no Reddit":
      window.open("https://www.reddit.com", "_blank");
      break;
    case "Mandar pro Elon Musk":
      window.open("https://x.com/elonmusk", "_blank");
      break;
    case "Mandar para o Tralalero Tralala":
      imagem.src = "assets/tralalero.png";
      imagem.alt = "Tralalero Tralala";
      document.body.appendChild(imagem);

      const audioTralalero = document.getElementById("tralaleroAudio");
      audioTralalero.currentTime = 0;
      audioTralalero.play();
      break;
    case "Mandar para a Ballerina Cappuccina":
      imagem.src = "assets/ballerina.png";
      imagem.alt = "Ballerina Cappuccina";
      document.body.appendChild(imagem);

      const audioBallerina = document.getElementById("ballerinaAudio");
      audioBallerina.currentTime = 0;
      audioBallerina.play();
      break;
    case "Enviar para Bolsonaro":
      window.open("https://www.facebook.com/jairmessias.bolsonaro", "_blank");
      break;
    case "Cadastrar em vaga de trabalho no Atacadão":
      window.open("https://www.atacadao.com.br/trabalhe-conosco", "_blank");
      break;
    default:
      alert("Erro ao executar ação.");
  }
}
