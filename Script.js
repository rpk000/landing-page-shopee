let salario = 0;
let totalGasto = 0;

const synth = window.speechSynthesis;

function falar(texto) {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "pt-BR";

  const vozes = speechSynthesis.getVoices();
  const feminina = vozes.find(v => v.lang === "pt-BR") || vozes[0];
  if (feminina) msg.voice = feminina;

  speechSynthesis.speak(msg);
}

function definirSalario() {
  let valor = prompt("Digite seu salário:");
  if (!valor || valor <= 0) return;
  salario = Number(valor);
  document.getElementById("salario").textContent = salario.toFixed(2);
  atualizar();
}

function confirmar(categoria) {
  let inputId = {
    "Compra do mês": "compra",
    "Lazer": "lazer",
    "Investimentos": "investimentos",
    "Conta de luz": "luz",
    "Conta de água": "agua",
    "Outros gastos": "outros",
    "Reserva de emergência": "reserva"
  }[categoria];

  let valor = Number(document.getElementById(inputId).value);
  if (valor <= 0) return alert("Digite um valor válido");

  totalGasto += valor;
  atualizar();

  falar(`${categoria} confirmado no valor de ${valor} reais.`);
}

function atualizar() {
  document.getElementById("total").textContent = totalGasto.toFixed(2);
  document.getElementById("saldo").textContent = (salario - totalGasto).toFixed(2);
}

function explicarSaldo() {
  let saldo = salario - totalGasto;
  falar(`Seu saldo restante é de ${saldo.toFixed(2)} reais. Continue controlando seus gastos.`);
}

definirSalario();
