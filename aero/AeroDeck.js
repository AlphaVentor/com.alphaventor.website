import { AeroComponent } from "./AeroComponent.js";

import { AeroWebPage } from "./AeroWebPage.js";


/**
 * aero-deck
 */
export class AeroDeck extends AeroComponent {

    /** @type {HTMLElement } */
    sectionNode;

    props;

    constructor(props) {
        super();
        this.props = props;
    }


    initializeNodes(){
        
    }

    render() {
        if (!this.isInitialized) {
            this.draw();
            this.isInitialized = true;
        }
    }

    draw() {
        this.sectionNode = document.createElement("section");
        this.sectionNode.classList.add("aero-deck");

        this.props.cards.forEach(cardProps => {
            let cardSpaceNode = document.createElement("div");
            cardSpaceNode.classList.add("aero-deck-card-space");

            cardSpaceNode.appendChild(createCard(cardProps));

            this.sectionNode.appendChild(cardSpaceNode);
        });
	}

    getEnveloppe() {
        return this.sectionNode;
    }


    /**
     * 
     * @param {AeroWebPage} page 
     */
    link(page) {
        this.page = page;
        page.import_CSS("aero/AeroDeck.css");
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
