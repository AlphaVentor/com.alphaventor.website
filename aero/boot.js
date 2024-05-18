


/**
 * 
 * @param {*} pagePathname 
 */
export const boot = function (pagePathname) {

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


    veilNode.innerHTML = `
        <div class="boot-loader">
            <div class="boot-embedded-icon"></div>
            <div class="boot-spinner">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>`;


    /**
     * import { WEB_PAGE } from './';
window.WEB_PAGE = WEB_PAGE;
     */



    import(pagePathname).then((mod) => {
        mod.WEB_PAGE.start();
        console.log("WEBPAGE loaded!");
    });
    

}