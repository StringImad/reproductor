//Array donde vamos a guardar el nombre de todas las canciones
const canciones = [
"hotel-california.m4a",
"the back street boys",
"From shakira to Pique",

]
var indiceActual = new Array(1)
//creamos el listado de canciones 
const crearPlayList=() =>{
	const listado = document.createElement('ol')
	listado.setAttribute("id", 'listadoMusica')
	for (let i = 0; i<canciones.length; i++){
		const item = document.createElement('li')
		item.appendChild(document.createTextNode(canciones[i])) 
		item.setAttribute("id", canciones.indexOf(canciones[i]))
		listado.appendChild(item)
	}
	return listado
}
document.getElementById('playList').appendChild(crearPlayList())
 
var listadoMusica= document.getElementById('listadoMusica')
listadoMusica.onclick = (e) =>{
	const itemClick = e.target
	removeActive()
	itemClick.classList.add("active");
	reproduccionActual("Reproduciendo: "+ itemClick.innerText)
	loadMusic(itemClick.innerText)
	player.play()
	indiceActual[0]= e.target.id
	classIconPlay();
 
}
//Funcion para cambiar el icono del reproductor
function classIconPlay(){
	var element = document.getElementById("iconPlay")
	element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
}
//Funcion para control del volumen
const volumen= document.getElementById("volumen")
volumen.oninput= (e) =>{
	const vol = e.target.value
	player.volume =vol
}
//Funcion para actualizar la barra de progreso del reproductor
const updateProgress = () =>{
	if (player.currentTime >0){
		const barra = document.getElementById('progress')
		barra.value = (player.currentTime / player.duration) * 100
		
		var duracionSegundos= player.duration.toFixed(0);
		dura=segundosToString(duracionSegundos);
		var actualSegundos = player.currentTime.toFixed(0)
		actual=segundosToString(actualSegundos);
		
		duracion= actual +' / '+ dura
		document.getElementById('timer').innerText=duracion 
	}
	if (player.ended){
		nextMusic();//Reproducir la siguiente pista
	} 
}
//funcion para volver hacia atras 10 segundos
function backTenSeconds(){
	var audio = document.getElementById("player");
	audio.currentTime -= 10;
	if(audio.currentTime > 10) {
		audio.currentTime -= 10;
	}
}
//Funcion para reproducir la proxima cancion
function nextMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (canciones.length == (musicaActual+1)){
		var siguiente = 0
	} else {
		var siguiente = musicaActual + 1
	}
	removeActive()
	var item=document.getElementById(siguiente)
	item.classList.add("active");
	loadMusic(canciones[siguiente]);
	player.play()
	indiceActual[0]= siguiente
	reproduccionActual("Reproduciendo: "+ canciones[siguiente])
	classIconPlay()
}
//Funcion para reproducir la cancion anterior
function prevMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (musicaActual==0){
		var anterior= canciones.length - 1
	} else {
		var anterior = musicaActual - 1
	}
	removeActive()
	var item=document.getElementById(anterior)
	item.classList.add("active");
	loadMusic(canciones[anterior]);
	player.play()
	indiceActual[0]= anterior
	reproduccionActual("Reproduciendo: "+ canciones[anterior])
	classIconPlay()
}
//Funcion para remover todas las clases css activas
function removeActive(){
	var elems = document.querySelectorAll(".active");
 	 [].forEach.call(elems, function(el) {
    	el.classList.remove("active");
 	 });
 	 return elems
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto){
	document.getElementById('currentPlay').innerText=texto
}
//Funcion para cargar las canciones en el reproductor
function loadMusic(ruta){
	var source = document.getElementById('source')
	var folder ="audio";//Carpeta donde tenemos almancenada la musica
	source.src= folder+"/"+ruta
	var index= indiceActual[0]= canciones.indexOf(ruta)
	removeActive()
	var item=document.getElementById(index)
	item.classList.add("active");
	reproduccionActual("Reproduciendo: "+ ruta)
	player.load()
}
//Funcion para pausar o darle play 
function togglePlay() {
	if (player.paused){
		toggleIcon();
		return player.play();
	} else {
		toggleIcon();
		return player.pause();
	}
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
   var element = document.getElementById("iconPlay");
   element.classList.toggle("fa-pause-circle");
   element.classList.toggle("fa-play-circle");
}
//Funcion para que al dar click sobre la barra de progeso se permita adelantar
progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	console.log(e);
}
//Conviertidor de segundos, recibe el parametro en segundos y devueve la conversion
const segundosToString =(segundos)=> {
	var hora="";
	//si los segundos son mayores de 3600 segundos es decir una hora 
	if (segundos>3600){
		//hacemos la conversion y redondeamos
		hora = Math.floor(segundos / 3600);
		//si las horas son menor de 10 le añadimos un 0, para que mejore visualmente 
		hora = (hora < 10)? '0' + hora : hora;
		hora+=":"
	}
	//hacemos el mismo proceso para los minuitos y los segundos
   var minuto = Math.floor((segundos / 60) % 60);
  minuto = (minuto < 10)? '0' + minuto : minuto;
  var second = segundos % 60;
  second = (second < 10)? '0' + second : second;
  return hora  + minuto + ':' + second;
}
loadMusic(canciones[0])