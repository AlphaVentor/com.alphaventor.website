import { AeroComponent } from "./AeroComponent.js";

import { AeroWebPage } from "./AeroWebPage.js";
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



export const LOW_RESOLUTION_TAG = "-low";
export const HIGH_RESOLUTION_TAG = "-high";

export class AeroMovie extends AeroComponent {

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


    initializeNodes(){
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-movie");

        return this.sectionNode;
    }

    render(state) {
        if (!this.isInitialized) {
            this.draw();
            this.isInitialized = true;
        }
        else if (this.isInitialized && state.imageResolution == 1) {
            this.redrawHighRes();
        }
    }

    draw() {
       

        /* <video> */
        this.videoNode = document.createElement("video");
        this.videoNode.classList.add("aero-movie-video");
        this.videoNode.setAttribute("muted", "");
        // this.videoNode.setAttribute("playsinline", "");
        this.videoNode.setAttribute("autoplay", "");
        //this.videoNode.setAttribute("loop", "");
        //this.videoNode.setAttribute("controls", "");
        // autoplay  

        const _this = this;
        this.sectionNode.addEventListener('mouseover', () => {
            console.log("Test");
            _this.videoNode.play();
        });

        this.sectionNode.appendChild(this.videoNode);

        this.sourceNode = document.createElement("source");
        this.sourceNode.src = "assets/sequences/sequence3.mp4";
        this.sourceNode.type = "video/mp4";
        this.videoNode.appendChild(this.sourceNode);


        /* </video> */
    }


    /**
     * 
     * @param {LoadHandler} handler 
     */
    load(handler) {
        
    }

   
}
