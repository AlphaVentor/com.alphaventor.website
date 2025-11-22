import { AeroElement } from "./AeroElement.js";
import { AeroUtilities } from "./AeroUtilities.js";
import { Icon, SVG_inject } from "./Icon.js";
import { WebPage } from "./WebPage.js";
import { WebPageV2 } from "./WebPageV2.js";


// Using ES6 import syntax
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/es/highlight.min.js';
//  and it's easy to individually load additional languages
import java from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/es/languages/java.min.js';
import xml from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/es/languages/xml.min.js';





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

export class TextBlockV2 extends AeroElement {

    /** @type {HTMLElement } */
    sectionNode;

    type;

    /**
     * @type{List<TextBlockElement>}
     */
    elements = new Array();

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
     * @param {WebPageV2} page 
     * @param {HTMLElement} sources 
     */
    constructor(page, sources) {
        super();

        /* CSS requirements */
        page.css_requireStylesheet("/aero-engine-v2/TextBlock.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("textblock");

        let val;
        this.type = (val = sources.getAttribute("type")) ? val : "std";
        this.sectionNode.setAttribute("type", this.type);

        this.theme = (val = sources.getAttribute("theme")) ? val : "light";
        this.sectionNode.setAttribute("theme", this.theme);

        this.arrangement = (val = sources.getAttribute("arrangement")) ? val : "std";
        this.sectionNode.setAttribute("arrangement", this.arrangement);

        this.numbering = (val = sources.getAttribute("numbering")) ? val : "none";

        /* <id> */
        if (sources.id != undefined) { this.sectionNode.id = sources.id; }
        /* </id> */


        /* <background> */
        if (val = sources.getAttribute("backgroundColor")) {
            switch (val) {
                case "black": this.sectionNode.classList.add("background-black"); break;
                case "white": this.sectionNode.classList.add("background-white"); break;
                case "grey64": this.sectionNode.classList.add("background-grey64"); break;
                case "grey128": this.sectionNode.classList.add("background-grey128"); break;
                case "grey192": this.sectionNode.classList.add("background-grey192"); break;
            }
        }
        else if (val = sources.getAttribute("backgroundGradient")) {
            /* ee */
            page.css_requireStylesheet("/aero-engine-v2/gradient-backgrounds.css");
            this.sectionNode.classList.add("aero-background-gradient-" + val);
        }
        else if (val = sources.getAttribute("backgroundImage")) {
            this.sectionNode.classList.add("background-pic");
            AeroUtilities.loadBackgroundImage(this.sectionNode, val, () => this.render(page));
        }
        /* </background> */


        /* <elements> */
        const numbering = {
            type: this.numbering,
            h1Number: 0,
            h2Number: 0,
            pNumber: 0
        };

        let node = sources.firstChild;
        while (node) {
            let type = node.nodeName.toLowerCase();
            switch (type) {
                case "h1": {
                    numbering.h1Number++;
                    this.elements.push(new TxBkHeader1(page, node, numbering));
                    numbering.h2Number = 0;
                } break;

                case "h2": {
                    numbering.h2Number++;
                    this.elements.push(new TxBkHeader2(page, node, numbering));
                    numbering.pNumber = 0;
                } break;

                case "p": this.elements.push(new TxBkParagraph(page, node)); break;
                case "svg": this.elements.push(new TxBkSVG(page, node)); break;
                case "snippet": this.elements.push(new TxBkCodeSnippet(page, node)); break;
                case "ol": this.elements.push(new TxOrderedBkList(page, node)); break;
                case "ul": this.elements.push(new TxUnorderedBkList(page, node)); break;
                case "links": this.elements.push(new TxBkLinks(page, node)); break;
            }

            node = node.nextSibling;
        }

        this.elements.forEach(element => this.sectionNode.appendChild(element.html_getNode()));
        /* </elements> */
    }


    html_getNode() {
        /* return wrapper node */
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

}

export class TextBlockElement {

    constructor(sources) {

    }

}

export class TxBkHeader1 extends TextBlockElement {

    constructor(page, sources, numbering) {
        super(sources);
        const headerNode = document.createElement("h1");
        switch(numbering.type){
            case "none" : {
                headerNode.innerHTML = sources.innerHTML;
            } break;
            case "1.2.3" : {
                const numberNode = document.createElement("span");
                numberNode.innerHTML = `${numbering.h1Number}.`;
                headerNode.appendChild(numberNode);

                const textNode = document.createElement("span");
                textNode.innerHTML = sources.innerHTML;
                headerNode.appendChild(textNode);
            } break;
        }
        
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
        
        this.headerNode = headerNode;
    }

    html_getNode() { return this.headerNode; }
}


export class TxBkHeader2 extends TextBlockElement {

    constructor(page, sources, numbering) {
        super(sources);
        const headerNode = document.createElement("h2");
        switch(numbering.type){
            case "none" : {
                headerNode.innerHTML = sources.innerHTML;
            } break;
            case "1.2.3" : {
                const numberNode = document.createElement("span");
                numberNode.innerHTML = `${numbering.h1Number}.${numbering.h2Number}.`;
                headerNode.appendChild(numberNode);

                const textNode = document.createElement("span");
                textNode.innerHTML = sources.innerHTML;
                headerNode.appendChild(textNode);
            } break;
        }
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
        this.headerNode = headerNode;
    }

    html_getNode() { return this.headerNode; }
}


export class TxBkParagraph extends TextBlockElement {

    constructor(page, sources) {
        super(sources);
        const headerNode = document.createElement("p");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
        headerNode.innerHTML = sources.innerHTML;
        this.headerNode = headerNode;
    }

    html_getNode() { return this.headerNode; }
}


export class TxBkSVG extends TextBlockElement {

    constructor(page, sources) {
        super(sources);
        this.pathname = sources.getAttribute("path");

        const wrapperNode = document.createElement("div");
        wrapperNode.classList.add("textblock-pic-svg");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }

        let val;
        const width = (val = sources.getAttribute("width")) ? parseInt(val) : 128;
        const height = (val = sources.getAttribute("height")) ? parseInt(val) : 128;
        this.icon = new Icon(this.pathname, { width: width, height: height });
        wrapperNode.appendChild(this.icon.build());

        this.wrapperNode = wrapperNode;
    }

    html_getNode() { return this.wrapperNode; }

}


export class TxBkCodeSnippet extends TextBlockElement {

