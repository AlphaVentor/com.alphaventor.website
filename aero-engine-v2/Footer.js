import { AeroElement } from "./AeroElement.js";
import { AeroUtilities } from "./AeroUtilities.js";


export class Footer extends AeroElement {

  /** @type{HTMLElement} */
  footerNode;


  props;

  constructor(contentPathname, props) {
    super();
    this.contentPathname = contentPathname
    this.props = props;
  }

  /**
    * 
    * @param {WebPage} page 
    * @returns {HTMLElement}
    */
  build(page) {

    /* CSS requirements */
    page.css_requireStylesheet("/aero/Footer.css");

    /* build nodes */
    this.footerNode = document.createElement('footer');
    this.footerNode.classList.add('aero-footer');

    AeroUtilities.sendRequest_HTTP_GET(this.contentPathname, "text", content => {
      this.footerNode.innerHTML = content;
    });

    /* return wrapper node */
    return this.footerNode;
  }

  /**
    * 
    * @param {WebPage} page 
    */
  render(page) {

  }
}