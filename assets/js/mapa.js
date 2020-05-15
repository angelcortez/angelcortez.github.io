
window.onload = function() {
   this.mostrarMapa();

   this.navigator.geolocation.getCurrentPosition(pos=>{
       this.mostrarMapa(pos.coords.latitude,pos.coords.longitude);
   })
};

// Referencias de jQuery
var googleMapKey = 'AIzaSyA5mjCwx1TRLuBAjwQw84WE6h5ErSe7Uj8';

// Google Maps llaves alternativas - desarrollo
// AIzaSyDyJPPlnIMOLp20Ef1LlTong8rYdTnaTXM
// AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ
// AIzaSyA5mjCwx1TRLuBAjwQw84WE6h5ErSe7Uj8
// AIzaSyCroCERuudf2z02rCrVa6DTkeeneQuq8TA
// AIzaSyBkDYSVRVtQ6P2mf2Xrq0VBjps8GEcWsLU
// AIzaSyAu2rb0mobiznVJnJd6bVb5Bn2WsuXP2QI
// AIzaSyAZ7zantyAHnuNFtheMlJY1VvkRBEjvw9Y
// AIzaSyDSPDpkFznGgzzBSsYvTq_sj0T0QCHRgwM
// AIzaSyD4YFaT5DvwhhhqMpDP2pBInoG8BTzA9JY
// AIzaSyAbPC1F9pWeD70Ny8PHcjguPffSLhT-YF8

var divMapa       = $('.backgroundInferior');


// Crear mapa en el modal
function mostrarMapa(lat, lng) {
    console.log(lat, lng);
    $('#divContenedorMapa').remove();
    $('.containerBtnLocation').remove();
    
    var content = `
            <div id="divContenedorMapa">
                <iframe
                    width="100%"
                    height="100%"
                    frameborder="0"
                    src="https://www.google.com/maps/embed/v1/view?key=${ googleMapKey }&center=${ lat },${ lng }&zoom=15" allowfullscreen>
                    </iframe>
            </div>
            <div class="containerBtnLocation">
            <a href="" id="btnGetLocation">Seleccionar ubicación</a>
            </div>
    `;

    divMapa.append( content );
}


