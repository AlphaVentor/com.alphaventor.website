import { AeroElement } from "./AeroElement.js";

import { WebPage } from "./WebPage.js";
import { LoadHandler } from "./aero.js";
import { createSpinner } from "./boot.js";




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

export class AeroMovie extends AeroElement {

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


    initializeNodes(handler, state) {
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-movie");
        this.sectionNode.setAttribute("loaded", "false");
        const spinnerNode = createSpinner();
        this.sectionNode.appendChild(spinnerNode);

        /* <video> */
        this.videoNode = document.createElement("video");
        this.videoNode.classList.add("aero-movie-video");
        this.videoNode.setAttribute("muted", "");
        // this.videoNode.setAttribute("playsinline", "");
        this.videoNode.setAttribute("autoplay", "");
        this.videoNode.setAttribute("loop", "");
        //this.videoNode.setAttribute("controls", "");
        // autoplay  

        this.videoNode.playbackRate = 1.0;


        const sourceNode = document.createElement("source");
        sourceNode.src = this.props.sequence;
        sourceNode.type = "video/mp4";
        
       
        const _this = this;
        this.videoNode.addEventListener('loadeddata', function() {
            _this.sectionNode.setAttribute("loaded", "true");
            _this.sectionNode.removeChild(spinnerNode);
        }, false);

        this.videoNode.appendChild(sourceNode);

        this.sectionNode.appendChild(this.videoNode);

        /* </video> */

        return this.sectionNode;
    }



    render() {
        if (!this.isInitialized) {
            this.draw();
            this.isInitialized = true;
        }
    }

    draw() {

    }


    run() {
        this.videoNode.play();
    }

    generateNextSourceNode() {
        if (this.sequenceIndex >= this.sequences.length) { this.sequenceIndex = 0; }
       
    }


}
