


import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { ModalBox } from "./ModalBox.js";
import { Picture } from "./Picture.js";
import { Slide } from "./Slide.js";
import { SquareGrid } from "./SquareGrid.js";
import { TextBlock } from "./TextBlock.js";





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

    orientationListeners = new Array();

    css_isStylesheetsLoadingCompleted = false;


    areAllDependenciesLoaded = false;
    dependencies = new Array();


    constructor() {

        /* CSS requirements */
        //this.requireCSSStylesheet("/aero-engine-v3/AeroWebPage.css");
        //this.css_requireStylesheet("/aero-engine-v2/ModalBox.css");

        /* <structure> */
        const bodyNode = document.body;

        this.wrapperNode = document.querySelector("#aero-wrapper");

        this.topLayerNode = document.querySelector("#overlay");

        this.veilNode = document.querySelector("#aero-veil");
        this.veilNode.appendChild(this.createSpinner());
        
        this.hide();

        /* </structure> */


        /** populate structure */

        let val, hasBeenShown = (val = window.sessionStorage.getItem(COOKIES_KEY)) ? val : false;

        //hasBeenShown = false; // For DEBUG
        if (!hasBeenShown) {
            const modalBox = new ModalBox({
                image: "/icons/cookie.png",
                title: "Zero cookies : Total privacy",
                explanation: `Zero cookie policy means that no tracking of any kind is 
                used on this site. We never use the value of any cookie from our side. 
                Everything remains local on your side.`,
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
        this.orientationObserver.addEventListener("change", (event) => {
            this.isLandscape = this.orientationObserver.matches;
            this.orientationListeners.forEach(listener => listener(this.isLandscape));
        }, false);
    }

    addOrientationListener(listener) {
        this.orientationListeners.push(listener);
    }


    generateState() {
        /* compute new state */
        let state = {};
        state.
            state.imageResolution = this.imageResolution;
        return state;
    }


    appendDependency() {
        const index = this.dependencies.length;
        this.dependencies.push(false);
        return () => {
            this.dependencies[index] = true;

            /* check if all css stylesheets have been loaded */
            this.areAllDependenciesLoaded = true;
            this.dependencies.forEach(value => {
                if (!value && this.areAllDependenciesLoaded) { this.areAllDependenciesLoaded = false; }
            });

            this.update();
        }
    }



    hide() {
        this.wrapperNode.setAttribute("state", "closed");
        this.veilNode.setAttribute("state", "unrolled");
    }

    show() {
        this.wrapperNode.setAttribute("state", "open");
        this.veilNode.setAttribute("state", "rolled");
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


    update() {
        if (this.areAllDependenciesLoaded) {
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

        this.update();
    }



    /**
     * Trigger css loading if necessary
     * @param {} pathname 
     */
    requireCssStylesheet(pathname) {
        if (!this.css_stylesheetsMap.has(pathname)) {

            const onLoaded = this.appendDependency();

            /** @type{HTMLLinkElement} */
            const linkNode = document.createElement("link");
            linkNode.type = "text/css";
            linkNode.rel = "stylesheet";
            linkNode.href = pathname;
            linkNode.addEventListener("load", () => {
                this.css_stylesheetsMap.set(pathname, true);
                onLoaded();
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

AERO_WEB_PAGE.requireCssStylesheet("/aero-engine-v3/gradient-backgrounds.css");

const components = [Slide, Header, SquareGrid, TextBlock, Footer, ModalBox, Picture];
components.forEach(component => component.init0(AERO_WEB_PAGE));


AERO_WEB_PAGE.update();

/**
 * 
 * @param {*} props 
 */
export const boot = function () {
    //AERO_WEB_PAGE.start();
}
