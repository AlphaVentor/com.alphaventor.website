import { AeroDeck } from "./AeroDeck.js";
import { AeroFooter } from "./AeroFooter.js";
import { AeroHeader } from "./AeroHeader.js";
import { AeroMovie } from "./AeroMovie.js";
import { AeroSlide } from "./AeroSlide.js";
import { AeroWebPage } from "./AeroWebPage.js";


export const page = function (props) {
    return new AeroWebPage(props);
}

export const header = function (props) {
    return new AeroHeader(props);
}

export const slide = function (type, props) {
    return new AeroSlide(type, props);
}

export const movie = function (type, props) {
    return new AeroMovie(type, props);
}

export const deck = function (props) {
    return new AeroDeck(props);
}

export const footer = function (props) {
    return new AeroFooter(props);
}




/**
 * 
 */
export class LoadHandler {

    /**
     * @type{Set<string>}
     */
    resources;

    /**
     * @param{function}
     */
    onLoaded = null;

    index = 0;

    constructor() {
        this.resources = new Set();
    }

    generateId() {
        return `generated-${this.index++}`;
    }

    registerLoading(name) {
        this.resources.add(name);
    }

    notifyCompleted(name) {
        this.resources.delete(name);
        if (this.onLoaded != null && this.resources.size == 0) {
            this.onLoaded();
        }
    }

    listenCompleted(onLoaded) {
        if (this.resources.size == 0) {
            onLoaded();
        }
        else {
            this.onLoaded = onLoaded;
        }
    }
}




export const CSS_FILENAMES = [
    "aero/AeroDeck.css",
    "aero/AeroFooter.css",
    "aero/AeroMovie.css",
    "aero/AeroHeader.css",
    "aero/AeroSlide.css",
    "aero/AeroWebPage.css",
    "aero/ModalBox.css"
];


/**
 * 
 * @param {LoadHandler} handler 
 */
export function CSS_loadStylesheets(handler) {
    CSS_FILENAMES.forEach(filename => {
        handler.registerLoading(filename);

        /** @type{HTMLLinkElement} */
        const linkNode = document.createElement("link");

        linkNode.addEventListener("load", () => handler.notifyCompleted(filename));

        linkNode.type = "text/css";
        linkNode.rel = "stylesheet";
        linkNode.href = filename;
        document.head.appendChild(linkNode);
    });
}



/**
 * @param{HTMLDivElement} enveloppeNode
 */
export function clearChildNodes(enveloppeNode) {
    let child;
    while ((child = enveloppeNode.firstChild)) {
        enveloppeNode.removeChild(enveloppeNode.lastChild);
    }
}

