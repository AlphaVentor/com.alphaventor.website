
import { AeroUtilities } from "./AeroUtilities.js";
import { AERO_WEB_PAGE, AeroWebPage } from "./AeroWebPage.js";





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

export class T1Slide extends HTMLElement {


    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("t1-slide", T1Slide);
        page.requireCssStylesheet("/aero-engine-v3/T1Slide.css");
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

        /* CSS requirements */
        //AERO_WEB_PAGE.requireCSSStylesheet("/aero-engine-v3/Slide.css");
        //AERO_WEB_PAGE.requireCSSStylesheet("/aero-engine-v3/gradient-backgrounds.css");

      
        /* <id> */
        this.id = this.id;
        /* </id> */

        let val;

        /* <type> */
        this.type = (val = this.getAttribute("type")) ? val : "prime";
        this.setAttribute("type", this.type);
        /* </type> */

        /* <theme> */
        this.theme = (val = this.getAttribute("theme")) ? val : "light";
        this.setAttribute("theme", this.theme);
        /* </theme> */


        /* <arrangement> */
        this.arrangement = (val = this.getAttribute("arrangement")) ? val : "default";
        this.setAttribute("arrangement", this.arrangement);
        /* </arrangement> */


        /* <background> */
        if (this.hasAttribute("backgroundColor")) {
            this.style.backgroundColor = this.getAttribute("backgroundColor");
        }
        else if (val = this.getAttribute("backgroundGradient")) {
            this.classList.add("aero-background-gradient-" + val);
        }
        else if (val = this.getAttribute("backgroundImage")) {
            this.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this, val, AERO_WEB_PAGE.appendDependency());
        }
        /* </background> */

        /* <text> */
        let textNode = document.createElement("div");
        textNode.classList.add("t1-slide-text");

        let sourceNode = this.firstChild;
        const toBeRemovedNodes = new Array();
        while (sourceNode) {

            let type = sourceNode.nodeName.toLowerCase();
            switch (type) {
                case "h1": {
                    let h1Node = document.createElement("h1");
                    h1Node.innerHTML = sourceNode.innerHTML;
                    textNode.appendChild(h1Node);
                } break;

                case "h2": {
                    let h2Node = document.createElement("h2");
                    h2Node.innerHTML = sourceNode.innerHTML;
                    textNode.appendChild(h2Node);
                } break;

                case "p": {
                    let pNode = document.createElement("p");
                    pNode.innerHTML = sourceNode.innerHTML;
                    textNode.appendChild(pNode);
                } break;
            }
            toBeRemovedNodes.push(sourceNode);
            sourceNode = sourceNode.nextSibling; /* next source node */
        }
        

        this.appendChild(textNode);
        /* </text> */

        /* <metrics> */
        //if (sources.metrics != undefined) { this.drawMetrics(this.props.metrics); }
        /* <metrics> */


        /* <asset> */
        
        if (val = this.getAttribute("asset")) {
            let assetImagePath = val;
            let assetNode = document.createElement("div");
            assetNode.classList.add("t1-slide-picture");
            if (val = this.getAttribute("assetAspectRatio")) { assetNode.style.aspectRatio = val; }
            AeroUtilities.loadBackgroundImage(assetNode, assetImagePath, () => { });
            this.appendChild(assetNode);
        }
        /* </assset> */

        toBeRemovedNodes.forEach(node => this.removeChild(node));
    }
}
