import { AeroComponent } from "./AeroComponent.js";



const CONTENT = `
<div class="aero-footer-row">
  <div class="aero-footer-column">
    <h4 class="marketing-site-footer-name">Stay tuned!</h4>
    <p>We push news from time to time, follow us on:</p>
    <div class="aero-footer-social">
          <a href="https://www.linkedin.com/company/alphaventor"><img src="aero/icons/LinkedIn-icon.svg"></a>
          <a href="https://twitter.com/alphaventor256"><img src="aero/icons/Twitter-icon.svg"></a>
  </div>
  </div>
  <div class="aero-footer-column">
     <h4 class="marketing-site-footer-title">Contact Info</h4>
    <div class="marketing-site-footer-block">
      <p>20-22 place Charles de Gaulle, 78100 Saint Germain en Laye, France</p>
    </div>
    <div class="marketing-site-footer-block">
      <p>contact@octofan.com</p>
    </div>
  </div>
</div>
<div class="aero-footer-bottom">
<a href="">Website Terms & Conditions</a>
<a href="">Cookies Policy</a>
<a href="">Disclaimer</a>
</div>`;


export class AeroFooter extends AeroComponent {

    /** @type{HTMLElement} */
    footerNode;


    props;

    constructor(props){
        super();   
        this.props = props;    
    }

    render(){
        if(!this.isInitialized){
            this.footerNode = document.createElement('footer');
            this.footerNode.classList.add('aero-footer');
            this.footerNode.innerHTML = CONTENT;
            this.isInitialized = true;     
        }
    }

    getEnveloppe(){
        return this.footerNode;
    }

      /**
     * 
     * @param {AeroWebPage} page 
     */
       link(page) {
        this.page = page;
        page.import_CSS("aero/AeroFooter.css");
    }

    isLoaded(){
        return this.isInitialized;
    }


    

}
