import { ModalBox } from "./ModalBox.js";


/**
 * 
 * @param {*} pagePathname 
 */
export const boot = function (pagePathname, hasCookiesModalBox = false) {

    /* <structure> */

    const bodyNode = document.body;


    const wrapperNode = document.createElement("div");

    /* build */
    const baseLayerNode = document.createElement("div");
    baseLayerNode.classList.add("hidden");
    baseLayerNode.id = "base";
    wrapperNode.appendChild(baseLayerNode);

    const topLayerNode = document.createElement("div");
    topLayerNode.classList.add("hidden");
    topLayerNode.id = "overlay";
    wrapperNode.appendChild(topLayerNode);

    const veilNode = document.createElement("div");
    veilNode.id = "veil";
    wrapperNode.appendChild(veilNode);
    bodyNode.appendChild(wrapperNode);

    /* </structure> */



    veilNode.appendChild(createSpinner());


    /**
     * import { WEB_PAGE } from './';
window.WEB_PAGE = WEB_PAGE;
     */



    import(pagePathname).then((mod) => {

        const page = mod.WEB_PAGE;

        /* start page */
        page.start();

        console.log("WEBPAGE loaded!");

        if (hasCookiesModalBox) {
            const modalBox = new ModalBox({
                image: "icons/cookie.png",
                title: "0 cookies : Total privacy",
                explanation: "Zero cookie policy means that no tracking of any kind is used on this site."
            }, () => {
                topLayerNode.removeChild(modalBox.getEnvelope());

                /* run */
                page.run();
            });
            topLayerNode.appendChild(modalBox.getEnvelope());
        }

    });


}



export const createSpinner = function () {

    const node = document.createElement("div");
    node.className = "boot-loader";
    node.innerHTML = `
        <div class="boot-embedded-icon"></div>
        <div class="boot-spinner">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
        </div>`;

        return node;
}