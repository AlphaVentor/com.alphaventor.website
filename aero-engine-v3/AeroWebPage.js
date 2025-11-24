


import { Header } from "./Header.js";
import { Slide } from "./Slide.js";
import { SquareGrid } from "./SquareGrid.js";





const COOKIES_KEY = "has-cookies-already-been-displayed";


export class AeroWebPage {

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
    veilNode;

    /** @type {MediaQueryList} */
    orientationObserver;

    /**
     * @type {number}
     * 0: load low resolution
     * 1: load high resolution
     */
    imageResolution = 0;

    isLandscape = true;

    css_isStylesheetsLoadingCompleted = false;


    constructor() {

          /* CSS requirements */
        this.requireCSSStylesheet("/aero-engine-v3/AeroWebPage.css");
        //this.css_requireStylesheet("/aero-engine-v2/ModalBox.css");

        /* <structure> */
         const bodyNode = document.body;

        this.wrapperNode = document.querySelector("#aero-wrapper");
        
        const veilNode = document.createElement("div");
        veilNode.id = "aero-veil";
        veilNode.appendChild(this.createSpinner());
        bodyNode.appendChild(veilNode);
        this.veilNode = veilNode;

        /* </structure> */
    

        /** populate structure */

        let val, hasBeenShown = (val = window.sessionStorage.getItem(COOKIES_KEY)) ? val : false;
        
        if (!hasBeenShown) {
            const modalBox = new ModalBox({
                image: "/icons/cookie.png",
                title: "0 cookies : Total privacy",
                explanation: "Zero cookie policy means that no tracking of any kind is used on this site."
            }, () => {
                this.topLayerNode.removeChild(modalBox.getEnvelope());

                /* run */
                page.run();
            });
            this.topLayerNode.appendChild(modalBox.getEnvelope());

            window.sessionStorage.setItem(COOKIES_KEY, true);
        }

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
    }



    generateState() {
        /* compute new state */
        let state = {};
        state.
            state.imageResolution = this.imageResolution;
        return state;
    }



    hide() {
        this.wrapperNode.classList.add("hidden");
        this.veilNode.classList.remove("hidden");
    }

    show() {
        this.wrapperNode.classList.remove("hidden");
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
    requireCSSStylesheet(pathname) {
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

    
    
    createSpinner() {

        //const iconPathname = this.iconPathname;
    
        const node = document.createElement("div");
        node.className = "boot-loader";
        node.innerHTML = `
            <div class="boot-embedded-icon"></div>
            <div class="boot-spinner">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>`;
    
        return node;
    }


}



/**
 * the base page
 */
export const AERO_WEB_PAGE = new AeroWebPage();

// 2. Register the new tag name
customElements.define(Slide.TAG, Slide);
customElements.define(Header.TAG, Header);
customElements.define(SquareGrid.TAG, SquareGrid);

const TAGS = [];
TAGS.forEach(tag => customElements.whenDefined(Slide.TAG).then());

async function waitForAllWebComponents() {
  const tags = [
    Slide.TAG, 
    Header.TAG, 
    SquareGrid.TAG
  ];

  await Promise.allSettled(tags.map(tag => customElements.whenDefined(tag)));
}

// Use it
waitForAllWebComponents().then(() => {
  // Safe to run app init, enhance, etc.
});


/**
 * 
 * @param {*} props 
 */
export const boot = function(){
   AERO_WEB_PAGE.start();
}
