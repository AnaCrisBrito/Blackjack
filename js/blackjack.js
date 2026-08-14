
class Stack {
    constructor() {
        this.items = []
    }

    push(item) {
        this.items.push(item);
    }
    top() {
        return this.items[this.items.length - 1];
    }
    pop() {
       return this.items.pop();
    }
} 
class Card {
    constructor(codigo) {
        this.cod = codigo;
        this.naipe = "NULO";
        this.valor = 0;
        this.imagem = "back_01";
    }

    getCod() {
        return this.cod;
    }
    setValor(v) {
        this.valor = v;
    }
    getValor() {
        return this.valor;
    }

    setImagem(img) {
        this.imagem = img;
    }

    getImagem() {
        return this.imagem;
    }

}

// inicio automatica
let monte = new Stack();
let cartasJogadas = new Stack();
let cartas = geradorDeCartas();
let mesa = [];
let cartaAtual;

cartas = embaralhar(cartas);
empilhar(cartas);
distribuir();
desenharMesa();
///fim inicio automatico

// FUNÇÕES
function geradorDeCartas() { //g + {valor} + {naipe - c, d, h, s}
    let vetor = []; //g1c
    for (let i = 1; i <= 13; i++) {

        for (let x = 0; x < 4; x++) {
            let codigo = "g" + i;
            let nomeImagem = "";
            if (i == 1) {
                nomeImagem = "ace";
            } else if (i == 11) {
                nomeImagem = "jack";
            } else if (i == 12) {
                nomeImagem = "queen"
            } else if (i == 13) {
                nomeImagem = "king";
            } else {
                nomeImagem = i;
            }

            if (x == 0) {
                // 0 = c -> clubs -> Paus              
                codigo += "c";
                nomeImagem = nomeImagem + "_of_clubs"
            } else if (x == 1) {
                // 1 = d -> diamonds -> Ouros
                nomeImagem = nomeImagem + "_of_diamonds"
                codigo = codigo + "d"
            } else if (x == 2) {
                // 2 = h -> hearts -> Copas
                nomeImagem = nomeImagem + "_of_hearts"
                codigo = codigo + "h"
            } else {
                // 3 = s -> spades -> Espada
                nomeImagem = nomeImagem + "_of_spades"
                codigo = codigo + "s"
            }
                let carta = new Card(codigo);
                carta.setValor(i > 10 ? 10 : i);
                carta.setImagem(nomeImagem);
                vetor.push(carta);
                }

            
        }

        return vetor;
    }
    


function empilhar(vetor) {
    for (let i = 0; i < vetor.length; i++) {
        monte.push(vetor[i]);
    }
}

function sortearNumero() {
    let min = 0;
    let max = 51;
    let numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero;
}

function embaralhar(lista) {
    let vetor = [];
    while (vetor.length < lista.length) {
        let iSort = sortearNumero();
        let valido = true;
        for (let x = 0; x < vetor.length; x++) {
            if (lista[iSort].cod == vetor[x].cod) {
                valido = false;
                break
            }
        }
        if (valido) {
            vetor.push(lista[iSort]);
        }
    }
    return vetor;
}

function distribuir() {
    mesa.push(monte.top());
    monte.pop();
    mesa.push(monte.top());
    monte.pop();
}

function desenharMesa() {
    let elemento = document.getElementById("cartas-jogador");
    let pagina = "";
    for (let i = 0; i < mesa.length; i++) {
        pagina = pagina + "<div> <img src='cards/" + mesa[i].getImagem() + ".png' /> </div>"
    }
    elemento.innerHTML = pagina;

    const pontos = calcularPontuacao(mesa);
    document.getElementById("pontos").innerText = "Pontuação: " + pontos;
  
}
function calcularPontuacao(mao) {
    let total = 0;
    let ases = 0;
  
    for (let carta of mao) {
      const valor = carta.getValor();
      total += valor;
      if (valor === 1) ases++;
    }
  
    while (ases > 0 && total + 10 <= 21) {
      total += 10;
      ases--;
    }
  
    return total;
  }
  
  function virarCarta() {
    const elemento = document.getElementById("cartas-jogador");
    cartaAtual = monte.pop();
    elemento.innerHTML += `<img src='cards/${cartaAtual.getImagem()}.png' />`;
    mesa.push(cartaAtual);
    desenharMesa();
  
    const pontos = calcularPontuacao(mesa);
    const mensagem = document.getElementById("mensagem");
  
    if (pontos > 21) {
      mensagem.innerText = "Você perdeu!";
      setTimeout(() => {
        novoJogo();
      }, 2000);
    } else if (pontos === 21) {
      mensagem.innerText = "Blackjack!";
      setTimeout(() => {
        novoJogo();
      }, 2000);
    } else {
      mensagem.innerText = "";
    }
  }
  
  function pegarCarta() {
    mesa.push(monte.pop());
    desenharMesa();
  
    const pontos = calcularPontuacao(mesa);
    const mensagem = document.getElementById("mensagem");
  
    if (pontos > 21) {
      mensagem.innerText = "Você perdeu!";
      setTimeout(() => {
        novoJogo();
      }, 2000); 
    } else if (pontos === 21) {
      mensagem.innerText = "Blackjack!";
      setTimeout(() => {
        novoJogo();
      }, 2000);
    } else {
      mensagem.innerText = "";
    }
  }
  
  function pararJogo() {
    const pontos = calcularPontuacao(mesa);
    const mensagem = document.getElementById("mensagem");
    if (mesa.length === 2 && pontos === 21) {
        mensagem.innerText = "Blackjack!";
      } else {
        mensagem.innerText = "Você parou com " + pontos + " pontos.";
      }
    setTimeout(()=>{
        novoJogo();
    }, 2000);
  }
  
  function novoJogo() {
    mesa = [];
    cartas = geradorDeCartas();
    cartas = embaralhar(cartas);
    monte = new Stack();
    empilhar(cartas);
    distribuir();
    desenharMesa();
    document.getElementById("mensagem").innerText = "";
  }