    static isLanguageLoaded = false;

    /**
     * 
     * @param {WebPageV2} page 
     * @param {HTMLElement} sources 
     */
    constructor(page, sources) {
        super(sources);

        this.sourcePathname = sources.getAttribute("path");

        if (!this.isLanguageLoaded) {

            // Then register the languages you need
            hljs.registerLanguage('java', java);
            hljs.registerLanguage('xml', xml);
            this.isLanguageLoaded = true;
        }

        //page.css_requireStylesheet("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/default.min.css");
        page.css_requireStylesheet("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/atom-one-dark.css");


        const wrapperNode = document.createElement("div");
        wrapperNode.classList.add("txbk-code-section");

        const windowNode = document.createElement("div");
        windowNode.classList.add("txbk-code-window");
        // windowNode.classList.add("theme-atom-one-dark");

        const preNode = document.createElement("pre");
        //preNode.classList.add("theme-atom-one-dark");

        const spanNode = document.createElement("span");
        //spanNode.classList.add("language-java");
        // spanNode.classList.add("hljs");

        const codeNode = document.createElement("code");
        //codeNode.innerHTML = highlightedCode;


        spanNode.appendChild(codeNode);
        preNode.appendChild(spanNode);
        windowNode.appendChild(preNode);
        wrapperNode.appendChild(windowNode);

        AeroUtilities.getResourceFromOrigin(this.sourcePathname, "text", sourceCode => {
            const highlightedSourceCode = hljs.highlight(sourceCode, { language: 'java' }).value;
            codeNode.innerHTML = highlightedSourceCode;
        })

        this.wrapperNode = wrapperNode;
    }


    html_getNode() { return this.wrapperNode; }


