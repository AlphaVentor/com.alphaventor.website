


export function boot() {

    const bodyNode = document.body;

    /* <top-layer-node> */
    const topLayerNode = document.createElement("div");
    topLayerNode.id = "overlay";
    bodyNode.appendChild(topLayerNode);
    /* </top-layer-node> */

    /* <veil node> */
    const veilNode = document.createElement("div");
    veilNode.id = "aero-veil";
    veilNode.setAttribute("state", "unrolled");
    veilNode.appendChild(createSpinner());
    bodyNode.appendChild(veilNode);
    /* </veil node> */

    /* Start page */
    import('/aero-engine-v3/AeroWebPage.js')
        .then((module) => {
            //module.default();  // If default export
            //module.namedExport();
            module.boot();
        })
        .catch((err) => {
            console.error('Failed to load module:', err);
        });

};


function createSpinner() {

    //const iconPathname = this.iconPathname;

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

