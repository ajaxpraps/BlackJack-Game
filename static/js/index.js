// challeenge 1 -->
function reset()
{
    document.getElementById('ageindays').remove();
}

function ageindays(){
var birthday = prompt('What year were you born ... my dear friend ? ');
if(birthday==null)
{
}
else
{
var ageindayss = (2020 - birthday)*365;
var h1 = document.createElement('h1');
var text = document.createTextNode('You are ' + ageindayss + ' days old.');
h1.setAttribute('id','ageindays');
h1.appendChild(text);
document.getElementById('flex-box-result').appendChild(h1);
}

}
 
// Challange 2
function generatecat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = " https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/8g.gif ";
    div.appendChild(image);
}

// Challange 3

function rpsGame(yourchoice)
{
    console.log(yourchoice.id);
    var humanchoice, botchoice;
    humanchoice = yourchoice.id;

    botchoice = numberTOchoice(rpstoINT());
    console.log(botchoice);

    result = decidewinner(humanchoice,botchoice);
    console.log(result);

    message = finalmessage(result[0]);
    console.log(message);

    rpsfrontend(humanchoice,botchoice,message);
}
function rpstoINT(){
    return Math.floor(Math.random() * 3);
}
function numberTOchoice(number){
    return ['rock','paper','scissor'][number];
}
function decidewinner(urchoice,computerchoice){
    var database = {
        'rock': {'scissor' : 1, 'rock' : 0.5, 'paper' : 0},
        'paper': {'rock' : 1,'paper' : 0.5, 'scissor' : 0},
        'scissor' : {'paper' : 1,'scissor' : 0.5, 'rock' : 0}
    };
    var yourscore = database[urchoice][computerchoice];
    var computerscore = 1 - yourscore;
    return [yourscore,computerscore];
}
function finalmessage(yourscore)
{
    if(yourscore === 0)
    {
        return {'message' : 'You lost!','color' : 'red'};
    }
    else if(yourscore === 0.5)
    {
        return {'message' : 'You tied!','color' : 'yellow'};
    }
    else
    {
        return {'message' : 'You won!','color' : 'green'};
    }
}
function rpsfrontend(humanchoice,botchoice,message){    
    var imagesDatabase = {
        'rock' : document.getElementById('rock').src ,
        'paper' : document.getElementById('paper').src ,
        'scissor' : document.getElementById('scissor').src
    };
    // lets remove all images in flex
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    // lets show final result
    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humandiv.innerHTML = " <img src='" + imagesDatabase[humanchoice]  + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(37,50,233,1);'> "
    botdiv.innerHTML = "<img src='" + imagesDatabase[botchoice]  + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(243,38,24,1);'>"
    messagediv.innerHTML =" <h1 style='color: " + message['color'] + "; font-size: 60px; padding:30px; '>" + message['message'] + "</h1>";
    
    document.getElementById('flex-box-rps-div').appendChild(humandiv);
    document.getElementById('flex-box-rps-div').appendChild(messagediv);
    document.getElementById('flex-box-rps-div').appendChild(botdiv);
    
}

// challange 4 color buttons ....
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);
var copyallbuttons = [];
for(let i=0;i<all_buttons.length;i++)
{
    copyallbuttons.push(all_buttons[i].classList[1]);
}

function colorchange(buttonthingy)
{
    if(buttonthingy.value == 'red')
    {
        buttonred();
    }
    else if (buttonthingy.value == 'green'){
        buttongreen();
    }
    else if(buttonthingy.value == 'reset'){
        buttonreset();
    }
    else{
        buttonrandom();
    }
}
console.log(all_buttons);
function buttonred()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttongreen()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonreset()
{
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyallbuttons[i]);
    }
}
function buttonrandom()
{
    var clrs = ['btn-primary','btn-success','btn-warning','btn-danger'];
    for(let i=0;i<all_buttons.length;i++){
        let randomnumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(clrs[randomnumber]);
    }
}

// Challange 5: BlackJack.........

let blackjackGame = {
    'you': {'scorespan' : '#your-blackjack-result', 'div' : "#your-box" , 'score' : 0},
    'dealer': {'scorespan' : '#dealer-blackjack-result', 'div' : "#dealer-box" , 'score' : 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardscore' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitsound = new Audio('static/sounds/swish.m4a');
const losssound = new Audio('static/sounds/aww.mp3');
const winsound = new Audio('static/sounds/cash.mp3');


document.querySelector("#blackjack-hit-button").addEventListener("click",blackjackhit);

document.querySelector("#blackjack-stand-button").addEventListener("click",dealerlogic);

document.querySelector("#blackjack-deal-button").addEventListener("click",blackjackdeal);

function blackjackhit()
{
    if(blackjackGame['isStand'] === false){
    let card = blackjackGame['cards'][Math.floor(Math.random() * 13)];
    showcard(card,YOU);
    cardsscore(card,YOU);
    updatescore(YOU);
    }
}

function showcard(card,activeplayer){
    if(activeplayer['score'] < 22){
    let cardimage = document.createElement('img');
    cardimage.src = `static/images/${card}.png`;
    document.querySelector(activeplayer['div']).appendChild(cardimage);
    hitsound.play();
    }
}

function blackjackdeal(){
    // showresult(computewinner());
    if(blackjackGame['turnsOver']){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    // console.log(yourImages);
    for(let i=0;i<yourImages.length;i++)
        yourImages[i].remove();
    for(let i=0;i<dealerImages.length;i++)
        dealerImages[i].remove();
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector(YOU['scorespan']).textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';

    document.querySelector(DEALER['scorespan']).textContent = 0;
    document.querySelector(DEALER['scorespan']).style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's Play";
    document.querySelector('#blackjack-result').style.color = "black";

    blackjackGame['isStand'] = false;
    blackjackGame['turnsOver'] = false;
    }



}

function cardsscore(card,activeplayer){
    if(card=='A'){
         if(activeplayer['score'] + blackjackGame['cardscore'][card][1] < 22){
            activeplayer['score'] += blackjackGame['cardscore'][card][1];
    }
    else{
        activeplayer['score'] += blackjackGame['cardscore'][card][0];
    }
}
else{
    activeplayer['score'] += blackjackGame['cardscore'][card];
}
}

function updatescore(activeplayer){
    if(activeplayer['score'] > 21){
        document.querySelector(activeplayer['scorespan']).textContent = "BUST !";
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
    }else{
    document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score']; 
}
}

 function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerlogic(){
    blackjackGame['isStand']  = true;
    while(DEALER['score'] < 16 || DEALER['score'] < YOU['score'])
    {
    let card = blackjackGame['cards'][Math.floor(Math.random() * 13)];
    showcard(card,DEALER);
    cardsscore(card,DEALER);
    updatescore(DEALER);
    await sleep(1000);
    }

        blackjackGame['turnsOver'] = true;
        let winner = computewinner();
        showresult(winner);
}

function computewinner(){
    let winner;
     
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}

function showresult(winner){
    let message,messagecolor;

    if(blackjackGame['turnsOver'] === true){

    if(winner == YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!'
        messagecolor = 'green';
        winsound.play();
    }
    else if(winner == DEALER){
        document.querySelector('#loses').textContent = blackjackGame['losses'];
        message = 'You lost!';
        messagecolor = 'red';
        losssound.play();
    }
    else{
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        messagecolor = 'black';
        message = 'You drew';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messagecolor;
}

}
