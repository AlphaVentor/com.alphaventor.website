import { AeroElement } from "./AeroElement.js";

export class WebPage {


    props;

    /**
 * @type {Map<string, boolean>}
 * // build stylesheets map
 */
    css_stylesheetsMap = new Map();


    /** @type {HTMLBodyElement} */
    bodyNode;

    /** @type {HTMLDivElement} */
    wrapperNode;

    /** @type {HTMLDivElement} */
    baseLayerNode;

    /** @type {HTMLDivElement} */
    topLayerNode;

    /** @type {HTMLDivElement} */
    veilNode;


    /** @type {Array<AeroElement>} */
    elements;


    /** @type {MediaQueryList} */
    orientationObserver;


    /**
     * @type {number}
     * 0: load low resolution
     * 1: load high resolution
     */
    imageResolution = 0;

    isLandscape;

    css_isStylesheetsLoadingCompleted = false;


    constructor(elements, props) {
        this.elements = elements;
        this.props = props;

        
        /* CSS requirements */
        this.css_requireStylesheet("/aero-engine-v2/WebPage.css");
        this.css_requireStylesheet("/aero-engine-v2/ModalBox.css");
    }



    generateState() {
        /* compute new state */
        let state = {};
        state.
            state.imageResolution = this.imageResolution;
        return state;
    }


    start() {


        /* build */
        this.baseLayerNode = document.querySelector("#base");

        /* retrieve page info */
        this.orientationObserver = window.matchMedia("(orientation: landscape)");
        this.isLandscape = this.orientationObserver.matches;
        this.imageResolution = 0;



        /* orientation */
        const page = this;
        this.orientationObserver.addEventListener("change", function (event) {
            page.isLandscape = page.orientationObserver.matches;
            page.render();
        }, false);


        /* initialize all (base) components */
        this.elements.forEach(element => this.baseLayerNode.appendChild(element.build(this)));

        this.topLayerNode = document.querySelector("#overlay");

        this.veilNode = document.querySelector("#veil");
    }


    hide() {
        this.baseLayerNode.classList.add("hidden");
        this.topLayerNode.classList.add("hidden");
        this.veilNode.classList.remove("hidden");
    }

    show() {
        this.baseLayerNode.classList.remove("hidden");
        this.topLayerNode.classList.remove("hidden");
        this.veilNode.classList.add("hidden");
    }

    render() {
        //this.elements.forEach(element => element.render(this));
    }

    run() {
        this.elements.forEach(element => { if (element.run) { element.run(); } });
    }

    notifyElementHasBeenLoaded() {
        if (this.areAllElementsLoaded() && this.imageResolution == 0) {
            this.imageResolution = 1;
            this.render();
        }
    }

    /**
     * 
     * @param {*} width 
     * @param {*} height 
     */
    onScreenResized(width, height) {
        this.elements.forEach(element => element.onScreenResized(width, height));
    }


    onUpdate() {
        if (this.css_isStylesheetsLoadingCompleted) {
            this.render();
            this.show();
        }
    }

    css_onStyleSheetLoaded() {

        /* check if all css stylesheets have been loaded */
        this.css_isStylesheetsLoadingCompleted = true;
        this.css_stylesheetsMap.forEach(value => {
            if (!value) { this.css_isStylesheetsLoadingCompleted = false; }
        });

        this.onUpdate();
    }



    /**
     * Trigger css loading if necessary
     * @param {} pathname 
     */
    css_requireStylesheet(pathname) {
        if (!this.css_stylesheetsMap.has(pathname)) {
            this.css_stylesheetsMap.set(pathname, false);

            /** @type{HTMLLinkElement} */
            const linkNode = document.createElement("link");
            linkNode.type = "text/css";
            linkNode.rel = "stylesheet";
            linkNode.href = pathname;
            linkNode.addEventListener("load", () => {
                this.css_stylesheetsMap.set(pathname, true);
                this.css_onStyleSheetLoaded();
            });

            /* append and trigger */
            document.head.appendChild(linkNode);
        }
    }

}


