//Variable para identificar si ingresa desde desktop o mobile
var userAgentMobile = /Android|iphone|ipod|ipad|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);

//Parametros: nombre cookie, valor cookie, dias para expirar cookie
function setCookie(cname, cvalue, exdays) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Parametros: nombre cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

//Permite agregar un evento
function agregarEvento(obj, evt, fn) {
    if(obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }else if(obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }else {
        obj["on" + evt] = fn;
    }
}

//Permite quitar un evento
function removerEvento(obj, evt, fn) {
    if(obj.removeEventListener) {
        obj.removeEventListener(evt, fn);
    }else if(obj.detachEvent) {
        obj.detachEvent("on" + evt, fn);
    }else {
        obj["on" + evt] = null;
    }
}

//Permite verificar si localstorage esta activo
function storageAvailable(type) {
    try {
        var storage = window[type], x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }catch(e) {
        return false;
    }
}

function onMouseOut(evt) {
    //console.log(evt.clientY);
    let showEip = getCookie('showEip');
    if(evt.clientY < 10 && !evt.toElement && !evt.relatedTarget 
        && evt.target.nodeName.toLowerCase() !== 'select' && !showEip) {
        $('#myModal').modal('show');
        removerEvento(document, "mouseout", onMouseOut);
        setCookie('showEip', true, 1);
    }
}

//document.addEventListener("DOMContentLoaded", function(e) {});
$(document).ready(function() {
    /** INICIO EXIT INTENT POPUP DESKTOP **/
    //Agregando evento a mouseout luego de 10 segundos
    setTimeout(function() {
        //console.log(userAgentMobile);
        if(!userAgentMobile) {
            agregarEvento(document, 'mouseout', onMouseOut);
        }
    }, 10000);
    /** FIN EXIT INTENT POPUP DESKTOP **/
    
    /** INICIO EXIT INTENT POPUP MOBILE **/
    if(userAgentMobile) {
        let showMobileEip = getCookie('showEip');
        let isMobile = window.localStorage.getItem('isMobile');
        if(!showMobileEip &&  isMobile == 'true' && isHome == 'true') {
            $('#myModal').modal('show');
            removerEvento(document, "mouseout", onMouseOut);
            window.localStorage.setItem('isMobile', 'false');
            window.localStorage.removeItem('isMobile');
            setCookie('showEip', true, 1);
        }
    }

    window.onpageshow = function(evt) {
        //console.log(evt.persisted);
        if(evt.persisted) {
            let userAgentIos = /iphone|ipod|ipad|webOS|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
            if(userAgentIos) {
                let showMobileEip = getCookie('showEip');
                let isMobile = window.localStorage.getItem('isMobile');
                if(!showMobileEip &&  isMobile == 'true' && isHome == 'true') {
                    $('#myModal').modal('show');
                    removerEvento(document, "mouseout", onMouseOut);
                    window.localStorage.setItem('isMobile', 'false');
                    window.localStorage.removeItem('isMobile');
                    setCookie('showEip', true, 1);
                }
            }
        }
    };
    /** FIN EXIT INTENT POPUP MOBILE **/
    
//    if(storageAvailable('localStorage')) {
//        console.log("localstorage activo");
//    }else {
//        console.log("localstorage no activo");
//    }
});
