


export class Welcome {



    /**
     * @type{HTMLDivElement} root black screen
     */
    blackScreenNode;

    /**
   * @type{HTMLVideoElement} root black screen
   */
    videoNode;

    /**
     * @type {String}
     */
    pagePathname;


    /**
     * @type{boolean}
     */
    isPageBuildLaunched = false;

    /**
     * @type{Object}
     */
    page = null;

    constructor(pagePathname) {
        this.pagePathname = pagePathname;
    }


    play() {
        
        this.videoNode = document.createElement("video");
        this.videoNode.classList.add("welcome-screen");
        this.videoNode.setAttribute("autoplay", '');
        this.videoNode.setAttribute("playsinline", '');
        this.videoNode.setAttribute("muted", 'muted');

        let sourceNode = document.createElement("source");
        sourceNode.setAttribute("src", "assets/videos/introVideo02.mov");
        sourceNode.setAttribute("type", "video/mp4");
        this.videoNode.appendChild(sourceNode);

        /*
        <video controls autoplay>
            <source src="grazie.mp4"></source>
        </video>
        */

        document.body.appendChild(this.videoNode);

        this.videoNode.muted = true; // without this line it's not working although I have "muted" in HTML
        this.videoNode.play();


        let _this = this;
        this.videoNode.oncanplay = function () {
            if (!_this.isPageBuildLaunched) {
                import(_this.pagePathname).then(module => {
                    _this.page = module.WEB_PAGE;
                    _this.page.build();
                }).catch(err => console.log(err));
                _this.isPageBuildLaunched = true;
            }
        };

        this.videoNode.onended = function () {
            if (_this.page != null) {
                _this.page.show();
            }
            _this.hide();
        };
    }

    hide() {
        this.videoNode.classList.add("welcome-screen-fade-out");
        setTimeout(() => { document.body.removeChild(this.videoNode); }, 1000);
    }

}