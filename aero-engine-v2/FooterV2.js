import { AeroElement } from "./AeroElement.js";
import { AeroUtilities } from "./AeroUtilities.js";
import { WebPageV2 } from "./WebPageV2.js";


export class FooterV2 extends AeroElement {

  /** @type{HTMLElement} */
  footerNode;


  /**
   * 
   * @param {WebPageV2} page 
   * @param {HTMLElement} sources 
   */
  constructor(page, sources) {
    super();
    /* CSS requirements */
    page.css_requireStylesheet("/aero-engine-v2/Footer.css");

    /* build nodes */
    this.footerNode = document.createElement('footer');
    this.footerNode.classList.add('aero-footer');

    this.contentPathname = sources.getAttribute("path");

    AeroUtilities.sendRequest_HTTP_GET(this.contentPathname, "text", content => {
      this.footerNode.innerHTML = content;
    });
  }

  html_getNode() {
    /* return wrapper node */
    return this.footerNode;
  }


  /**
    * 
    * @param {WebPageV2} page 
    */
  render(page) {

  }
}