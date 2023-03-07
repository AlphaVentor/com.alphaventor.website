


export class AeroWebPage {


    /**
 * @type {Map<string, *>}
 * // build stylesheets map
 */
    map_CSS_stylesheets = new Map();


    /** @type {HTMLBodyElement} */
    bodyNode;

    /** @type {HTMLDivElement} */
    wrapperNode;

    /** @type {Array<Object>} */
    elements;

    /** @type {MediaQueryList} */
    orientationObserver;


    /**
     * @type {number}
     * 0: load low resolution
     * 1: load high resolution
     */
    imageResolution = 0;


    constructor(elements) {
        this.elements = elements;
    }


    start(){
        this.build();
        this.show();
    }
    

    build() {
        this.orientationObserver = window.matchMedia("(orientation: landscape)");

        this.bodyNode = document.body;

        /* link all elements */
        this.import_CSS("aero/AeroWebPage.css");
        this.elements.forEach(element => element.link(this));

        /* render all elements */
        this.render();

        /* build */
        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("hidden");
        this.bodyNode.appendChild(this.wrapperNode);

        this.elements.forEach(element => this.wrapperNode.appendChild(element.getEnveloppe()));
       
        /* orientation */
        let _this = this;
        this.orientationObserver.addEventListener("change", function(event){
            _this.render();
        }, false);
    }


    show(){
        this.wrapperNode.classList.remove("hidden");
    }


    render() {

        /* compute new state */
        let state = {};
        state.isLandscape = this.orientationObserver.matches;
        state.imageResolution = this.imageResolution;

        this.elements.forEach(element => element.render(state));
    }


    notifyElementHasBeenLoaded() {
        if(this.areAllElementsLoaded() && this.imageResolution == 0){
            this.imageResolution = 1;
            this.render();
        }
    }

    /**
     * 
     * @returns {boolean} true if all elements have been loaded
     */
    areAllElementsLoaded(){
        let n = this.elements.length;
        for(let i=0; i<n; i++){
            if(!this.elements[i].isLoaded()){ return false; }
        }
        return true;
    }

    /**
     * 
     * @param {*} width 
     * @param {*} height 
     */
    onScreenResized(width, height) {
        this.elements.forEach(element => element.onScreenResized(width, height));
    }

    /**
     * 
     * @param {*} name 
     */
    import_CSS(name) {
        if (!this.map_CSS_stylesheets.has(name)) {
            document.head.innerHTML += `<link type="text/css" rel="stylesheet" href=${name}>`;
            this.map_CSS_stylesheets.set(name, true);
        }
    }

}




