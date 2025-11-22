import { AeroElement } from "./AeroElement.js";
import { WebPage } from "./WebPage.js";



export class Video extends AeroElement {

    /** @type {HTMLElement } */
    sectionNode;

    /**
     * 
     * @param {HTMLElement} sources 
     */
    constructor(page, sources) {
        super();

        /* CSS requirements */
        page.css_requireStylesheet("/aero/Video.css");


        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-video-wrapper");

        /*
         <video loop autoplay muted class="VideoMain">
        <source src="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
    </video>
    */

        this.videoNode = document.createElement("video");
        this.videoNode.classList.add("aero-video");
        this.videoNode.setAttribute("loop", "");
        this.videoNode.setAttribute("autoplay", "");
        this.videoNode.setAttribute("muted", "");


        let val;

        /* <type> */
        const vsrc = (val = sources.getAttribute("src")) ? val : null;

        if (vsrc) {
            this.sourceNode = document.createElement("source");
            this.sourceNode.src = vsrc;
            this.sourceNode.setAttribute("type", "video/mp4");
        }

        this.videoNode.appendChild(this.sourceNode);
        this.sectionNode.appendChild(this.videoNode);
    }


    html_getNode() {
        return this.sectionNode;
    }

    /**
     * 
     * @param {WebPage} page 
     */
    render(page) {
    }

}
