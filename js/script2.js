let x = document.querySelector('.x')
let o = document.querySelector('.o')
let listBoxes = document.querySelectorAll('.box')
let listButtons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector('#message p');
let containerJogo = document.querySelector('#container');
let containerPlacar = document.querySelector('#scoreboard-container')
let secondPlayer;

//contador de jogadas
let player1 = 0
let player2 = 0

//verificar qual botao foi clicado, 2 jogadores ou vs IA
listButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        secondPlayer = button.getAttribute('id'); //pego o id do butão que foi clicado
        listButtons.forEach(button =>{
            button.style.display = 'none';
        });
        mostrarTabuleiroEPlacar()
    });    
});

function mostrarTabuleiroEPlacar(){
    containerJogo.classList.remove('hide')
    containerPlacar.classList.remove('hide')
}

//jogadas da IA
function iaPlayer(){
    let jogou = 'n'    
    //verificar se é a vez dela e se o botao precionado é vs IA
    if(player1 > player2 && secondPlayer == 'ia-player'){
        let cloneO = o.cloneNode(true)
        while(jogou == 'n'){
            let random = Math.floor(Math.random() * 8)
            if(listBoxes[random].childNodes[0] == undefined){
                listBoxes[random].appendChild(cloneO);
                contadorJogadas++;
                player2++;                          
                jogou = 's';
            }

        }

    }

}

// adicionar evento de click no tabuleiro
listBoxes.forEach(box =>{
    box.addEventListener('click', ()=>{
        let jogador = checarJogador()
        //verificar se nao foi oculpada aquela posição
        if(box.childNodes.length == 0){
            let cloneItem = jogador.cloneNode(true)
            box.appendChild(cloneItem)
            checkWinCondition()
        }
        
    })

})

//verificar de quem é a vez de jogar
function checarJogador(){
    if(player1 == player2){
        player1++;
        return x
    }else{
        player2++;
        return o
    }
}

//lista com as condiçoes de vitorias possiveis
VetorCondicaoVitoria = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
let contarSequenciaPl1 = 0
let contarSequenciaPl2 = 0
let contadorJogadas = 0
//checar condição do jogo
function checkWinCondition(){     
    VetorCondicaoVitoria.forEach(vetor =>{
        vetor.forEach(elemento =>{
            //verificar o item dentro do box na posição do elemento
            if(listBoxes[elemento].childNodes.length != 0){
                boxClass = listBoxes[elemento].childNodes[0].className;
                if(boxClass == 'x'){
                    contarSequenciaPl1++;
                }
                if(boxClass == 'o'){
                    contarSequenciaPl2++;
                }
            }
        })
        gameOver();
        iaPlayer();           
        contarSequenciaPl1 = 0
        contarSequenciaPl2 = 0

    })
    contadorJogadas++ 
     
}

//verificar se algum player venceu ou se deu velha
function gameOver(){
    let scoreBoardX = document.querySelector('#scoreboard-1');
    let scoreBoardO = document.querySelector('#scoreboard-2');
    let msg = '';    
    //verificar o player vencedor
    if(contarSequenciaPl1 == 3){
        msg = 'Player X venceu';
        scoreBoardX.textContent = parseInt(scoreBoardX.textContent) + 1;       
    }else if(contarSequenciaPl2 == 3){
        msg = 'Player O venceu';
        scoreBoardO.textContent = parseInt(scoreBoardO.textContent) + 1;
    }else if(contadorJogadas == 8){
        msg = 'Deu Velha';        
    }

    //mostrar mensagem
    if(msg != ''){
        //mostrar mensagem
        messageText.innerHTML = msg;        
        messageContainer.classList.remove('hide');

        limparTabuleiro();
        //sumir com a mensagem
        setTimeout(function(){
            messageContainer.classList.add('hide');
        }, 2000);
    }
}

function limparTabuleiro(){
    boxesDiv = document.querySelectorAll('.box div');
    listBoxes.forEach(box =>{
        if(box.childNodes.length != 0){
            box.childNodes[0].remove();
        }
    });
    //voltar valores player1 e player2
    player1 = 0;
    player2 = 0;
    contadorJogadas = 0;
}






