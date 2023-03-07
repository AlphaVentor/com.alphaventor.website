import { AeroDeck } from "./AeroDeck.js";
import { AeroFooter } from "./AeroFooter.js";
import { AeroHeader } from "./AeroHeader.js";
import { AeroSlide } from "./AeroSlide.js";
import { AeroWebPage } from "./AeroWebPage.js";


export const page = function(props){
	return new AeroWebPage(props);
}

export const header = function(props){
	return new AeroHeader(props);
}

export const slide = function(type, props) {
	return new AeroSlide(type, props);
}

export const deck = function(props) {
	return new AeroDeck(props);
}

export const footer = function(props) {
	return new AeroFooter(props);
}



/*
Utilities
*/

