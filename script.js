const campos = document.querySelectorAll(".campo");

campos.forEach((campo) => {
  let dx = (Math.random() * 15 - 1) * 2;
  let dy = (Math.random() * 15 - 1) * 2;

  function moverCampo() {
    const rect = campo.getBoundingClientRect(); // pegar coordenadas do campo na tela
    let x = rect.left + dx;
    let y = rect.top + dy;

    // Verificar limites da tela
    if (x < 0 || x > window.innerWidth - rect.width) dx *= -1; // inverter direção se sair da tela
    if (y < 0 || y > window.innerHeight - rect.height) dy *= -1;

    campo.style.left = `${x}px`;
    campo.style.top = `${y}px`;
  }

  // Iniciar a movimentação do campo
  setInterval(moverCampo, 30); // mover o campo a cada 30ms
});

document.addEventListener("click", (event) => {
  const som = document.getElementById("tiro");
  som.currentTime = 0; // reiniciar o som
  som.play(); // tocar o som

  campos.forEach((campo) => {
    const rect = campo.getBoundingClientRect(); // pegar coordenadas do campo na tela
    const dentro =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom; // verificar se o clique está dentro do campo

    if (dentro && !campo.classList.contains("liberado")) {
      // Corrigido para verificar se não está liberado
      campo.classList.add("liberado"); // adicionar a classe liberado ao campo
      campo.querySelector("input").disabled = false;
      document.getElementById("feedback").textContent = `Campo Liberado: ${
        campo.querySelector("input").placeholder
      }`; // mostrar o campo liberado
    }
  });
});
