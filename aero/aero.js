import { AeroDeck } from "./AeroDeck.js";
import { AeroFooter } from "./AeroFooter.js";
import { AeroGrid, AeroGridCard } from "./AeroGrid.js";
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

export const grid = function (type, props) {
    return new AeroGrid(type, props);
}

export const gridCard = function (type, props) {
    return new AeroGridCard(type, props);
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

    loadBackgroundImage(target, pathname){

        /* generate an id for this loading operation */
        const id = this.generateId();
        
        /* register it */
        this.registerLoading(id);

        const backgroundImageBuffer = new Image();
        
        const _this = this;
        backgroundImageBuffer.onload = function () {
            
            /* assign image from buffer */
            target.style.backgroundImage = `url(${backgroundImageBuffer.src})`;

            /* notify handler */
            _this.notifyCompleted(id);
        };

        /* trigger loading */
        backgroundImageBuffer.src = pathname;
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
    "aero/AeroGrid.css",
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


