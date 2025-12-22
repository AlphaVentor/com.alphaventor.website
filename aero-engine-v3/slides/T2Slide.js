
import { Icon } from "../Icon.js";
import { AeroUtilities } from "/aero-engine-v3/AeroUtilities.js";
import { AERO_WEB_PAGE, AeroWebPage } from "/aero-engine-v3/AeroWebPage.js";





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


export class T2Slide extends HTMLElement {


    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("t2-slide", T2Slide);
        customElements.define("t2-slide-box", T2SlideBox);
        customElements.define("t2-slide-button", T2SlideButton);
        page.requireCssStylesheet("/aero-engine-v3/slides/T2Slide.css");
    }

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


    /**
     * 
     */
    constructor() {
        super(); /* base HTML element */


        let val;

        /* <type> */
        this.type = (val = this.getAttribute("type")) ? val : "prime";
        this.setAttribute("type", this.type);
        /* </type> */

        /* <theme> */
        this.theme = (val = this.getAttribute("theme")) ? val : "light";
        this.setAttribute("theme", this.theme);
        /* </theme> */

        /* <height> */
        if (this.hasAttribute("height")) {
            this.height = this.getAttribute("height");
            this.style.height = this.height;
        }
        /* </height> */

        /* <arrangement> */
        this.arrangement = (val = this.getAttribute("arrangement")) ? val : "default";
        this.setAttribute("arrangement", this.arrangement);
        /* </arrangement> */


        /* <background> */
        if (val = this.getAttribute("backgroundImage")) {
            this.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this, val, AERO_WEB_PAGE.appendDependency());
        }
        /* </background> */


        /*
        const toBeRemovedNodes = new Array();
        let node = this.firstChild;
        while (node) {
            let type = node.nodeName.toLowerCase();
            switch (type) {
                case "box": { boxNode.appendChild(node); } break;
                case "call": { boxNode.appendChild(node); } break;
            }
            toBeRemovedNodes.push(node);
            node = node.nextSibling;
        }
        this.appendChild(boxNode);
        toBeRemovedNodes.forEach(node => this.removeChild(node));
        */
    }
}


class T2SlideBox extends HTMLElement {

    /**
     * 
     */
    constructor() {
        super(); /* base HTML element */

        /* <column-start> */
        let val;
        this.columnStart = (val = this.getAttribute("column-start")) ? val : 1;
        this.columnSpan = (val = this.getAttribute("column-span")) ? val : 1;
        this.rowStart = (val = this.getAttribute("row-start")) ? val : 1;
        this.rowSpan = (val = this.getAttribute("row-span")) ? val : 1;
        /* </column-start> */

        this.style = `
            grid-row: ${this.rowStart} / span ${this.rowSpan}; 
            grid-column: ${this.columnStart} / span ${this.columnSpan};
        `;
    }


}


class T2SlideButton extends HTMLElement {

    /**
     * 
     */
    constructor() {
        super(); /* base HTML element */

        /* <column-start> */
        let val;
        this.rowStart = (val = this.getAttribute("row")) ? val : 1;
        this.columnStart = (val = this.getAttribute("column")) ? val : 1;
        /* </column-start> */

        this.style = `
            grid-row: ${this.rowStart} / span 1; 
            grid-column: ${this.columnStart} / span 1;
        `;

        this.iconPathname = this.getAttribute("icon");
        this.url = this.getAttribute("href");
            
        const textNode = document.createElement("div");
        textNode.classList.add("t2-slide-button-text");
        textNode.innerHTML = this.textContent;
        this.textContent = '';
        this.appendChild(textNode);
                
        const linkIcon = new Icon(this.iconPathname, { width: 64, height: 64 });
        linkIcon.build();
        linkIcon.getEnvelope().classList.add("t2-slide-button-icon");
        this.appendChild(linkIcon.getEnvelope());
                
       
        this.addEventListener("click", () => {window.location = this.url; }, false);
        
    }


}
