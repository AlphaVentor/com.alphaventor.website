
import { AeroUtilities } from "./AeroUtilities.js";


export class AeroFooter extends HTMLElement {

  /**
   * Static Initialization
   * @param {AeroWebPage} page 
   */
  static init0(page) {
    customElements.define("aero-footer", AeroFooter);
    page.requireCssStylesheet("/aero-engine-v3/AeroFooter.css");
  }

  constructor() {
    super();

    this.contentPathname = this.getAttribute("path");

    AeroUtilities.sendRequest_HTTP_GET(this.contentPathname, "text", content => {
      this.innerHTML = content;
    });
  }

}