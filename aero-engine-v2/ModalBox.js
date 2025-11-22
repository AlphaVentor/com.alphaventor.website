
import { AeroElement } from "./AeroElement.js";


export class ModalBox extends AeroElement {



    /** @type{object} */
    modalLayer;

    /**
     * @type {HTMLDivElement}
     */
    boxNode;



    /**
     * 
     * @param {HTMLDivElement} parentNode 
     */
    constructor(props, onProceed) {
        super();

        this.wrapperNode = document.createElement("div");
       
        const overlayNode = document.createElement("div");
        overlayNode.classList.add("modalbox-overlay");
        this.wrapperNode.appendChild(overlayNode);

        this.boxNode = document.createElement("div");
        this.boxNode.classList.add("modalbox");


        /* <left> */
        this.iconNode = document.createElement("div");
        this.iconNode.classList.add("modalbox-icon");
        this.iconNode.style.backgroundImage = `url(${props.image})`;
        this.boxNode.appendChild(this.iconNode);
        /* </left> */
       

        /* <right> */
        this.mainNode = document.createElement("div");
        this.mainNode.classList.add("modalbox-main");        

        /* <message> */
        this.messageNode = document.createElement("div");
        this.messageNode.classList.add("modalbox-message");

        const titleNode = document.createElement("h1");
        titleNode.innerHTML = props.title;
        this.messageNode.appendChild(titleNode);

        const explanationNode = document.createElement("p");
        explanationNode.innerHTML = props.explanation;
        this.messageNode.appendChild(explanationNode);
        this.mainNode.appendChild(this.messageNode);
        /* </message> */

        this.controlsNode = document.createElement("div");
        this.controlsNode.classList.add("modalbox-validation");
        this.mainNode.appendChild(this.controlsNode);

        this.buttonNode = document.createElement("div");
        this.buttonNode.classList.add("modalbox-button");
        this.buttonNode.innerHTML = "Proceed to Website";
        this.buttonNode.addEventListener("click", function (event) {
            event.stopPropagation();
            onProceed();
        }, false);
        this.controlsNode.appendChild(this.buttonNode);
        
        this.boxNode.appendChild(this.mainNode);
        /* </right> */
        this.wrapperNode.appendChild(this.boxNode);
    }



    getEnvelope() {
        return this.wrapperNode;
    }


}