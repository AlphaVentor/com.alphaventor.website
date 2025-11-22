import { AeroElement } from "./AeroElement.js";

import { WebPage } from "./WebPage.js";


/**
 * aero-deck
 */
export class Deck extends AeroElement {

    /** @type {HTMLElement } */
    sectionNode;

    props;

    constructor(props) {
        super();
        this.props = props;
    }


    /**
     * 
     * @param {WebPage} page 
     * @returns {HTMLElement}
     */
    build(page) {

        /* CSS requirements */
        page.css_requireStylesheet("/aero/Deck.css");

        /* build nodes */
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-deck");

        this.props.cards.forEach(cardProps => {
            let cardSpaceNode = document.createElement("div");
            cardSpaceNode.classList.add("aero-deck-card-space");

            cardSpaceNode.appendChild(createCard(cardProps));

            this.sectionNode.appendChild(cardSpaceNode);
        });

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
    }


    getEnveloppe() {
        return this.sectionNode;
    }


    isLoaded(){
        return this.isInitialized;
    }

   
}

const createCard = function(props){

    let cardNode = document.createElement("div");
    cardNode.classList.add("aero-deck-card");

    let photoNode = document.createElement("div");
    photoNode.classList.add("aero-deck-card-photo");
    photoNode.style.backgroundImage = `url('${props.photo}')`;
    cardNode.appendChild(photoNode);
    
    let nameNode = document.createElement("div");
    nameNode.classList.add("aero-deck-card-name");
    nameNode.innerHTML = props.name;
    cardNode.appendChild(nameNode);
    
    let roleNode = document.createElement("div");
    roleNode.classList.add("aero-deck-card-role");
    roleNode.innerHTML = props.role;
    cardNode.appendChild(roleNode);

    let bioNode = document.createElement("div");
    bioNode.classList.add("aero-deck-card-bio");
    bioNode.innerHTML = props.bio;
    cardNode.appendChild(bioNode);

    return cardNode;
}
