/* 
DESCRIZIONE DEL GIOCO
Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.
LA partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba
# MILESTONE 1
Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il punteggio e scriviamo un messaggio appropriato.
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)
# SUPERBONUS
Colorare tutte le celle bomba quando la partita finisce */

//1:
// prepariamo una variabile per il punteggio
// incrementiamo il punteggio al click
// una volta cliccata una cella rendiamo impossibile cliccarci di nuovo

//2:
// creiamo una variabile per le bombe totali
// creiamo una funzione per generare un numero tra 1 e il numero di celle disponibili
// stampiamo in console

//3:
// recuperiamo la casella cliccata dall'utente
// confrontiamola con l'array di bombe
// in caso fosse nell'array la cella diventa rossa
// altrimenti si colora di azzurro e si incrementa il punteggio

//4:
// controllare al click se è stato raggiunto il punteggio massimo possibile in base le celle disponibili
// se è stato raggiunto il punteggio massimo la partita termina
// prendiamo il punteggio raggiunto e prepariamo un messaggio adeguato

//5:
// capire se la partita è finita per aver preso una bomba o raggiunto il punteggio massimo
// stampare il punteggio raggiunto in pagina
// stampare un messaggio adeguato in pagina


// # FUNCTIONS

//funzione per generare una cella
const createCell = content => {
const cell = document.createElement('div');
cell.className = 'cell';
cell.append(content);
return cell;
}

// funzione per generare un numero tra 1 e il numero di celle disponibili
const createRandomNumber = (max, totalNumbers) => {
    const numbers =[];
    while(numbers.length < totalNumbers) {
        const randomNumber = Math.floor(Math.random () * max) +1 ;
        numbers.push(randomNumber);
    }

    return numbers;
  
}

//# preparation phase

//recupero gli elementi dal DOM
const buttonElement = document.getElementById('play-btn');
const gridElement = document.getElementById('grid');
const formElement = document.querySelector('form');
const difficultyField = document.getElementById('difficulty');
const scoreField = document.getElementById ('score')




// preparo una variabile per il punteggio
let score = 0;
//bombe totali
const totalBombs = 16;

//# Elaboration phase

//!bonus
// aggiungo degli eventi al form

formElement.addEventListener('submit', function(e){
    e.preventDefault();
    //resetto la griglia
    gridElement.innerHTML = '' ;

    //prendo i valori delle options 
    const difficulty = difficultyField.value ;
    
    //preparo una variabile per la grandezza delle celle
    let cells = 7 * 7;
    
    switch(difficulty) {

        case 'hard': 
            cells = 9 * 9 ;
            break;
        case 'veryhard':
            cells = 10 * 10 ;
            break;
            
    }
    
    //creo le bombe e stampo in console
    const bombs = createRandomNumber (cells, totalBombs);
    console.log ('bombs', bombs);
        
    // creo un ciclo per generare le celle della griglia e individuarne il numero
    for(let i = 0; i < cells; i++) {
        let cell = createCell(i+1);

    //# Output Phase

        // cambio la grandezza della griglia in base al valore inserito
        switch(difficulty) {
            case 'normal' :
                cell.classList.add('big');
                break;
            case 'hard' :
                cell.classList.add('medium');
                break;
            case 'veryhard':
                cell.classList.add('small');
            
        }

        //rimando in pagina le celle
        gridElement.appendChild(cell);
       

        //aggiungo un evento alla cella
        cell.addEventListener('click', function(){
            
            // una volta cliccata una cella rendiamo impossibile cliccarci di nuovo
            if(cell.classList.contains('clicked')) return;

            // incrementiamo il punteggio al click
            score++;
            console.log('score', score);

            // stampo in console il numero della cella
            console.log(i+1);

            // coloro la cella cliccata di azzurro
            cell.classList.add('clicked');

        })
    }
        
})
