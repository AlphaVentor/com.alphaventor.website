

import { AeroUtilities } from "./AeroUtilities.js";
import { AERO_WEB_PAGE } from "./AeroWebPage.js";
import { Icon } from "./Icon.js";





/*
    Turn this:
        {
        _type: "aero-slide-prime",
        theme: "dark",
        title: `The power of <b>tomorrow</b>`,
        subtitle: "Hi There",
        paragraph: `this is a very 
        long text indeed that spread on multiple lines`,
        background : {
            _type : "pic",
            source : "assets/truc0002.jpg"
        }
    },

    into this:

    <section class="aero-slide-prime aero-theme-dark background-black">
        <div class="text">
            <h1>Say Hello to <span class="emphasis">OCTOFAN</span></h1>
            <h2>The world's first H2-powered multirole heavy duty drone with
                switchable nacelles</h2>
        </div>
        <div class="asset"
            style="background-image: url('assets/aircrafts/freighter/render0x07-low.png');">
        </div>
    </section>
*/



export class SquareGrid extends HTMLElement {

    static TAG = "aero-square-grid";



    /**
     * @type{List<SquareGridCard>}
     */
    cards = new Array();

    /** @type {HTMLDivElement} */
    deckNode;


    /** @type{boolean} */
    hasBackgroundImage = false;

    /** @type{boolean} */
    isBackgroundImageLoaded = false;

    /** @type{string} */
    backgroundImagePath;


    /**
     * 
     */
    constructor() {
        super();

        /* CSS requirements */
        AERO_WEB_PAGE.requireCSSStylesheet("/aero-engine-v3/SquareGrid.css");

        /* build nodes */

        const toBeRemovedNodes = new Array();

        let val;

        this.type = (val = this.getAttribute("type")) ? val : "std";
        this.setAttribute("type", this.type);

        this.theme = (val = this.getAttribute("theme")) ? val : "light";
        this.setAttribute("theme", this.theme);

        /* <background> */
        if (val = this.getAttribute("backgroundImage")) {
            this.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this, val);
        }
        else if (val = this.getAttribute("backgroundColor")) {
            this.classList.add("background-color");
            this.style.backgroundColor = val;
        }
        /* </background> */

        /* <deck> */

        this.deckNode = document.createElement("div");
        this.deckNode.classList.add("square-grid-deck");

        let node = this.firstChild;
        while(node){
            let type = node.nodeName.toLowerCase();
            if(type == "aero-card"){
                this.cards.push(new SquareGridCard(node));
            }
            toBeRemovedNodes.push(node);
            node = node.nextSibling;
        }
        this.cards.forEach(card => this.deckNode.appendChild(card.html_getNode()));

        this.appendChild(this.deckNode);


        /* </deck> */
        toBeRemovedNodes.forEach(node => this.removeChild(node));
    }


}


export class SquareGridCard {

    /** @type {HTMLDivElement } */
    cardNode;

    type;


    /**
     * @type{List<SquareGridCardElement>}
     */
    elements = new Array();

    /** @type {HTMLDivElement} */
    assetNode;


    /** @type{boolean} */
    hasBackgroundImage = false;

    /** @type{boolean} */
    isBackgroundImageLoaded = false;

    /** @type{string} */
    backgroundImagePath;

    /**
     * 
     * @param {HTMLElement} sources 
     */
    constructor(sources) {
       
        this.cardNode = document.createElement("div");
        this.cardNode.classList.add("square-grid-card");

        let val;
        this.type = (val = sources.getAttribute("type")) ? val : "light";
        this.cardNode.setAttribute("type", this.type);

        this.theme = (val = sources.getAttribute("theme")) ? val : "light";
        this.cardNode.setAttribute("theme", this.theme);

        this.size = (val = sources.getAttribute("size")) ? val : "std";
        this.cardNode.setAttribute("size", this.size);
    

        /* <background> */
        if (val = sources.getAttribute("backgroundImage")) {
            this.cardNode.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this.cardNode, val);
        }
        else if (val = sources.getAttribute("backgroundColor")) {
            this.cardNode.classList.add("background-color");
            this.cardNode.style.backgroundColor = val;
        }
        /* </background> */

        /* <elements> */
        let node = sources.firstChild;
        while(node){
            let type = node.nodeName.toLowerCase();
            switch(type){

                case "hgroup" : { this.elements.push(new SquareGridCardGroup(node)); } break;
                case "h1" : { this.elements.push(new SquareGridCardH1(node)); } break;
                case "h2" : { this.elements.push(new SquareGridCardH2(node)); } break;
                case "p" : { this.elements.push(new SquareGridCardParagraph(node)); } break;
                case "a" : { this.elements.push(new SquareGridCardLink(node)); } break;
                case "li" : { this.elements.push(new SquareGridCardPoint(node)); } break;
                case "ul" : { this.elements.push(new SquareGridCardList(node)); } break;
            }
            node = node.nextSibling;
        }
        /* </elements> */
        
