var ctx = document.getElementById('canvas').getContext('2d');
ctx.font = '48px serif';
window.addEventListener( "keydown", doKeyDown, true);
//canvas.addEventListener("click", doClick,false); 
var width = canvas.width;
var height = canvas.height;
const ptimer=20;

var playerTimer=ptimer;
var playerScore=0;
var waiting=0;		//boolean en attente entree utilisateur
var currentLetter=0;

function draw() {
  var str=currentLetter;
  ctx.fillText(str,  width/2-24*str.length,48);
}
function drawTimer(){
	var str=playerTimer;
	ctx.fillText(str,50,48);	
}
function genAuto(){
	var r=Math.random()*26;	//num lettre alphabet
	waiting=1;
	currentLetter= String.fromCharCode(97+r);	//lettre
}
function doKeyDown(e){
	console.log(e.key);
	checkAnswear(e.key);
	if (end==1 && e.key=="r"){
		retry();
	}
}
function checkAnswear(entree){
	if (entree==currentLetter){
		playerScore+=1;
		currentLetter=0;
		genAuto();
	}
	else{
		playerTimer-=5;
		currentLetter=0;
		genAuto();
	}
}


function drawEndScreen(){
	ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
	
	ctx.fillStyle = 'black';
	
	var str=playerScore;
	ctx.fillText(str,width/2-24,height/2);
	requestAnimationFrame(drawEndScreen);
	
}

function checkLetter(){
	if  (currentLetter==0){
		genAuto();
	}
}



var lastCalledTime=Date.now()	;
function updatePlayerTimer(){
	
	if (((Date.now()-lastCalledTime)/100)>6){
		lastCalledTime = Date.now();
		playerTimer-=1;
	}
	
}


function retry(){
	genAuto();
	playerScore=0;
	playerTimer=ptimer;	
	
}
/*
function doClick(e){
	console.log("roar");
	var x=(e.clientX>width/2-48 && e.clientX<width/2+48);
	var y=(e.clientX>height/2+10 && e.clientX<width/2+30);
	
	if(playerTimer>0 && x && y )
	console.log(e.clientX);
}
*/
var end=0;
checkLetter();		// init letter
function loop() {
	ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
	if(playerTimer>0){
		ctx.fillStyle = 'black';
		updatePlayerTimer();
		draw();
		drawTimer();
		
	}
	else
	{
		ctx.fillStyle = 'black';
		drawEndScreen();
		var str="press r to restart";
		ctx.fillText(str,width/2-str.length*12,height/2+48);
		end=1;
	}
	
	requestAnimationFrame(loop);
}

loop();
