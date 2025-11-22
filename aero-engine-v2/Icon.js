import { AeroUtilities } from "./AeroUtilities.js";




export class Icon {

    constructor(pathname, props) {
        this.pathname = pathname;
        this.props = props;

        this.width = props.width ? props.width : 64;
        this.height = props.height ? props.height : 64;

    }

    build() {

        this.wrapperNode = document.createElement("div");

        AeroUtilities.getResourceFromOrigin(this.pathname, "text", responseText => {
            this.wrapperNode.innerHTML = responseText;
            let svgNode = this.wrapperNode.getElementsByTagName("svg")[0];
            svgNode.setAttribute("width", this.width);
            svgNode.setAttribute("height", this.height);
            this.svgNode = svgNode;
            this.isSVGNodeLoaded = true;
        });

        return this.wrapperNode;
    }

    getEnvelope(){ return this.wrapperNode; }

}


export function SVG_inject(target, pathname, width, height){
    AeroUtilities.getResourceFromOrigin(pathname, "text", responseText => {
        target.innerHTML = responseText;
        const svgNode = target.getElementsByTagName("svg")[0];
        svgNode.setAttribute("width", width ? width : 64);
        svgNode.setAttribute("height", height ? height : 64);
    });
}