import { AeroHeader } from "./AeroHeader.js";
import { AeroFooter } from "./AeroFooter.js";
import { CSS_loadStylesheets, LoadHandler } from "./aero.js";
import { ModalBox } from "./ModalBox.js";


export class AeroWebPage {


    props;

    /**
 * @type {Map<string, *>}
 * // build stylesheets map
 */
    map_CSS_stylesheets = new Map();


    /** @type {HTMLBodyElement} */
    bodyNode;

    /** @type {HTMLDivElement} */
    wrapperNode;

    /** @type{AeroHeader} */
    header;

    /** @type {Array<Object>} */
    elements;

    /** @type{AeroFooter} */
    footer;

    /** @type {MediaQueryList} */
    orientationObserver;


    /**
     * @type {number}
     * 0: load low resolution
     * 1: load high resolution
     */
    imageResolution = 0;


    constructor(props) {
        this.props = props;

        this.header = props.header;
        this.elements = props.elements;
        this.footer = props.footer;

        this.orientationObserver = window.matchMedia("(orientation: landscape)");
        this.imageResolution = 0;

    }



    generateState() {
        /* compute new state */
        let state = {};
        state.isLandscape = this.orientationObserver.matches;
        state.imageResolution = this.imageResolution;
        return state;
    }


    start() {

        this.bodyNode = document.body;


        /* build */
        this.wrapperNode = document.createElement("div");
        this.wrapperNode.id = "base-layer";

        this.bodyNode.appendChild(this.wrapperNode);

        this.hide();

        let state = this.generateState();

        this.wrapperNode.appendChild(this.header.initializeNodes(state));
        this.elements.forEach(element => this.wrapperNode.appendChild(element.initializeNodes(state)));
        this.wrapperNode.appendChild(this.footer.initializeNodes(state));

        /* orientation */
        let _this = this;
        this.orientationObserver.addEventListener("change", function (event) {
            _this.render();
        }, false);


        this.topLayer = document.createElement("div");
        this.topLayer.id = "overlay";
        if (this.props.hasCookiesModalBox) {
            const modalBox = new ModalBox({
                image: "assets/icons/cookie.png",
                title: "0 cookies : Total privacy",
                explanation: "0 cookie means that no tracking of any kinf is used on this site."
            }, () => { 
                this.topLayer.removeChild(modalBox.getEnvelope());
            });
            this.topLayer.appendChild(modalBox.getEnvelope());
        }

        this.bodyNode.appendChild(this.topLayer);



        /* loading */
        const handler = new LoadHandler();

        /* load static resources as well */
        CSS_loadStylesheets(handler);

        /* load all components */
        this.header.load(handler);
        this.elements.forEach(element => element.load(handler));
        this.footer.load(handler);

        /* once completed, render and show */
        handler.listenCompleted(() => {
            this.render();
            this.show();
        });
    }


    hide() {
        this.wrapperNode.classList.add("hidden");
    }

    show() {
        this.wrapperNode.classList.remove("hidden");
    }


    render() {
        let state = this.generateState();
        this.header.render(state);
        this.elements.forEach(element => element.render(state));
        this.footer.render(state);
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

}


