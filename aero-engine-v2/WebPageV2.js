import { AeroElement } from "./AeroElement.js";
import { FooterV2 } from "./FooterV2.js";
import { HeaderV2 } from "./HeaderV2.js";
import { ModalBox } from "./ModalBox.js";
import { SlideV2 } from "./SlideV2.js";
import { SquareGridV2 } from "./SquareGridV2.js";
import { TextBlockV2 } from "./TextBlockV2.js";
import { DocumentationV2 } from "./DocumentationV2.js";
import { Video } from "./Video.js";



/**
 * 
 * @param {*} props 
 */
export const boot = function(){
    const page = new WebPageV2();
    page.start();
}


/**
 * 
 * @param {*} prefix 
 * @param {HTMLElement} sourceNode
 */
export const buildPageElement = function (page, sourceNode) {
    const type = sourceNode.nodeName.toLowerCase();
    switch (type) {
        case "header": return new HeaderV2(page, sourceNode);
        case "slide": return new SlideV2(page, sourceNode);
        case "square-grid": return new SquareGridV2(page, sourceNode);
        case "text-block": return new TextBlockV2(page, sourceNode);
        case "video": return new Video(page, sourceNode);
        case "footer": return new FooterV2(page, sourceNode);
        case "aero-doc": return new DocumentationV2(page, sourceNode);
        default : return null;
    }
}


const COOKIES_KEY = "has-cookies-already-been-displayed";


export class WebPageV2 {

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

    /** @type {MediaQueryList} */
    orientationObserver;


    /** @type{Array<AeroElement>} */
    elements = new Array();

    /**
     * @type {number}
     * 0: load low resolution
     * 1: load high resolution
     */
    imageResolution = 0;

    isLandscape;

    css_isStylesheetsLoadingCompleted = false;


    constructor() {


        /* CSS requirements */
        this.css_requireStylesheet("/aero-engine-v2/WebPage.css");
        this.css_requireStylesheet("/aero-engine-v2/ModalBox.css");

        const sources = document.querySelector("#aero-page");
        let node = sources.firstChild;
        while (node) {
            
            const element = buildPageElement(this, node);

            /** add element */
            if(element !=null){ this.elements.push(element); }

            /* save next node */
            node = node.nextSibling;
        }
        document.body.removeChild(sources);
        console.log("WEBPAGE loaded!");
    }



    generateState() {
        /* compute new state */
        let state = {};
        state.
            state.imageResolution = this.imageResolution;
        return state;
    }


    start() {

        /* create structure */
        this.createStructure();

        /** populate structure */
        this.elements.forEach(element => this.baseLayerNode.appendChild(element.html_getNode()));

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
        this.elements.forEach(element => element.render(this));
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


    createStructure(){
     /* <structure> */
    
        const bodyNode = document.body;
    
    
        const wrapperNode = document.createElement("div");
    
        /* build */
        const baseLayerNode = document.createElement("div");
        baseLayerNode.classList.add("hidden");
        baseLayerNode.id = "base";
        wrapperNode.appendChild(baseLayerNode);
        this.baseLayerNode = baseLayerNode;
    
        const topLayerNode = document.createElement("div");
        topLayerNode.classList.add("hidden");
        topLayerNode.id = "overlay";
        wrapperNode.appendChild(topLayerNode);
        this.topLayerNode = topLayerNode;
    
        const veilNode = document.createElement("div");
        veilNode.id = "veil";
        wrapperNode.appendChild(veilNode);
        bodyNode.appendChild(wrapperNode);
        this.veilNode = veilNode;

        this.wrapperNode = wrapperNode;
    
        /* </structure> */
    
    
    
        veilNode.appendChild(this.createSpinner());
    
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


