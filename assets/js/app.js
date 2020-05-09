

var url = window.location.href;
var swLocation = '/pruebasPWAEvidencias/sw.js';

if(navigator.serviceWorker){

    if(url.includes('localhost')){
        swLocation='/sw.js';
    }
    navigator.serviceWorker.register(swLocation);
}

var btnTomarFoto     = $('#tomar-foto-btn');
var btnPhoto         = $('#btnCamara');
var btnCancelarFoto = $('#cancelar-foto-btn');
var contenedorCamara = $('.camara-contenedor');


var lat  = null;
var lng  = null; 
var foto = null; 

// Init de la camara class
// document.getElementById('player');
const camara = new Camara( $('#player')[0] );

// Boton de la camara
// usamos la funcion de fleca para prevenir
// que jQuery me cambie el valor del this
btnPhoto.on('click', () => {

    console.log('Inicializar camara');
    contenedorCamara.addClass('displayBlock');

    camara.encender();

});

btnCancelarFoto.on('click', () => {

    console.log('Apagando camara');
    contenedorCamara.removeClass('displayBlock');
    contenedorCamara.addClass('displayNone');

    camara.apagar();

});


// Boton para tomar la foto
btnTomarFoto.on('click', () => {

    console.log('Botón tomar foto');

    foto = camara.tomarFoto();

    camara.apagar();
    
    // console.log(foto);

});
