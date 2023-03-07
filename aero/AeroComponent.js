import { AeroWebPage } from "./AeroWebPage.js";


export class AeroComponent {


    /**
     * @type {AeroWebPage}
     */
    page;

    isInitialized = false;

    /**
     * @type {boolean} current landscape painting option
     */
    isLandscape = false;

    /**
   * @type {number} current screen width painting option
   */
    screenWidth = 1920;

    /**
   * @type {number} current screen height painting option
   */
    screenHeight = 1080;

    constructor() {
    }

    link(page) {
        this.page = page;
    }

    onOrientationChanged(isLandscape) {
        /* To be overridden */
        this.isLandscape = isLandscape;
    }

    onScreenResized(width, height) {
        /* To be overridden */
        this.screenWidth = width;
        this.screenHeight = height;
    }

    /**
     * 
     */
    clearEnveloppe() {
        let enveloppeNode = this.getEnveloppe();
        let child;
        while ((child = enveloppeNode.firstChild)) {
            enveloppeNode.removeChild(child);
        }
    }
}