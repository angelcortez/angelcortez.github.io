// imports
//import 'js/sw-utils.js';

  
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    //'Home/Index',
    //'css/bootstrap.css',
    //'css/main',
    //'css/personalizadosGenerales.css',
    //'css/personalizadosHome.css',
    //'css/personalizadosLogin.css',
    //'css/site.css',
    //'img/iconoa.png',
    //'js/klorofil-common.js.js',
    //'js/showHidePassword.js',
    //'js/site.js',
    //'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    //'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700',
    //'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js',
    //'/lib/bootstrap/dist/js/bootstrap.bundle.min.js',
    //'/lib/jquery/dist/jquery.min.js',
    //'//fonts.googleapis.com/css?family=Open+Sans',
    //'/vendor/linearicons/style.css',
    //'/vendor/font-awesome/css/font-awesome.min.css'
];



self.addEventListener('install', e => {


    //const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
    //    cache.addAll(APP_SHELL));

    //const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
    //    cache.addAll(APP_SHELL_INMUTABLE));



    //e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});





self.addEventListener('fetch', e => {


    const respuesta = caches.match(e.request).then(res => {

        if (res) {

            actualizaCacheStatico(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
            return res;
        } else {

            return fetch(e.request).then(newRes => {

                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

            });

        }

    });



    e.respondWith(respuesta);

});

//sw-utils.js


// Guardar  en el cache dinamico
function actualizaCacheDinamico(dynamicCache, req, res) {


    if (res.ok) {

        return caches.open(dynamicCache).then(cache => {

            cache.put(req, res.clone());

            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function actualizaCacheStatico(staticCache, req, APP_SHELL_INMUTABLE) {


    if (APP_SHELL_INMUTABLE.includes(req.url)) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch(req)
            .then(res => {
                return actualizaCacheDinamico(staticCache, req, res);
            });
    }



}