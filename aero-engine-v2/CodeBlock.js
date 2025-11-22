import { AeroElement } from "./AeroElement.js";
import { WebPage } from "./WebPage.js";


// Using ES6 import syntax
import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/es/highlight.min.js';
//  and it's easy to individually load additional languages
import java from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/es/languages/java.min.js';
import xml from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/es/languages/xml.min.js';
import { AeroUtilities } from "./AeroUtilities.js";




export class CodeBlock extends AeroElement {

    static isLanguageLoaded = false;


    constructor(sourcePathname) {
        super();
        this.sourcePathname = sourcePathname;

        if (!this.isLanguageLoaded) {

            // Then register the languages you need
            hljs.registerLanguage('java', java);
            hljs.registerLanguage('xml', xml);
            this.isLanguageLoaded = true;
        }
    }

    /**
     * 
     * @param {WebPage} page 
     */
    build(page) {
        //page.css_requireStylesheet("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/default.min.css");
        page.css_requireStylesheet("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/atom-one-dark.css");

        page.css_requireStylesheet("/aero-engine-v2/CodeBlock.css");

      


        const sectionNode = document.createElement("section");
        sectionNode.classList.add("code-block-section");

        const windowNode = document.createElement("div");
        windowNode.classList.add("code-block-window");
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
        sectionNode.appendChild(windowNode);

        AeroUtilities.getResourceFromOrigin(this.sourcePathname, "text", sourceCode => {
            const highlightedSourceCode = hljs.highlight(sourceCode, { language: 'java' }).value;
            codeNode.innerHTML = highlightedSourceCode;
        })

       
        return (this.sectionNode = sectionNode);
    }


    /**
     * 
     * @param {WebPage} page 
     */
    render(page) {
        /* do nothing */
    }
}