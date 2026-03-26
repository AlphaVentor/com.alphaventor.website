import { SVG_inject } from "/aero-engine-v3/Icon.js";


export class LinkButton2 extends HTMLElement {


    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("link-button2", LinkButton2);
        page.requireCssStylesheet("/aero-engine-v3/buttons/LinkButton2.css");
    }



    /**
     * 
     */
    constructor() {
        super(); /* base HTML element */

        this.iconPathname = this.getAttribute("icon");
        this.url = this.getAttribute("href");
        this.type = this.hasAttribute("type") ? this.getAttribute("type") : "std";
        this.color = this.hasAttribute("color") ? this.getAttribute("color") : "std";
        this.text = this.innerHTML;

        while (this.firstChild) { this.removeChild(this.lastChild); }


        const linkNode = document.createElement("a");
        linkNode.setAttribute("type", this.type);
        linkNode.setAttribute("color", this.color);
        linkNode.classList.add("link-button2");
        if (this.isMobileHideable) { linkNode.classList.add("square-grid-mobile-hideable"); }

        const picNode = document.createElement("span");
        picNode.classList.add("link-button2-pic");
        SVG_inject(picNode, this.iconPathname, 24, 24);
        linkNode.appendChild(picNode);

        const textNode = document.createElement("span");
        textNode.classList.add("link-button2-text");
        textNode.innerHTML = this.text;
        linkNode.appendChild(textNode);


        if (this.url) { linkNode.href = this.url; }

        this.linkNode = linkNode;

        this.appendChild(linkNode);
    }

    html_getNode() { return this.linkNode; }
}
