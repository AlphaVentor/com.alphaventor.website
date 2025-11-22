import { AeroElement } from "./AeroElement.js";
import { AeroUtilities } from "./AeroUtilities.js";
import { Icon } from "./Icon.js";
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

export class DocumentationV2 extends AeroElement {

    /** @type {HTMLElement } */
    sectionNode;

    type;

    /**
     * @type{List<DocElement>}
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
    constructor(page, sources){
        super();

        /* CSS requirements */
        page.css_requireStylesheet("/aero-engine-v2/Documentation.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-doc");

        this.headerNode = document.createElement("div");
        this.headerNode.classList.add("aero-doc-header");
        this.sectionNode.appendChild(this.headerNode);

        this.mainNode = document.createElement("div");
        this.mainNode.classList.add("aero-doc-main");

        this.tableOfContentsNode = document.createElement("div");
        this.tableOfContentsNode.classList.add("aero-doc-table");
        this.mainNode.appendChild(this.tableOfContentsNode);

        this.contentNode = document.createElement("div");
        this.contentNode.classList.add("aero-doc-content");
        this.mainNode.appendChild(this.contentNode);

        this.sectionNode.appendChild(this.mainNode);


        this.headerNode.innerHTML = "header zone";

        let val;
        this.arrangement = (val = sources.getAttribute("arrangement")) ? val : "std";
        this.sectionNode.setAttribute("arrangement", this.arrangement);

        /* <id> */
        if (sources.id != undefined) {  this.sectionNode.id = sources.id; }
        /* </id> */


        /* <elements> */
        let node = sources.firstChild;
        let index = 2;
        while(node){
            let type = node.nodeName.toLowerCase();
            switch(type){
                case "h1" : this.elements.push(new DocHeader1(page, node, "doc-h1-"+(index++))); break;
                case "h2" : this.elements.push(new DocHeader2(page, node)); break;
                case "p" : this.elements.push(new DocParagraph(page, node)); break;
                case "svg" : this.elements.push(new DocSVG(page, node)); break;
                case "code" : this.elements.push(new DocCodeBlock(page, node)); break;
            }

            node = node.nextSibling;
        }

        this.elements.forEach(element => this.contentNode.appendChild(element.html_getNode()));
        this.elements.forEach(element => element.html_appendTableEntry(this.tableOfContentsNode));
        /* </elements> */
    }


    html_getNode(){ 
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

export class DocElement {

    constructor(sources) {
    
    }

}

export class DocHeader1 extends DocElement {

    constructor(page, sources, id) {
        super(sources);
        this.id = id;
        this.name = sources.innerHTML;

        const headerNode = document.createElement("h1");
        headerNode.id = id;
        headerNode.classList.add("aero-doc-h1");
        headerNode.innerHTML = this.name;
        this.headerNode = headerNode;
    }

    html_getNode() { return this.headerNode; }
   
    html_appendTableEntry(tableOfContentsNode) { 
        const entryNode = document.createElement("div");
        const linkNode = document.createElement("a");
        linkNode.href = "#"+this.id;
        linkNode.innerHTML = this.name;
        entryNode.appendChild(linkNode);
        tableOfContentsNode.appendChild(entryNode);
    }
}


export class DocHeader2 extends DocElement {

    constructor(page, sources) {
        super(sources);
        const headerNode = document.createElement("h2"); 
        headerNode.classList.add("aero-doc-h2");
        headerNode.innerHTML = sources.innerHTML;
        this.headerNode = headerNode;
    }

    html_getNode() { return this.headerNode; }
    html_appendTableEntry() { /* nothing to add */}
}


export class DocParagraph extends DocElement {

    constructor(page, sources) {
        super(sources); 
        const headerNode = document.createElement("p");
        headerNode.classList.add("aero-doc-p");
        headerNode.innerHTML = sources.innerHTML;
        this.headerNode = headerNode;
    }

    html_getNode() { return this.headerNode; }
    html_appendTableEntry() { /* nothing to add */}
}


export class DocSVG extends DocElement {

    constructor(page, sources) {
        super(sources);
        this.pathname = sources.getAttribute("path");

        const wrapperNode = document.createElement("div");
        wrapperNode.classList.add("aero-doc-pic-svg");
        //if (this.isMobileHideable) { headerNode.classList.add("txbk-mobile-hideable"); }
    
        let val;
        const width = (val = sources.getAttribute("width")) ? parseInt(val) : 128;
        const height = (val = sources.getAttribute("height")) ? parseInt(val) : 128;
        this.icon = new Icon(this.pathname, { width: width, height: height }); 
        wrapperNode.appendChild(this.icon.build());

        this.wrapperNode = wrapperNode;
    }

    html_getNode() { return this.wrapperNode; }
    html_appendTableEntry() { /* nothing to add */}

}


export class DocCodeBlock extends DocElement {

    static isLanguageLoaded = false;

    /**
     * 
     * @param {WebPageV2} page 
     * @param {HTMLElement} sources 
     */
    constructor(page, sources){
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
        wrapperNode.classList.add("aero-doc-code-section");

        const windowNode = document.createElement("div");
        windowNode.classList.add("aero-doc-code-window");
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
    html_appendTableEntry() { /* nothing to add */}


    /**
     * 
     * @param {WebPage} page 
     */
    render(page) {
        /* do nothing */
    }
}
