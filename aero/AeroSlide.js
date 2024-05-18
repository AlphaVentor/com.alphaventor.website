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



export const LOW_RESOLUTION_TAG = "-low";
export const HIGH_RESOLUTION_TAG = "-high";

export class AeroSlide extends AeroComponent {

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

    /**
     * 
     * @param {LoadHandler} handler 
     * @returns 
     */
    initializeNodes(handler){
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-slide");

        this.setType(this.type);
        this.setTheme(this.props.theme ? this.props.theme : "light");


        /* <background> */
        if (this.props.background != undefined) {
            let backgroundParam = this.props.background;
            if (backgroundParam.substring(0, 4) == "pic:") {

                /* extract backgroundImagePath */
                let n = backgroundParam.length;
                let backgroundImagePath = backgroundParam.substring(4, n);
                this.sectionNode.classList.add("background-pic");
                handler.loadBackgroundImage(this.sectionNode, backgroundImagePath);
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


        /* <text> */
        let textNode = document.createElement("div");
        textNode.classList.add("aero-slide-text");

        /* <h1> */
        if (this.props.title != undefined) {
            let h1Node = document.createElement("h1");
            h1Node.innerHTML = this.props.title;
            textNode.appendChild(h1Node);
        }
        /* </h1> */

        /* <h2> */
        if (this.props.subtitle != undefined) {
            let h2Node = document.createElement("h2");
            h2Node.innerHTML = this.props.subtitle;
            textNode.appendChild(h2Node);
        }
        /* </h2> */

        /* <p> */
        if (this.props.paragraph != undefined) {
            let pNode = document.createElement("p");
            pNode.innerHTML = this.props.paragraph;
            textNode.appendChild(pNode);
        }
        /* </p> */

        this.sectionNode.appendChild(textNode);
        /* </text> */

        /* <metrics> */
        if (this.props.metrics != undefined) { this.drawMetrics(this.props.metrics); }
        /* <metrics> */


        /* <asset> */
        if (this.props.asset != undefined) {
            let assetNode = document.createElement("div");
            assetNode.classList.add("aero-slide-asset");
            if(this.props.assetAspectRatio){ assetNode.style.aspectRatio = this.props.assetAspectRatio; }
            let assetImagePath = this.props.asset;
            handler.loadBackgroundImage(assetNode, assetImagePath);
            this.sectionNode.appendChild(assetNode);
        }
        /* </assset> */

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
        const _this = this;
        if (this.hasBackgroundImage) {
           
        }

        /* <asset> */
        if (this.hasAssetImage) {
         
        }
        /* </assset> */

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



    }

    drawMetrics(script) {
        /*
        <div class="metrics-4">
            <div class="metrics-item">
                <div class="metrics-item-value">
                    <span class="number">6000</span><span class="unit">kg</span>
                </div>
                <div class="metrics-item-parameter">Max nacelle weight</div>
            </div>
            <div class="metrics-item">
                <div class="metrics-item-value">
                    <span class="modifier">></span><span class="number">12</span><span
                        class="unit">h</span>
                </div>
                <div class="metrics-item-parameter">Flight time (ECO MODE 250
                    km/h, full load)</div>
            </div>
            <div class="metrics-item">
                <div class="metrics-item-value">
                    <span class="modifier">></span><span class="number">3000</span><span
                        class="unit">km</span>
                </div>
                <div class="metrics-item-parameter">Range (ECO MODE 250 km/h,
                    full load)</div>
            </div>
            <div class="metrics-item">
                <div class="metrics-item-value">
                    <span class="modifier">></span><span class="number">450</span><span
                        class="unit">km/h</span>
                </div>
                <div class="metrics-item-parameter">Max speed</div>
            </div>
        </div>
        */
        let metricsNode = document.createElement("div");
        metricsNode.classList.add(`aero-slide-metrics`);
        script.forEach(metric => {
            let metricsItemNode = document.createElement("div");
            metricsItemNode.classList.add("aero-slide-metrics-item");

            let metricsItemValueNode = document.createElement("div");
            metricsItemValueNode.classList.add("aero-slide-metrics-item-value");

            let content = "";
            if (metric.modifier != undefined) {
                content += `<span class="modifier">${metric.modifier}</span>`;
            }
            content += `<span class="number">${metric.number}</span>`;
            content += `<span class="unit">${metric.unit}</span>`;
            metricsItemValueNode.innerHTML = content;
            metricsItemNode.appendChild(metricsItemValueNode);

            let metricsItemParameterNode = document.createElement("div");
            metricsItemParameterNode.classList.add("aero-slide-metrics-item-parameter");
            metricsItemParameterNode.innerHTML = metric.parameter;
            metricsItemNode.appendChild(metricsItemParameterNode);

            metricsNode.appendChild(metricsItemNode);
        })
        this.sectionNode.appendChild(metricsNode);
    }


    redrawHighRes() {

        if (this.hasBackgroundImage && this.backgroundImagePath.includes(LOW_RESOLUTION_TAG)) {
            let highResPath = this.backgroundImagePath.replace(LOW_RESOLUTION_TAG, HIGH_RESOLUTION_TAG);
            let highResImageBuffer = new Image();
            let _this = this;
            highResImageBuffer.onload = function () {
                _this.sectionNode.style.backgroundImage = `url(${highResImageBuffer.src})`;
                _this.isBackgroundImageLoaded = true;
                _this.page.notifyElementHasBeenLoaded();
            };
            this.isBackgroundImageLoaded = false;
            highResImageBuffer.src = highResPath; // trigger
        }

        if (this.hasAssetImage && this.assetImagePath.includes(LOW_RESOLUTION_TAG)) {
            let highResPath = this.assetImagePath.replace(LOW_RESOLUTION_TAG, HIGH_RESOLUTION_TAG);
            let highResImageBuffer = new Image();
            let _this = this;
            highResImageBuffer.onload = function () {
                _this.assetNode.style.backgroundImage = `url(${highResImageBuffer.src})`;
                _this.isAssetImageLoaded = true;
                _this.page.notifyElementHasBeenLoaded();
            };
            this.isAssetImageLoaded = false;
            highResImageBuffer.src = highResPath; // trigger
        }
    }

}
