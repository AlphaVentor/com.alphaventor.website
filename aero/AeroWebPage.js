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

    /** @type {HTMLDivElement} */
    baseLayerNode;

    /** @type {HTMLDivElement} */
    topLayerNode;

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

        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("hidden");
        this.bodyNode.appendChild(this.wrapperNode);


        /* build */
        this.baseLayerNode = document.createElement("div");
        this.baseLayerNode.id = "base-layer";


        this.hide();

        let state = this.generateState();


        /* loading */
        const handler = new LoadHandler();

        /* load static resources as well */
        CSS_loadStylesheets(handler);

        /* initialize all (base) components */
        this.baseLayerNode.appendChild(this.header.initializeNodes(handler, state));
        this.elements.forEach(element => this.baseLayerNode.appendChild(element.initializeNodes(handler, state)));
        this.baseLayerNode.appendChild(this.footer.initializeNodes(handler, state));

        this.wrapperNode.appendChild(this.baseLayerNode);


        /* orientation */
        let _this = this;
        this.orientationObserver.addEventListener("change", function (event) {
            _this.render();
        }, false);


        this.topLayerNode = document.createElement("div");
        this.topLayerNode.id = "overlay";
        if (this.props.hasCookiesModalBox) {
            const modalBox = new ModalBox({
                image: "assets/icons/cookie.png",
                title: "0 cookies : Total privacy",
                explanation: "Zero cookie policy means that no tracking of any kind is used on this site."
            }, () => { 
                this.topLayerNode.removeChild(modalBox.getEnvelope());
                this.run();
            });
            this.topLayerNode.appendChild(modalBox.getEnvelope());

        }

        this.wrapperNode.appendChild(this.topLayerNode);




       

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

    run(){
        this.elements.forEach(element => { if(element.run){ element.run(); }});
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


