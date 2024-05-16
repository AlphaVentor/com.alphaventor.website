import { AeroComponent } from "./AeroComponent.js";
import { clearChildNodes } from "./aero.js";

/*
export const MENUS = ["Home", "Technology", "Applications", "Team", "Contact"];
export const HREF = ["/index.html", "/technology.html", "/applications.html", "/team.html", "/contact.html"];
*/

/**
 * 
 */
export class AeroHeader extends AeroComponent {

    /** @type{HTMLHeadElement} */
    headerNode;

    /** */
    props;

    /**
     * @type {boolean}
     */
    isNavVisible;

    constructor(props) {
        super();
        this.props = props;
       
    }

    initializeNodes(state){
        this.headerNode = document.createElement('header');
        this.isLandscape = state.isLandscape;
        this.draw();
        
        return this.headerNode;
    }

    getEnveloppe() {
        return this.headerNode;
    }

    load(){ /* nothing to load here */ }

    render(state) {
        if (state.isLandscape != this.isLandscape) { // repaint
            this.isLandscape = state.isLandscape;
            clearChildNodes(this.headerNode);
            this.draw();
        }
    }

    draw() {
        if (this.isLandscape) {
            this.drawLandscape();
        }
        else {
            this.drawPortrait();
        }
    }


    drawLandscape() {

        /* <front-icon> */
        let menuLogoNode = document.createElement("div");
        menuLogoNode.classList.add("menu-logo");
        let frontImgNode = document.createElement("img");
        frontImgNode.src = this.props.logo;
        frontImgNode.alt = "logo";
        menuLogoNode.appendChild(frontImgNode);
        this.headerNode.appendChild(menuLogoNode);
        /* </front-icon> */

        let selectedMenu = this.props.selected;
        this.headerNode.appendChild(this.buildNavNode(selectedMenu));
    }


    drawPortrait() {

        let iconsWrapperNode = document.createElement("div");
        iconsWrapperNode.classList.add("aero-menu-icons-wrapper");

        /* <menu-handler-icon> */
        let menuHandlerNode = document.createElement("div");
        menuHandlerNode.classList.add("menu-handler");
        let menuHandlerImgNode = document.createElement("img");
        menuHandlerImgNode.src = "aero/menu-icon.svg";
        menuHandlerImgNode.alt = "menu";
        menuHandlerNode.appendChild(menuHandlerImgNode);
        iconsWrapperNode.appendChild(menuHandlerNode);
        /* </menu-handler-icon> */

        /* <logo-icon> */
        let menuLogoNode = document.createElement("div");
        menuLogoNode.classList.add("menu-logo");
        let frontImgNode = document.createElement("img");
        frontImgNode.src = this.props.logo;
        frontImgNode.alt = "logo";
        menuLogoNode.appendChild(frontImgNode);
        iconsWrapperNode.appendChild(menuLogoNode);
        /* </logo-icon> */

        this.headerNode.appendChild(iconsWrapperNode);

        let selectedMenu = this.props.selected;
        let navNode = this.buildNavNode(selectedMenu);

        this.headerNode.appendChild(navNode);

        this.isNavVisible = false; // hidden by default in portrait
        let _this = this;
        menuHandlerNode.addEventListener("click", function(){
            navNode.style.visibility = _this.isNavVisible ? "hidden" : "visible";
            _this.isNavVisible = !_this.isNavVisible;
        }, false);
    }



    buildNavNode(selectedMenu) {

        /* <nav> */
        let navNode = document.createElement('nav');
        
        let unorderedListNode = document.createElement('ul');

        this.props.menus.forEach((menu, index) => {
            let listItemNode = document.createElement('li');
            listItemNode.classList.add("aero-header-menu")
            
            let isSelected = (menu == selectedMenu);
            if (isSelected) {
                listItemNode.setAttribute("selected", "");
            }
    
            let aNode = document.createElement("a");
            aNode.href = isSelected ? "/" : this.props.hrefs[index];
            aNode.innerHTML = menu;
            listItemNode.appendChild(aNode);
            unorderedListNode.appendChild(listItemNode);
        });
        navNode.appendChild(unorderedListNode);
        /* </nav> */
    
        return navNode;
    }


  

    /**
   * 
   * @param {AeroWebPage} page 
   */
    link(page) {
        this.page = page;
        page.import_CSS("aero/AeroHeader.css");
    }

    isLoaded(){
        return this.isInitialized;
    }

}



