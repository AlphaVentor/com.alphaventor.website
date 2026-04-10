
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



export class LogoBanner extends HTMLElement {


    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("logo-banner", LogoBanner);
        page.requireCssStylesheet("/aero-engine-v3/banners/LogoBanner.css");
    }

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
        this.arrangement = (val = this.getAttribute("arrangement")) ? val : "text-up";
        this.setAttribute("arrangement", this.arrangement);
        /* </arrangement> */


        /* <background-color> */
        if (this.hasAttribute("backgroundColor")) {
            this.style.backgroundColor = this.getAttribute("backgroundColor");
        }
        /* </background-color> */
        
        this.asset = this.getAttribute("asset");


        const wrapperNode = document.createElement("div");
        wrapperNode.classList.add("logo-banner-wrapper");
        wrapperNode.appendChild(AeroUtilities.createImageNode(this.asset, AERO_WEB_PAGE.appendDependency()));
        this.appendChild(wrapperNode);
    }
}
