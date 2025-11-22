import { AeroElement } from "./AeroElement.js";
import { WebPage } from "./WebPage.js";
import { LoadHandler } from "./aero.js";

import { AeroUtilities } from "./AeroUtilities.js";





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



export class Grid extends AeroElement {

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
        page.css_requireStylesheet("/aero-engine-v2/Grid.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-grid");

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
        this.deckNode.classList.add("aero-grid-deck");

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


export class GridCard extends AeroElement {

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

    constructor(type, props) {
        super();
        this.type = type;
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
        this.cardNode.classList.add("aero-grid-card");


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