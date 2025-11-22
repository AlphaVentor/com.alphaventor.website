

export const ON_CSS_LOADED = 0x12;

export class AeroElement {


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


    static isCSSLoading = false;


   


    /** CSS is loaded */
    css_isLoaded = false;

    constructor() {
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



}