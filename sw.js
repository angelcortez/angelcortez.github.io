//Imports

importScripts('assets/js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    // '/',
    'index.html',
    'assets/pages/home.html',
    'assets/img/btnIconCamera.png',
    'assets/img/btnIconLocation.png',
    'assets/img/btnIconOperaciones.png',
    'assets/img/btnIconProfile.png',
    'assets/img/iconoa.png',
    'assets/img/login.png',
    'assets/img/logo_home_blanco.png',
    'assets/js/app.js',
    'assets/js/camera-class.js',
    'assets/js/sw-utils.js',
    'assets/js/showHidePassword.js',
    'assets/css/personalizadosHome.css',
    'assets/css/personalizadosGenerales.css'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700',
    'assets/js/libs/jquery.js',
    'assets/css/bootstrap.min.css',
    'assets/vendor/font-awesome/css/font-awesome.min.css',
    'assets/vendor/linearicons/style.css',
    'assets/css/main.css',
    '//fonts.googleapis.com/css?family=Open+Sans',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
];

self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});


self.addEventListener( 'fetch', e => {

    let respuesta;

    if ( e.request.url.includes('/api') ) {

        // return respuesta????
        respuesta = manejoApiMensajes( DYNAMIC_CACHE, e.request );

    } else {

        respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                
                actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE );
                return res;
                
            } else {
    
                return fetch( e.request ).then( newRes => {
    
                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
    
                });
    
            }
    
        });

    }

    e.respondWith( respuesta );

});