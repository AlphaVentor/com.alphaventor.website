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


    /**
     * @type{String} 
     * Color of the flat elements (icon/logo)
     */
    flatColor;

    constructor(props) {
        super();
        this.props = props;

        this.flatColor = "black";
        switch(this.props.theme){
            default:
            case "light": this.flatColor = "black"; break;
            case "dark": this.flatColor = "white"; break;
        }

    }

    initializeNodes(handler, state) {
        this.headerNode = document.createElement('header');
        this.headerNode.setAttribute("theme", this.props.theme);
        this.isLandscape = state.isLandscape;
        this.draw();

        return this.headerNode;
    }

    getEnveloppe() {
        return this.headerNode;
    }

    load() { /* nothing to load here */ }

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
        frontImgNode.src = `logos/logo-small-${this.flatColor}.png`;
        frontImgNode.alt = "logo";
        menuLogoNode.appendChild(frontImgNode);
        this.headerNode.appendChild(menuLogoNode);
        /* </front-icon> */

        /* <nav> */
        let selectedMenu = this.props.selected;
        this.headerNode.appendChild(this.buildNavNode(selectedMenu));
        /* </nav> */

        /* <login-icon> */
        this.headerNode.appendChild(this.buildLoginNode());
        /* </login-icon> */
    }


    drawPortrait() {

        let iconsWrapperNode = document.createElement("div");
        iconsWrapperNode.classList.add("aero-menu-icons-wrapper");

        /* <menu-handler-icon> */
        let menuHandlerNode = document.createElement("div");
        menuHandlerNode.classList.add("menu-handler");
        let menuHandlerImgNode = document.createElement("img");
        menuHandlerImgNode.src = `icons/menu-${this.flatColor}.svg`;
        menuHandlerImgNode.alt = "menu";
        menuHandlerNode.appendChild(menuHandlerImgNode);
        iconsWrapperNode.appendChild(menuHandlerNode);
        /* </menu-handler-icon> */

        /* <logo-icon> */
        let menuLogoNode = document.createElement("div");
        menuLogoNode.classList.add("menu-logo");
        let frontImgNode = document.createElement("img");
        frontImgNode.src = `logos/logo-small-${this.flatColor}.png`;
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
        menuHandlerNode.addEventListener("click", function () {
            navNode.style.visibility = _this.isNavVisible ? "hidden" : "visible";
            _this.isNavVisible = !_this.isNavVisible;
        }, false);

        /* <login-icon> */
        iconsWrapperNode.appendChild(this.buildLoginNode());
        /* </login-icon> */
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

    buildLoginNode() {
        /* <login-icon> */
        const loginNode = document.createElement("a");
        
        loginNode.href ="https://app.alphaventor.com";

        loginNode.classList.add("menu-login");
        let loginImgNode = document.createElement("img");
        loginImgNode.src = `icons/login-${this.flatColor}.svg`; 
        loginImgNode.alt = "login";
        loginNode.appendChild(loginImgNode);
        return loginNode;
        /* </login-icon> */
    }




    /**
   * 
   * @param {AeroWebPage} page 
   */
    link(page) {
        this.page = page;
        page.import_CSS("aero/AeroHeader.css");
    }

    isLoaded() {
        return this.isInitialized;
    }

}