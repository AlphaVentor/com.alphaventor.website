

import { SVG_inject } from "/aero-engine-v3/Icon.js";



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



export class LinkButton3 extends HTMLElement {



    /**
    * Static Initialization
    * @param {AeroWebPage} page 
    */
    static init0(page) {
        customElements.define("link-button3", LinkButton3);
        customElements.define("link-button3-group", LinkButton3Group);
        page.requireCssStylesheet("/aero-engine-v3/buttons/LinkButton3.css");
    }




    /**
     * 
     */
    constructor() {
        super();

        this.iconPathname = this.getAttribute("icon");
        this.url = this.getAttribute("href");
        this.type = this.hasAttribute("type") ? this.getAttribute("type") : "marketing";
        this.color = this.hasAttribute("color") ? this.getAttribute("color") : "std";
        this.target = this.getAttribute("target");
        this.resource = this.getAttribute("resource");
        this.text = this.innerHTML;
        
        /* clear */
        while(this.firstChild){ this.removeChild(this.lastChild); }

        const linkNode = document.createElement("a");
        linkNode.setAttribute("type", this.type);
        linkNode.setAttribute("color", this.color);
        linkNode.classList.add("link-button3");
        if (this.isMobileHideable) { linkNode.classList.add("square-grid-mobile-hideable"); }

        const picNode = document.createElement("span");
        picNode.classList.add("link-button3-pic");
        SVG_inject(picNode, this.iconPathname, 24, 24);
        linkNode.appendChild(picNode);

        const textNode = document.createElement("span");
        textNode.classList.add("link-button3-text");
        textNode.innerHTML = this.text;
        linkNode.appendChild(textNode);

        let val;
        if (this.target) { linkNode.href = this.target; }
        /* download="proposed_file_name" */
        else if (this.resource) { linkNode.download = this.resource; }


        this.appendChild(linkNode);
    }


}



export class LinkButton3Group extends HTMLElement {

   
    constructor() {
        super();

    }

}
