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




export class SpText extends AeroElement {

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

    constructor(contentPathname, props) {
        super();
        this.contentPathname = contentPathname;
        this.props = props;
    }

    /**
     * 
     * @param {WebPage} handler 
     * @returns {HTMLElement}
     */
    build(page) {

        /* CSS requirements */
        page.css_requireStylesheet("/aero/SpText.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("sptext");
        this.sectionNode.setAttribute("type", this.type);


        this.setTheme(this.props.theme ? this.props.theme : "light");
        if (this.props.arrangement) { this.setArrangement(this.props.arrangement); }

        /* <id> */
        if (this.props.id != undefined) {
            this.sectionNode.id = this.props.id;
        }
        /* </id> */


        /* <background> */
        if (this.props.backgroundColor != undefined) {
            this.sectionNode.style.backgroundColor = this.props.backgroundColor;
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
        AeroUtilities.sendRequest_HTTP_GET(this.contentPathname, "text", content => {
            this.sectionNode.innerHTML = content;
          });
        /* </elements> */

        /* return wrapper node */
        return this.sectionNode;
    }


    setTheme(theme) {
        this.sectionNode.setAttribute("theme", theme);
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
