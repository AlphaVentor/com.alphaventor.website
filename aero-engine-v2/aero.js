
import { AeroElement } from "./AeroElement.js";

import { Deck } from "./Deck.js";
import { Footer } from "./Footer.js";
import { Grid, GridCard } from "./Grid.js";
import { AeroMovie } from "./AeroMovie.js";
import { Slide } from "./Slide.js";
import { WebPage } from "./WebPage.js";
import { SquareGrid, SquareGridCard, SquareGridCardGroup, SquareGridCardH1, SquareGridCardH2, SquareGridCardLink, SquareGridCardParagraph, SquareGridCardPoint } from "./SquareGrid.js";
import { CodeBlock } from "./CodeBlock.js";
import { TextBlock, TxBkHeader1, TxBkHeader2, TxBkParagraph, TxBkSVG } from "./TextBlock.js";
import { SpText } from "./SpText.js";


export const page = function (elements, props) {
    return new WebPage(elements, props);
}

export const slide = function (type, props) {
    return new Slide(type, props);
}

export const movie = function (type, props) {
    return new AeroMovie(type, props);
}

export const deck = function (props) {
    return new Deck(props);
}

export const grid = function (type, props) {
    return new Grid(type, props);
}

export const gridCard = function (type, props) {
    return new GridCard(type, props);
}



export const sqGrid = function (type, props) {
    return new SquareGrid(type, props);
}

export const sqGridCard = function (type, size, props) {
    return new SquareGridCard(type, size, props);
}

export const sqGridCardGroup = function (props) {
    return new SquareGridCardGroup(props);
}

export const sqGridCardH1 = function (props) {
    return new SquareGridCardH1(props);
}

export const sqGridCardH2 = function (props) {
    return new SquareGridCardH2(props);
}

export const sqGridCardParagraph = function (props) {
    return new SquareGridCardParagraph(props);
}


export const sqGridCardPoint = function (props) {
    return new SquareGridCardPoint(props);
}

export const sqGridCardLink = function (props) {
    return new SquareGridCardLink(props);
}


export const codeBlock = function (source) {
    return new CodeBlock(source);
}


export const textBlock = function (type, props) { return new TextBlock(type, props); }
export const txbkH1 = function (text, props) { return new TxBkHeader1(text, props); }
export const txbkH2 = function (text, props) { return new TxBkHeader2(text, props); }
export const txbkP = function (text, props) { return new TxBkParagraph(text, props); }
export const txbkSVG = function (pathname, props) { return new TxBkSVG(pathname, props); }


export const spText = function (contentPathname, props) { return new SpText(contentPathname, props); }


export const footer = function (contentPathname, props) {
    return new Footer(contentPathname, props);
}

export const footSocial = function (props) {
    return new FooterSocialLink(props);
}

export const footLegal = function (props) {
    return new FooterLegalLink(props);
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






/**
 * @param{HTMLDivElement} enveloppeNode
 */
export function clearChildNodes(enveloppeNode) {
    let child;
    while ((child = enveloppeNode.firstChild)) {
        enveloppeNode.removeChild(enveloppeNode.lastChild);
    }
}


