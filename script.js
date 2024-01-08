let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["bastão"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText =document.querySelector("#monsterHealth");
const weapons = [
  { name: 'bastão', poder: 5 },
  { name: 'adaga', poder: 30 },
  { name: 'martelo de garra', poder: 50 },
  { name: 'espada', poder: 100 }
];
const monsters = [
  {
    name: "geleca",
    nível: 2,
    saúde: 15
  },
  {
    name: "besta dentada",
    nível: 8,
    saúde: 60
  },
  {
    name: "dragão",
    nível: 20,
    saúde: 300
  }
]
const locations = [
    {
        name: "praça da cidade",
        "botão texto": ["Ir para a loja", "Ir para a caverna", "Lutar contra o dragão"],
        "funções botão": [irLoja, irCaverna, lutarDragão],
        texto: "Você está na praça da cidade. Você vê um sinal que diz \"Loja\"."
    },
    {
        name: "loja",
        "botão texto": ["Comprar 10 de saúde (10 de ouro)", "Comprar arma (30 de ouro)", "Ir para a praça da cidade"],
        "funções botão": [comprarSaude, comprarArma, irCidade],
        texto: "Você entra na loja."
    },
    {
        name: "caverna",
        "botão texto": ["Lutar contra geleca", "Lutar contra besta dentada", "Ir para a praça da cidade"],
        "funções botão": [lutarGeleca, lutarBesta, irCidade],
        texto: "Você entra na caverna. Você vê alguns monstros."
    },
    {
        name: "luta",
        "botão texto": ["Atacar", "Esquivar", "Correr"],
        "funções botão": [atacar, esquivar, irCidade],
        texto: "Você está lutando contra um monstro."
    },
    {
        name: "matar monstro",
        "botão texto": ["Ir para a praça da cidade", "Ir para a praça da cidade", "Ir para a praça da cidade"],
        "funções botão": [irCidade, irCidade, ovoPascoa],
        texto: 'O monstro grita "Arg!" enquanto morre. Você ganha pontos de experiência e encontra ouro.'
    },
    {
        name: "derrota",
        "botão texto": ["REINICIAR?", "REINICIAR?", "REINICIAR?"],
        "funções botão": [reiniciar, reiniciar, reiniciar],
        texto: "Você morre. ☠️"
    },
    { 
        name: "vitória", 
        "botão texto": ["REINICIAR?", "REINICIAR?", "REINICIAR?"], 
        "funções botão": [reiniciar, reiniciar, reiniciar], 
        texto: "Você derrota o dragão! VOCÊ VENCE O JOGO! 🎉" 
    },
    {
        name: "ovo de Páscoa",
        "botão texto": ["2", "8", "Ir para a praça da cidade?"],
        "funções botão": [escolherDois, escolherOito, irCidade],
        texto: "Você encontra um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número que você escolher coincidir com um dos números aleatórios, você ganha!"
    }
];

// inicializar botões
button1.onclick = irLoja;
button2.onclick = irCaverna;
button3.onclick = lutarDragão;

function atualizar(localizacao) {
  monsterStats.style.display = "none";
  button1.innerText = localizacao["botão texto"][0];
  button2.innerText = localizacao["botão texto"][1];
  button3.innerText = localizacao["botão texto"][2];
  button1.onclick = localizacao["funções botão"][0];
  button2.onclick = localizacao["funções botão"][1];
  button3.onclick = localizacao["funções botão"][2];
  text.innerText = localizacao.texto;
}

function irCidade() {
  atualizar(locations[0]);
}

function irLoja() {
  atualizar(locations[1]);
}

function irCaverna() {
  atualizar(locations[2]);
}

function comprarSaude() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Você não tem ouro suficiente para comprar saúde.";
  }
}

function comprarArma() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let novaArma = weapons[currentWeapon].name;
      text.innerText = "Agora você tem um(a) " + novaArma + ".";
      inventory.push(novaArma);
      text.innerText += " Em seu inventário você tem: " + inventory;
    } else {
      text.innerText = "Você não tem ouro suficiente para comprar uma arma.";
    }
  } else {
    text.innerText = "Você já tem a arma mais poderosa!";
    button2.innerText = "Vender arma por 15 de ouro";
    button2.onclick = venderArma;
  }
}

function venderArma() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let armaAtual = inventory.shift();
    text.innerText = "Você vendeu um(a) " + armaAtual + ".";
    text.innerText += " Em seu inventário você tem: " + inventory;
  } else {
    text.innerText = "Não venda sua única arma!";
  }
}

function lutarGeleca() {
  fighting = 0;
  irLuta();
}

function lutarBesta() {
  fighting = 1;
  irLuta();
}

function lutarDragão() {
  fighting = 2;
  irLuta();
}

function irLuta() {
  atualizar(locations[3]);
  monsterHealth = monsters[fighting].saúde;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function atacar() {
  text.innerText = "O(a) " + monsters[fighting].name + " ataca.";
  text.innerText += " Você o ataca com seu(a) " + weapons[currentWeapon].name + ".";
  health -= getValorAtaqueMonstro(monsters[fighting].nível);
  if (foiAcertadoMonstro()) {
    monsterHealth -= weapons[currentWeapon].poder + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Você erra.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    perder();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? vencerJogo() : derrotarMonstro();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Sua(o) " + inventory.pop() + " quebra.";
    currentWeapon--;
  }
}

function getValorAtaqueMonstro(nível) {
  const ataque = (nível * 5) - (Math.floor(Math.random() * xp));
  console.log(ataque);
  return ataque > 0 ? ataque : 0;
}

function foiAcertadoMonstro() {
  return Math.random() > .2 || health < 20;
}

function esquivar() {
  text.innerText = "Você esquiva do ataque do(a) " + monsters[fighting].name;
}

function derrotarMonstro() {
  gold += Math.floor(monsters[fighting].nível * 6.7);
  xp += monsters[fighting].nível;
  goldText.innerText = gold;
  xpText.innerText = xp;
  atualizar(locations[4]);
}

function perder() {
  atualizar(locations[5]);
}

function vencerJogo() {
  atualizar(locations[6]);
}

function reiniciar() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["bastão"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  irCidade();
}

function ovoPascoa() {
  atualizar(locations[7]);
}

function escolherDois() {
  escolher(2);
}

function escolherOito() {
  escolher(8);
}

function escolher(palpite) {
  let números = [];
  while (números.length < 10) {
    números.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Você escolheu " + palpite + ". Aqui estão os números aleatórios:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += números[i] + "\n";
  }
  if (números.indexOf(palpite) !== -1) {
    text.innerText += "Certo! Você ganha 20 de ouro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Errado! Você perde 10 de saúde!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      perder();
    }
  }
}

