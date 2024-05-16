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


    sequences = [
        "assets/sequences/alpha-movie0.mp4",
        "assets/sequences/sequence3.mp4",
        "assets/sequences/sequence0.mp4",
        "assets/sequences/sequence1.mp4",
        "assets/sequences/sequence2.mp4"
    ];

    sequenceIndex = 0;

    sourceNode;

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

        this.videoNode.playbackRate = 1.0;

        const _this = this;
        this.sectionNode.addEventListener('mouseover', () => {
            console.log("Test");
            _this.videoNode.play();
        });

        this.sectionNode.appendChild(this.videoNode);

        this.sourceNode = this.generateNextSourceNode();
        this.videoNode.appendChild(this.sourceNode);
        /* </video> */
    }


    run(){
        this.videoNode.play();
        let nextSourceNode = this.generateNextSourceNode();

        this.videoNode.addEventListener('ended', () => {
            this.videoNode.removeChild(this.sourceNode);
            this.videoNode.appendChild(this.sourceNode = nextSourceNode);
            this.videoNode.load();
            this.videoNode.play();

            nextSourceNode = this.generateNextSourceNode();
        });
    }

    generateNextSourceNode(){
        if(this.sequenceIndex >= this.sequences.length){ this.sequenceIndex = 0; }
        const sourceNode = document.createElement("source");
        sourceNode.src = this.sequences[this.sequenceIndex++];
        sourceNode.type = "video/mp4";
        return sourceNode;
    }


    /**
     * 
     * @param {LoadHandler} handler 
     */
    load(handler) {
        
    }

   
}
