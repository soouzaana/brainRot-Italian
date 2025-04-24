const campos = document.querySelectorAll(".campo");
const velocidades = [];

campos.forEach(() => {
  velocidades.push({
    dx: (Math.random() * 10 - 1) * 3,
    dy: (Math.random() * 10 - 1) * 3,
  });
});

function moverCampo() {
  campos.forEach((campo, index) => {
    if (campo.classList.contains("liberado")) return;

    const rect = campo.getBoundingClientRect();
    let dx = velocidades[index].dx;
    let dy = velocidades[index].dy;
    let x = rect.left + dx;
    let y = rect.top + dy;

    if (x < 0 || x > window.innerWidth - rect.width)
      velocidades[index].dx *= -1;
    if (y < 0 || y > window.innerHeight - rect.height)
      velocidades[index].dy *= -1;

    campo.style.left = `${x}px`;
    campo.style.top = `${y}px`;
  });

  for (let i = 0; i < campos.length; i++) {
    for (let j = i + 1; j < campos.length; j++) {
      if (
        campos[i].classList.contains("liberado") ||
        campos[j].classList.contains("liberado")
      )
        continue;

      const rect1 = campos[i].getBoundingClientRect();
      const rect2 = campos[j].getBoundingClientRect();

      const colide = !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );

      if (colide) {
        velocidades[i].dx *= -1;
        velocidades[i].dy *= -1;
        velocidades[j].dx *= -1;
        velocidades[j].dy *= -1;
      }
    }
  }
}

setInterval(moverCampo, 50);

document.addEventListener("click", (event) => {
  const som = document.getElementById("tiro");
  som.currentTime = 0;
  som.play();

  campos.forEach((campo) => {
    const rect = campo.getBoundingClientRect();
    const dentro =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (dentro && !campo.classList.contains("liberado")) {
      campo.classList.add("liberado");
      campo.querySelector("input").disabled = false;
      document.getElementById("feedback").textContent = `Campo Liberado: ${
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
  let count = 0;
  let resultadoFinal = "";

  const intervalo = setInterval(() => {
    const sorteio = destinos[Math.floor(Math.random() * destinos.length)];
    opcao.textContent = sorteio;
    resultadoFinal = sorteio;
    count++;
    if (count > 20) {
      clearInterval(intervalo);
      setTimeout(() => {
        roleta.style.display = "none";
        executarAcao(resultadoFinal);
      }, 500);
    }
  }, 100);
});

function executarAcao(destino) {
  alert(`Decisão final: ${destino}`);

  // remover imagens do tralalero e ballerina
  const imagem = document.getElementById("resultado");
  if (imagem) {
    imagem.remove();
  }

  // container para a imagem com z-index alto
  const container = document.createElement("img");
  container.id = "resultado";
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "900";
  container.style.maxHeight = "500px";
  container.style.display = "block";
  container.style.margin = "20px auto";

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
      container.src = "assets/tralalero.png";
      container.alt = "Tralalero Tralala";
      document.body.appendChild(container);

      const audioTralalero = document.getElementById("tralaleroAudio");
      audioTralalero.currentTime = 0;
      audioTralalero.play();

      break;

    case "Mandar para a Ballerina Cappuccina":
      container.src = "assets/ballerina.png";
      container.alt = "Ballerina Cappuccina";
      document.body.appendChild(container);
      const audioBallerina = document.getElementById("ballerinaAudio");
      audioBallerina.currentTime = 0;
      audioBallerina.play();
      break;
    case "Enviar para Bolsonaro":
      window.open(
        "https://www.facebook.com/jairmessias.bolsonaro/?locale=pt_BR",
        "_blank"
      );
      break;
    case "Cadastrar em vaga de trabalho no Atacadão":
      window.open("https://www.atacadao.com.br/trabalhe-conosco", "_blank");
      break;
    default:
      alert("Erro");
  }
}
