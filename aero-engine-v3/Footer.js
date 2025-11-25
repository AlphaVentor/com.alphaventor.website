
import { AeroUtilities } from "./AeroUtilities.js";


export class Footer extends HTMLElement {

  static TAG = "aero-footer";

  /* CSS requirements */
  static STYLESHEET = "/aero-engine-v3/Footer.css";



  constructor() {
    super();

    this.contentPathname = this.getAttribute("path");

    AeroUtilities.sendRequest_HTTP_GET(this.contentPathname, "text", content => {
      this.innerHTML = content;
    });
  }

}