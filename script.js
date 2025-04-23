const campos = document.querySelectorAll(".campo");
const velocidades = [];

campos.forEach(() => {
  velocidades.push({
    dx: (Math.random() * 4 - 1) * 3,
    dy: (Math.random() * 4 - 1) * 3,
  });
});

function moverCampo() {
  campos.forEach((campo, index) => {
    const rect = campo.getBoundingClientRect(); // pegar coordenadas do campo na tela
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

setInterval(moverCampo, 30);

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
      const tralalero = document.createElement("img");
      img.src = "assets/tralalero.png";
      img.alt = "Tralalero Tralala";
      img.style.maxWidth = "300px";
      img.style.display = "block";
      img.style.margin = "20px auto";
      document.body.appendChild(tralalero);
      const audioTralalero = document.getElementById("tralaleroAudio");
      audioTralalero.currentTime = 0;
      audioTralalero.play();
      break;
    case "Mandar para a Ballerina Cappuccina":
      const ballerina = document.createElement("img");
      img.src = "assets/ballerina.png";
      img.alt = "Ballerina Cappuccina";
      img.style.maxWidth = "300px";
      img.style.display = "block";
      img.style.margin = "20px auto";
      document.body.appendChild(ballerina);
      const audioBallerina = document.getElementById("ballerinaAudio");
      audioBallerina.currentTime = 0;
      audioBallerina.play();
      break;
    default:
      alert("Erro");
  }
}
