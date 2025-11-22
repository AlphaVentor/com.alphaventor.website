import { AeroElement } from "./AeroElement.js";
import { AeroUtilities } from "./AeroUtilities.js";
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



export const LOW_RESOLUTION_TAG = "-low";
export const HIGH_RESOLUTION_TAG = "-high";

export class SlideV2 extends AeroElement {

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
     * @param {HTMLElement} sources 
     */
    constructor(page, sources) {
        super();

        /* CSS requirements */
        page.css_requireStylesheet("/aero/Slide.css");
        page.css_requireStylesheet("/aero/gradient-backgrounds.css");


        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-slide");

        /* <id> */
        this.id = sources.id;
        if (this.id) { this.sectionNode.id = this.id; }
        /* </id> */

        let val;

        /* <type> */
        this.type = (val = sources.getAttribute("type")) ? val : "prime";
        this.sectionNode.setAttribute("type", this.type);
        /* </type> */

        /* <theme> */
        this.theme = (val = sources.getAttribute("theme")) ? val : "light";
        this.sectionNode.setAttribute("theme", this.theme);
        /* </theme> */


        /* <arrangement> */
        this.arrangement = (val = sources.getAttribute("arrangement")) ? val : "default";
        this.sectionNode.setAttribute("arrangement", this.arrangement);
        /* </arrangement> */


        /* <background> */
        if (sources.hasAttribute("backgroundColor")) {
            this.sectionNode.style.backgroundColor = sources.getAttribute("backgroundColor");
        }
        else if (val = sources.getAttribute("backgroundGradient")) {
            this.sectionNode.classList.add("aero-background-gradient-" + val);
        }
        else if (val = sources.getAttribute("backgroundImage")) {
            this.sectionNode.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this.sectionNode, val, () => this.render(page));
        }
        /* </background> */

        /* <text> */
        let textNode = document.createElement("div");
        textNode.classList.add("aero-slide-text");

        let sourceNode = sources.firstChild;
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

            sourceNode = sourceNode.nextSibling; /* next source node */
        }

        this.sectionNode.appendChild(textNode);
        /* </text> */

        /* <metrics> */
        //if (sources.metrics != undefined) { this.drawMetrics(this.props.metrics); }
        /* <metrics> */


        /* <asset> */
        
        if (val = sources.getAttribute("asset")) {
            let assetImagePath = val;
            let assetNode = document.createElement("div");
            assetNode.classList.add("aero-slide-picture");
            if (val = sources.getAttribute("assetAspectRatio")) { assetNode.style.aspectRatio = val; }
            AeroUtilities.loadBackgroundImage(assetNode, assetImagePath, () => { });
            this.sectionNode.appendChild(assetNode);
        }
        /* </assset> */

    }


    html_getNode(){
        return this.sectionNode;
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
