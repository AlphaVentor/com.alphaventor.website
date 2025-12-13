
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



export class Picture extends HTMLElement {


    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("aero-picture", Picture);
        page.requireCssStylesheet("/aero-engine-v3/Picture.css");
        PictureAsset.init0();
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


        /* <vertical-height> */
        this.verticalHeight = (val = this.getAttribute("verticalHeight")) ? val : "40vh";
        this.style.height = this.verticalHeight;
        /* </vertical-height> */


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

    }
}


export class PictureAsset extends HTMLElement {
    /**
       * Static Initialization
       * @param {AeroWebPage} page 
       */
    static init0(page) {
        customElements.define("aero-picture-asset", PictureAsset);
    }

    constructor(){
        super();

        let val;

        /* <vertical-height> */
        this.aspectRatio = (val = this.getAttribute("aspectRatio")) ? val : "2/3";
        this.style.aspectRatio = this.aspectRatio;
        /* </vertical-height> */


        /* <background> */
        if (val = this.getAttribute("image")) {
            AeroUtilities.loadBackgroundImage(this, val, AERO_WEB_PAGE.appendDependency());
        }
        /* </background> */
    }


}