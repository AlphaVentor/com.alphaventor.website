



export const AeroUtilities = {


    /**
     * 
     * @param {*} target 
     * @param {*} pathname 
     * @param {*} onLoaded 
     */
    loadBackgroundImage : function(target, pathname, onLoaded) {

        const backgroundImageBuffer = new Image();
        
        const _this = this;
        backgroundImageBuffer.onload = function () {
            
            /* assign image from buffer */
            target.style.backgroundImage = `url(${backgroundImageBuffer.src})`;
    
            /* notify handler */
            if(onLoaded){ onLoaded(); }
        };
    
        /* trigger loading */
        backgroundImageBuffer.src = pathname;
    },


    getResourceFromOrigin : function(requestPath, responseType, responseCallback){
        this.sendRequest_HTTP_GET(window.location.origin + requestPath, responseType, responseCallback);
    },



    /**
     * 
     * @param {string} requestPath 
     * @param {string} responseType 
     * @param {Function} responseCallback 
     */
    sendRequest_HTTP_GET : function(requestPath, responseType, responseCallback) {

        /**
                * Relies on browser cache for speeding things up
                */
        let xhr = new XMLHttpRequest();

        // first line
        xhr.open("GET", requestPath, true);
        xhr.responseType = responseType;

        // headers
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'X-Requested-With');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Cookie, Content-Type, Authorization, Content-Length, X-Requested-With');
        xhr.setRequestHeader('Access-Control-Expose-Headers', 'Set-Cookie, X-Powered-By');


        let _this = this;
        // Hook the event that gets called as the request progresses
        xhr.onreadystatechange = function () {
            // If the request is "DONE" (completed or failed)
            if (xhr.readyState == 4) {
                // If we got HTTP status 200 (OK)
                if (xhr.status == 200) {
                    responseCallback(xhr.responseText);
                }
            }
        };

        // fire request
        xhr.send(null);
    }

}
