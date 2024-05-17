import { AeroComponent } from "./AeroComponent.js";
import { LoadHandler } from "./aero.js";





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



export class AeroGrid extends AeroComponent {

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

    initializeNodes(state){
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-grid");

        this.setType(this.type);
        this.setTheme(this.props.theme ? this.props.theme : "light");


        /* <background> */
        if (this.props.background != undefined) {
            let backgroundParam = this.props.background;
            if (backgroundParam.substring(0, 4) == "pic:") {

                /* extract backgroundImagePath */
                let n = backgroundParam.length;
                let backgroundImagePath = backgroundParam.substring(4, n);
                this.hasBackgroundImage = true;
                this.backgroundImagePath = backgroundImagePath;
                this.sectionNode.classList.add("background-pic");
                // load later on
            }
            else {
                switch (backgroundParam) {
                    case "black": this.sectionNode.classList.add("background-black"); break;
                    case "white": this.sectionNode.classList.add("background-white"); break;
                    case "grey64": this.sectionNode.classList.add("background-grey64"); break;
                    case "grey128": this.sectionNode.classList.add("background-grey128"); break;
                    case "grey192": this.sectionNode.classList.add("background-grey192"); break;
                }
            }
        }
        /* </background> */

        /* <deck> */

        this.deckNode = document.createElement("div");
        this.deckNode.classList.add("aero-grid-deck");

        this.props.cards.forEach(card => {
            this.deckNode.appendChild(card.initializeNodes(state));
        });

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


    /**
     * 
     * @param {LoadHandler} handler 
     */
    load(handler) {

        /* <background > */
        const _this = this;
        if (this.hasBackgroundImage) {
            const id = handler.generateId();

            let backgroundImageBuffer = new Image();
            handler.registerLoading(id);
            backgroundImageBuffer.onload = function () {
                _this.sectionNode.style.backgroundImage = `url(${backgroundImageBuffer.src})`;
                _this.isBackgroundImageLoaded = true;
                handler.notifyCompleted(id);
            };
            backgroundImageBuffer.src = this.backgroundImagePath; // trigger
        }
        /* </background > */

        /* load cards */
        this.props.cards.forEach(card => card.load(handler));
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


export class AeroGridCard extends AeroComponent {

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

     initializeNodes(state){
        this.cardNode = document.createElement("div");
        this.cardNode.classList.add("aero-grid-card");



        /* <background> */
        if (this.props.background != undefined) {
            let backgroundParam = this.props.background;
            if (backgroundParam.substring(0, 4) == "pic:") {

                /* extract backgroundImagePath */
                let n = backgroundParam.length;
                let backgroundImagePath = backgroundParam.substring(4, n);
                this.hasBackgroundImage = true;
                this.backgroundImagePath = backgroundImagePath;
                this.cardNode.classList.add("background-pic");
                // load later on
            }
            else {
                switch (backgroundParam) {
                    case "black": this.cardNode.classList.add("background-black"); break;
                    case "white": this.cardNode.classList.add("background-white"); break;
                    case "grey64": this.cardNode.classList.add("background-grey64"); break;
                    case "grey128": this.cardNode.classList.add("background-grey128"); break;
                    case "grey192": this.cardNode.classList.add("background-grey192"); break;
                }
            }
        }
        /* </background> */


        this.setType(this.type);
        this.setTheme(this.props.theme ? this.props.theme : "light");

        return this.cardNode;
    }



    /**
     * 
     * @param {LoadHandler} handler 
     */
    load(handler) {

        /* <background > */
        const _this = this;
        if (this.hasBackgroundImage) {
            const id = handler.generateId();

            let backgroundImageBuffer = new Image();
            handler.registerLoading(id);
            backgroundImageBuffer.onload = function () {
                _this.cardNode.style.backgroundImage = `url(${backgroundImageBuffer.src})`;
                _this.isBackgroundImageLoaded = true;
                handler.notifyCompleted(id);
            };
            backgroundImageBuffer.src = this.backgroundImagePath; // trigger
        }
        /* </background > */

    }

    setType(type) {
        this.cardNode.setAttribute("type", type);
    }

    setTheme(theme) {
        this.cardNode.setAttribute("theme", theme);
    }



}