    /**
     * 
     * @param {WebPage} page 
     */
    render(page) {
        /* do nothing */
    }
}



export class TxOrderedBkList extends TextBlockElement {

    constructor(page, sources) {
        super(sources);
        const listNode = document.createElement("ol");
        //listNode.classList.add("textblock-list");
        if (this.isMobileHideable) { listNode.classList.add("square-grid-mobile-hideable"); }
        
        let val;
        this.type = (val = sources.getAttribute("type")) ? val : "1";
        listNode.setAttribute("type", this.type);


        /* <elements> */
        let node = sources.firstChild;
        while (node) {
            let type = node.nodeName.toLowerCase();
            switch (type) {
                case "li": {
                    const itemNode = document.createElement("li")
                    itemNode.innerHTML = node.innerHTML;
                    listNode.appendChild(itemNode);
                } break;
            }
            node = node.nextSibling;
        }
        /* </elements> */

        this.listNode = listNode;
    }

    html_getNode() { return this.listNode; }
}



export class TxUnorderedBkList extends TextBlockElement {

    constructor(page, sources) {
        super(sources);
        const listNode = document.createElement("ul");
        //listNode.classList.add("textblock-list");
        if (this.isMobileHideable) { listNode.classList.add("square-grid-mobile-hideable"); }

       
        /* <elements> */
        let node = sources.firstChild;
        while (node) {
            let type = node.nodeName.toLowerCase();
            switch (type) {
                case "li": {
                    const itemNode = document.createElement("li")
                    itemNode.innerHTML = node.innerHTML;
                    listNode.appendChild(itemNode);
                } break;
            }
            node = node.nextSibling;
        }
        /* </elements> */

        this.listNode = listNode;
    }

    html_getNode() { return this.listNode; }
}





export class TxBkLinks extends TextBlockElement {



    /**
     * @type{List<Object>}
     */
    elements = new Array();

    /**
     * 
     * @param {*} page 
     * @param {HTMLElement} sources 
     */
    constructor(page, sources) {
        super(sources);

        const wrapperNode = document.createElement("div");
        wrapperNode.classList.add("textblock-links");
        if (this.isMobileHideable) { wrapperNode.classList.add("square-grid-mobile-hideable"); }

        /* <elements> */
        let node = sources.firstChild;
        while (node) {
            let type = node.nodeName.toLowerCase();
            switch (type) {
                case "a": this.elements.push(new TxBkAnchor(page, node)); break;
            }
            node = node.nextSibling;
        }

        this.elements.forEach(element => {
            let cellNode = document.createElement("div");
            cellNode.appendChild(element.html_getNode());
            wrapperNode.appendChild(cellNode);
        });
        /* </elements> */

        this.wrapperNode = wrapperNode;
    }

    html_getNode() { return this.wrapperNode; }

}

export class TxBkAnchor {

    /**
     * 
     * @param {HTMLElement} sources 
     */
    constructor(page, sources) {

        this.iconPathname = sources.getAttribute("icon");
        this.url = sources.getAttribute("href");

        this.type = sources.hasAttribute("type") ? sources.getAttribute("type") : "std";
        this.color = sources.hasAttribute("color") ? sources.getAttribute("color") : "std";

        const linkNode = document.createElement("a");
        linkNode.setAttribute("type", this.type);
        linkNode.setAttribute("color", this.color);
        linkNode.classList.add("textblock-link");
        if (this.isMobileHideable) { linkNode.classList.add("square-grid-mobile-hideable"); }

        const picNode = document.createElement("span");
        picNode.classList.add("textblock-link-pic");
        SVG_inject(picNode, this.iconPathname, 24, 24);
        linkNode.appendChild(picNode);

        const textNode = document.createElement("span");
        textNode.classList.add("textblock-link-text");
        textNode.innerHTML = sources.innerHTML;
        linkNode.appendChild(textNode);

        let val;
        if (val = sources.getAttribute("href")) { linkNode.href = val; }
        /* download="proposed_file_name" */
        if (val = sources.getAttribute("client-filename")) { linkNode.download = val; }


        this.linkNode = linkNode;
    }

    html_getNode() { return this.linkNode; }

}