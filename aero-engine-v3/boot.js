import { AeroWebPage } from "./AeroWebPage.js";
import { Header } from "./Header.js";
import { Slide } from "./Slide.js";
import { SquareGrid } from "./SquareGrid.js";


/**
 * the base page
 */
export const AERO_WEB_PAGE = new AeroWebPage();


const components = [Slide, Header, SquareGrid];


components.forEach(component => {
    customElements.define(component.TAG, component);
    AERO_WEB_PAGE.requireCSSStylesheet(component.STYLESHEET);
});


AERO_WEB_PAGE.requireCSSStylesheet("/aero-engine-v3/AeroWebPage.css");
AERO_WEB_PAGE.update();

/**
 * 
 * @param {*} props 
 */
export const boot = function(){
   //AERO_WEB_PAGE.start();
}
