
import { AeroUtilities } from "./AeroUtilities.js";
import { AERO_WEB_PAGE, AeroWebPage } from "./AeroWebPage.js";



export class TextBanner extends HTMLElement {


    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("text-banner", TextBanner);
        page.requireCssStylesheet("/aero-engine-v3/TextBanner.css");
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
        if (this.hasAttribute("backgroundImage")) {
            this.style.backgroundImage = this.getAttribute("backgroundImage");
        }

    }
}
