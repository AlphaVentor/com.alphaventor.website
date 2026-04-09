
import { AERO_WEB_PAGE } from "./AeroWebPage.js";
import { AeroWebPage } from "./AeroWebPage.js";

import Hls from 'https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.mjs';

export class HeroVideo extends HTMLElement {


	/**
	* Static Initialization
	* @param {AeroWebPage} page 
	*/
	static init0(page) {
		customElements.define("hero-video", HeroVideo);
		customElements.define("hero-video-box", HeroVideoBox);
		customElements.define("hero-video-title", HeroVideoTitle);

		/* CSS requirements */
		page.requireCssStylesheet("/aero-engine-v3/HeroVideo.css");
	}


	/** @type {HTMLElement } */
	sectionNode;

	/**
	 * 
	 * @param {HTMLElement} sources 
	 */
	constructor() {
		super();



		/* build nodes */

		/*
		 <video loop autoplay muted class="VideoMain">
		<source src="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
	</video>
	*/

		this.videoNode = document.createElement("video");
		this.videoNode.classList.add("aero-video");
		this.videoNode.setAttribute("loop", "");
		this.videoNode.setAttribute("autoplay", "");
		this.videoNode.setAttribute("muted", "");
		this.videoNode.setAttribute("playsinline", "");


		this.videoSrc = this.getAttribute("src");

		if (this.videoSrc) {

			this.sourceNode = document.createElement("source");
			this.sourceNode.src = this.videoSrc;
			this.sourceNode.setAttribute("type", "application/x-mpegURL");
			this.videoNode.appendChild(this.sourceNode);
			this.appendChild(this.videoNode);

		}

		if (this.videoSrc && Hls.isSupported()) {
			const hls = new Hls({
				autoStartLoad: true,           // important
				startLevel: -1,               // let it choose best quality
				maxBufferLength: 8,
			});

			hls.loadSource(this.videoSrc);
			hls.attachMedia(this.videoNode);


			const isLoadedCallback = AERO_WEB_PAGE.appendDependency();


			// Trigger play when manifest is ready
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				isLoadedCallback();
			});

			// Fallback error handling
			hls.on(Hls.Events.ERROR, (_event, data) => {
				if (data.fatal) {
					console.error('HLS fatal error:', data);
				}
			});

		} else if (this.videoNode.canPlayType('application/vnd.apple.mpegurl')) {
			// Native HLS support (Safari / iOS)
			this.videoNode.src = videoSrc;
			this.videoNode.play().catch(err => console.log('Autoplay blocked:', err));
		}

	}


	run() {
		this.videoNode.play().catch(err => {
			console.log('Autoplay prevented:', err);
			// Optional: show a "Tap to play" button here
		});
	}


	html_getNode() {
		return this;
	}

	/**
	 * 
	 */
	render() {
	}

}




export class HeroVideoBox extends HTMLElement {

	/**
	 * 
	 */
	constructor() {
		super(); /* base HTML element */
	}
}


export class HeroVideoTitle extends HTMLElement {

	/**
	 * 
	 */
	constructor() {
		super(); /* base HTML element */
	}
}
