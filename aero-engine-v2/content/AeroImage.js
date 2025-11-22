


export class AeroImage {


    constructor(pathname) {
        super();
        this.pathname = pathname;
    }

    /**
     *  
     */

    applyAsBackground(target) {

        const backgroundImageBuffer = new Image();

        const _this = this;
        backgroundImageBuffer.onload = function () {

            /* assign image from buffer */
            target.style.backgroundImage = `url(${backgroundImageBuffer.src})`;

            /* notify handler */
            if (onLoaded) { onLoaded(); }
        };

        /* trigger loading */
        backgroundImageBuffer.src = pathname;
    }

}