        this.elements.forEach(element => { this.cardNode.appendChild(element.html_getNode()); });
    }

    html_getNode(){
        return this.cardNode;
    }

}

export class SquareGridCardElement {
    constructor(sources) {
        this.isMobileHideable = sources.hasAttribute("isMobileHideable");
    }
}



export class SquareGridCardGroup extends SquareGridCardElement {

    constructor(sources) {
        super(sources);

        /* <group> */

        const groupNode = document.createElement("div");
        groupNode.classList.add("square-grid-card-group");
        groupNode.innerHTML = sources.innerHTML;

        /* </group> */
        this.groupNode = groupNode;
    }

    html_getNode(){ return this.groupNode; }
}



export class SquareGridCardH1 extends SquareGridCardElement {

    constructor(sources) {
        super(sources);
        const headerNode = document.createElement("h1");
        if (this.isMobileHideable) { headerNode.classList.add("square-grid-mobile-hideable"); }
        headerNode.innerHTML = sources.innerHTML;
        this.headerNode = headerNode;
    }

    html_getNode(){ return this.headerNode; }
}


export class SquareGridCardH2 extends SquareGridCardElement {

    constructor(sources) {
        super(sources);
        const headerNode = document.createElement("h2");
        if (this.isMobileHideable) { headerNode.classList.add("square-grid-mobile-hideable"); }
        headerNode.innerHTML = sources.innerHTML;
        this.headerNode = headerNode;
    }

    html_getNode(){ return this.headerNode; }
}



export class SquareGridCardParagraph extends SquareGridCardElement {

    constructor(sources) {
        super(sources);
        const pNode = document.createElement("p");
        if (this.isMobileHideable) { pNode.classList.add("square-grid-mobile-hideable"); }
       

         /* <elements> */
        let node = sources.firstChild, nextNode;
        while(node){
            nextNode = node.nextSibling;
            pNode.appendChild(node);
            node = nextNode;
        }
        /* </elements> */

        this.pNode = pNode;
    }

    html_getNode(){ return this.pNode; }
}



export class SquareGridCardPoint extends SquareGridCardElement {

    constructor(sources) {
        super(sources);
        this.iconPathname = sources.getAttribute("icon");
  
        const pointNode = document.createElement("div");
        pointNode.classList.add("square-grid-card-point");
        if (this.isMobileHideable) { pointNode.classList.add("square-grid-mobile-hideable"); }

        const linkIcon = new Icon(this.iconPathname, { width: 32, height: 32 });
        linkIcon.build();
        linkIcon.getEnvelope().classList.add("square-grid-card-point-icon");
        pointNode.appendChild(linkIcon.getEnvelope());

        const textNode = document.createElement("span");
        textNode.classList.add("square-grid-card-point-text");
        textNode.innerHTML = sources.innerHTML;
        pointNode.appendChild(textNode);

        this.linkNode = pointNode;
    }

    html_getNode(){ return this.linkNode; }
}

export class SquareGridCardLink extends SquareGridCardElement {

    /**
     * 
     * @param {HTMLElement} sources 
     */
    constructor(sources) {
        super(sources);

        this.iconPathname = sources.getAttribute("icon");
        this.url = sources.getAttribute("href");
    
        const linkNode = document.createElement("div");
        linkNode.classList.add("square-grid-card-link");
        if (this.isMobileHideable) { linkNode.classList.add("square-grid-mobile-hideable"); }

        
        const linkIcon = new Icon(this.iconPathname, { width: 24, height: 24 });
        linkIcon.build();
        linkIcon.getEnvelope().classList.add("square-grid-card-link-pic");
        linkNode.appendChild(linkIcon.getEnvelope());
        
        const spanNode = document.createElement("span");
        spanNode.classList.add("square-grid-card-link-text");
        spanNode.innerHTML = sources.innerHTML;
        linkNode.appendChild(spanNode);

        linkNode.addEventListener("click", () => {window.location = this.url; }, false);

        this.linkNode = linkNode;
    }

    html_getNode(){ return this.linkNode; }

}



export class SquareGridCardList extends SquareGridCardElement {

    constructor(sources) {
        super(sources);
        const listNode = document.createElement("ul");
        if (this.isMobileHideable) { listNode.classList.add("square-grid-mobile-hideable"); }
       

         /* <elements> */
         
        let node = sources.firstChild;
        while(node){
            let type = node.nodeName.toLowerCase();
            switch(type){
                case "li" : { 
                    const itemNode = document.createElement("li")
                    itemNode.innerHTML = node.innerHTML;
                    listNode.appendChild(itemNode);
                } break;
            }
            node = node.nextSibling;
        }
        /* </elements> */

        this.listNode = listNode;
    }

    html_getNode(){ return this.listNode; }
}