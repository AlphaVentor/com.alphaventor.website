import { AeroElement } from "./AeroElement.js";
import { WebPage } from "./WebPage.js";
import { LoadHandler } from "./aero.js";

import { AeroUtilities } from "./AeroUtilities.js";
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



export class SquareGrid extends AeroElement {

    /** @type {HTMLElement } */
    sectionNode;

    type;

    props;

    /** @type {HTMLDivElement} */
    deckNode;


    /** @type{boolean} */
    hasBackgroundImage = false;

    /** @type{boolean} */
    isBackgroundImageLoaded = false;

    /** @type{string} */
    backgroundImagePath;

    constructor(type, props) {
        super();
        this.type = type;
        this.props = props;
    }


    /**
     * 
     * @param {WebPage} page 
     * @param {*} state 
     * @returns 
     */
    build(page) {

        /* CSS requirements */
        page.css_requireStylesheet("/aero/SquareGrid.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("square-grid-wrapper");

        this.setType(this.type);
        this.setTheme(this.props.theme ? this.props.theme : "light");


        /* <background> */
        if (this.props.backgroundImage) {
            this.sectionNode.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this.sectionNode, this.props.backgroundImage);
        }
        else if (this.props.backgroundColor) {
            this.sectionNode.classList.add("background-colo");
            this.sectionNode.style.backgroundColor = this.props.backgroundColor;
        }
        /* </background> */

        /* <deck> */

        this.deckNode = document.createElement("div");
        this.deckNode.classList.add("square-grid-deck");

        this.props.cards.forEach(card => this.deckNode.appendChild(card.build(page)));

        this.sectionNode.appendChild(this.deckNode);


        /* </deck> */

        return this.sectionNode;
    }


    setType(type) {
        this.sectionNode.setAttribute("type", type);
    }

    setTheme(theme) {
        this.sectionNode.setAttribute("theme", theme);
    }


    render(state) {
        if (!this.isInitialized) {
            this.draw();
            this.isInitialized = true;
        }
    }

    draw() {

    }

}


export class SquareGridCard extends AeroElement {

    /** @type {HTMLDivElement } */
    cardNode;

    type;

    props;

    /** @type {HTMLDivElement} */
    assetNode;


    /** @type{boolean} */
    hasBackgroundImage = false;

    /** @type{boolean} */
    isBackgroundImageLoaded = false;

    /** @type{string} */
    backgroundImagePath;

    constructor(type, size, props) {
        super();
        this.type = type;
        this.size = size;
        this.props = props;
    }

    /**
     * 
     * @param {LoadHandler} handler 
     * @param {*} state 
     * @returns 
     */
    build(page) {
        this.cardNode = document.createElement("div");
        this.cardNode.classList.add("square-grid-card");
        this.cardNode.setAttribute("size", this.size);

        /* <background> */
        if (this.props.backgroundImage) {
            this.cardNode.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this.cardNode, this.props.backgroundImage);
        }
        else if (this.props.backgroundColor) {
            this.cardNode.classList.add("background-color");
            this.cardNode.style.backgroundColor = this.props.backgroundColor;
        }
        /* </background> */



        /* <elements> */
        if (this.props.elements) {
            this.props.elements.forEach(element => {
                this.cardNode.appendChild(element.build(page));
            });
        }
        /* </elements> */


        this.setType(this.type);
        this.setTheme(this.props.theme ? this.props.theme : "light");

        return this.cardNode;
    }


    setType(type) {
        this.cardNode.setAttribute("type", type);
    }

    setTheme(theme) {
        this.cardNode.setAttribute("theme", theme);
    }
}

export class SquareGridCardElement {
    constructor(props) {
        this.props = props;

        this.isMobileHideable = props.isMobileHideable ? props.isMobileHideable : false;
    }
}





export class SquareGridCardGroup extends SquareGridCardElement {

    constructor(props) {
        super(props);
    }

    build(page) {
        /* <group> */

        const groupNode = document.createElement("div");
        groupNode.classList.add("square-grid-card-group");
        groupNode.innerHTML = this.props.txt;

        /* </group> */
        return this.groupNode = groupNode;
    }
}



export class SquareGridCardH1 extends SquareGridCardElement {

    constructor(props) {
        super(props);
        this.txt = props.txt;
    }

    build(page) {
        const headerNode = document.createElement("h1");
        if (this.isMobileHideable) { headerNode.classList.add("square-grid-mobile-hideable"); }
        headerNode.innerHTML = this.txt;
        return this.headerNode = headerNode;
    }
}


export class SquareGridCardH2 extends SquareGridCardElement {

    constructor(props) {
        super(props);
        this.txt = props.txt;
    }

    build(page) {
        const headerNode = document.createElement("h2");
        if (this.isMobileHideable) { headerNode.classList.add("square-grid-mobile-hideable"); }
        headerNode.innerHTML = this.txt;
        return this.headerNode = headerNode;
    }
}



export class SquareGridCardParagraph extends SquareGridCardElement {

    constructor(props) {
        super(props);

        this.txt = props.txt;
    }

    /**
     * 
     * @param {WebPage} page 
     */
    build(page) {
        const pNode = document.createElement("p");
        if (this.isMobileHideable) { pNode.classList.add("square-grid-mobile-hideable"); }
        pNode.innerHTML = this.txt;
        return this.pNode = pNode;
    }
}



export class SquareGridCardPoint extends SquareGridCardElement {

    constructor(props) {
        super(props);

        this.iconPathname = props.icon;
        this.text = props.text;
    }

    /**
     * 
     * @param {WebPage} page 
     */
    build(page) {
        const pointNode = document.createElement("div");
        pointNode.classList.add("square-grid-card-point");
        if (this.isMobileHideable) { pointNode.classList.add("square-grid-mobile-hideable"); }

        const linkIcon = new Icon(this.iconPathname, { width: 32, height: 32 });
        linkIcon.build();
        linkIcon.getEnvelope().classList.add("square-grid-card-point-icon");
        pointNode.appendChild(linkIcon.getEnvelope());

        const textNode = document.createElement("span");
        textNode.classList.add("square-grid-card-point-text");
        textNode.innerHTML = this.text;
        pointNode.appendChild(textNode);

        this.linkNode = pointNode;

        return this.linkNode;
    }
}

export class SquareGridCardLink extends SquareGridCardElement {

    constructor(props) {
        super(props);

        this.iconPathname = props.icon;
        this.text = props.text;
        this.url = props.url;
    }

    /**
     * 
     * @param {WebPage} page 
     */
    build(page) {
        const linkNode = document.createElement("div");
        linkNode.classList.add("square-grid-card-link");
        if (this.isMobileHideable) { linkNode.classList.add("square-grid-mobile-hideable"); }

        const linkIcon = new Icon(this.iconPathname, { width: 24, height: 24 });
        linkIcon.build();
        linkIcon.getEnvelope().classList.add("square-grid-card-link-pic");
        linkNode.appendChild(linkIcon.getEnvelope());

        const spanNode = document.createElement("span");
        spanNode.classList.add("square-grid-card-link-text");
        spanNode.innerHTML = this.text;
        linkNode.appendChild(spanNode);

        linkNode.addEventListener("click", () => {window.location = this.url; }, false);

        this.linkNode = linkNode;

        return this.linkNode;
    }


}