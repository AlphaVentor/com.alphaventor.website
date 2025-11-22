import { AeroElement } from "./AeroElement.js";
import { AeroUtilities } from "./AeroUtilities.js";
import { Icon } from "./Icon.js";
import { WebPage } from "./WebPage.js";





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



export const LOW_RESOLUTION_TAG = "-low";
export const HIGH_RESOLUTION_TAG = "-high";

export class TextBlock extends AeroElement {

    /** @type {HTMLElement } */
    sectionNode;

    type;

    props;

    /** @type{boolean} */
    hasBackgroundImage = false;

    /** @type{boolean} */
    isBackgroundImageLoaded = false;

    /** @type{string} */
    backgroundImagePath;

    /** @type{boolean} */
    hasAssetImage = false;

    /** @type{boolean} */
    isAssetImageLoaded = false;

    /** @type{string} */
    assetImagePath;

    /** @type {HTMLDivElement} */
    assetNode;

    constructor(type, props) {
        super();
        this.type = type;
        this.props = props;
    }

    /**
     * 
     * @param {WebPage} handler 
     * @returns {HTMLElement}
     */
    build(page) {

        /* CSS requirements */
        page.css_requireStylesheet("/aero/TextBlock.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("textblock");
        this.sectionNode.setAttribute("type", this.type);


        this.setType(this.type);
        this.setTheme(this.props.theme ? this.props.theme : "light");

        if (this.props.arrangement) { this.setArrangement(this.props.arrangement); }

        /* <id> */
        if (this.props.id != undefined) {
            this.sectionNode.id = this.props.id;
        }
        /* </id> */


        /* <background> */
        if (this.props.background != undefined || this.props.backgroundColor != undefined) {
            let backgroundParam = this.props.background;
            switch (backgroundParam) {
                case "black": this.sectionNode.classList.add("background-black"); break;
                case "white": this.sectionNode.classList.add("background-white"); break;
                case "grey64": this.sectionNode.classList.add("background-grey64"); break;
                case "grey128": this.sectionNode.classList.add("background-grey128"); break;
                case "grey192": this.sectionNode.classList.add("background-grey192"); break;
            }
        }
        else if (this.props.backgroundGradient != undefined) {
            this.sectionNode.classList.add("aero-background-gradient-" + this.props.backgroundGradient);
        }
        else if (this.props.backgroundImage != undefined) {
            let backgroundImagePath = this.props.backgroundImage;
            this.sectionNode.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this.sectionNode, backgroundImagePath, () => this.render(page));

        }
        /* </background> */


        /* <elements> */
        this.props.elements.forEach(element => this.sectionNode.appendChild(element.build(page)));
        /* </elements> */

        /* return wrapper node */
        return this.sectionNode;
    }


    setType(type) {
        this.sectionNode.setAttribute("type", type);
    }

    setTheme(theme) {
        this.sectionNode.setAttribute("theme", theme);
    }

    setArrangement(arrangement) {
        this.sectionNode.setAttribute("arrangement", arrangement);
    }


    /**
     * 
     * @param {WebPage} page 
     */
    render(page) {
        if (!this.isInitialized) {
            this.draw();
            this.isInitialized = true;
        }
        else if (this.isInitialized && page.imageResolution == 1) {
            this.redrawHighRes();
        }
    }

    draw() {

    }

}

export class TextBlockElement {

    constructor(props) {
        this.props = props ? props : {};
    }

}

export class TxBkHeader1 extends TextBlockElement {

    constructor(text, props) {
        super(props);
        this.text = text;
    }

    build(page) {
        const headerNode = document.createElement("h1");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
        headerNode.innerHTML = this.text;
        return this.headerNode = headerNode;
    }

}


export class TxBkHeader2 extends TextBlockElement {

    constructor(text, props) {
        super(props);
        this.text = text;
    }

    build(page) {
        const headerNode = document.createElement("h2");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
        headerNode.innerHTML = this.text;
        return this.headerNode = headerNode;
    }

}


export class TxBkParagraph extends TextBlockElement {

    constructor(text, props) {
        super(props);
        this.text = text;
    }

    build(page) {
        const headerNode = document.createElement("p");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
        headerNode.innerHTML = this.text;
        return this.headerNode = headerNode;
    }

}


export class TxBkSVG extends TextBlockElement {

    constructor(pathname, props) {
        super(props);
        this.pathname = pathname;
    }

    build(page) {
        const wrapperNode = document.createElement("div");
        wrapperNode.classList.add("textblock-pic-svg");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
       

        this.icon = new Icon(this.pathname, this.props); 
        wrapperNode.appendChild(this.icon.build());

        return this.wrapperNode = wrapperNode;
    }

}