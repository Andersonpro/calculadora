const display = document.querySelector(".display div");
const botoesContainer = document.querySelector(".botoes-container");
const tipos = ["(", ")", "%", "CE", "7", "8", "9", "÷", "4", "5", "6", "x", "1", "2", "3", "-", "0", ".", "=", "+"];
const tipos2 = ["(", ")", "%", "Backspace", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "Enter", "+"];
const tipos3 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var cont = 0;
display.textContent = '0';
const final000 = /.000/;
var igual = false;

//cria os botões com o array tipos
for (let i = 0; i < 20; i++) {
    let newBotao = document.createElement("div");
    botoesContainer.appendChild(newBotao);
}

//adiciona os data atributes e o addEventListener para cada botão
const botoes = document.querySelectorAll(".botoes-container div");
botoes.forEach(elemento => {
    elemento.setAttribute("data-botao", tipos[cont]);
    elemento.textContent = tipos[cont];
    elemento.addEventListener('click', () => {
        calculadora(elemento.textContent);
    });
    cont++;
})


//adiciona um evento para o teclado
document.addEventListener('keydown', (evento) => {
    if(tipos2.includes(evento.key)){
        calculadora(evento.key);
    }
} );

function calculadora(elemento){

    //quando for dado o comando de igual (=), aparecer o resultado e logo após o usuário digitar um número, o valor do display deve ser igual ao número
    if(igual && tipos3.includes(elemento)){
        display.textContent  = elemento;
        igual = false;
    }
    else if(elemento === "CE" || elemento === "Backspace" || (display.textContent === "0" && elemento === "=") || (display.textContent === "0" && elemento === "Enter")){
        display.textContent = '0';
        igual = false;
    }
    else if(display.textContent == 0 && display.textContent.length == 1){
        display.textContent = elemento;
        igual = false;
    }
    else if(elemento === "=" || elemento === "Enter"){
        let novaString = display.textContent.replace(/x/g, ' * ');
        novaString = novaString.replace(/÷/g, ' / ');
        novaString = novaString.replace(/%/g, '*(1/100)');
        display.textContent = (parseFloat(eval(novaString))).toFixed(3);
        igual = true;
    }
    else{
        display.textContent += elemento;
        igual = false;
    }

    //faz com que as casas decimais apenas com zeros sumam
    display.textContent = display.textContent.replace(/.000/, '');
}

