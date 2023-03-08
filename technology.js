
import { page, header, slide, footer } from './aero/aero.js';

export const WEB_PAGE = page([
    header({ 
		logo : "graphics/logo.png",
        menus: ["Home", "Technology", "Applications", "Partners", "Contact"],
        hrefs: ["/index.html", "/technology.html", "/applications.html", "/partners.html", "/contact.html"],
        selected: "Technology" }),
    slide("prime", {
        theme: "dark", background: "black",
        title: `Incredible dynamics`,
        subtitle: `Efficient Take-off to cruise`,
        paragraph: `Efficient transition from take-off to cruise mode is at the
        heart of the Octofan design. Great care have improve aerodynamics
        when both ascending & cruising, achieve low disk loading in compact
        shape format, reduce downwash on hovering (compared to other
        tilt-rotors on the market), etc.`,
        asset: "assets/aircrafts/ascending/octofan-ascending-low.png"
    }),
    slide("prime", {
        theme: "light", background: "white",
        title: `Disk loading`,
        subtitle: `Octofan exhibits optimal form-factor`,
        paragraph: `Octofan form factor is a subtle compromise between low disk
        loading enabling high efficiency and tight outline to allow for
        seamless integration on ground.`,
        asset: "assets/aircrafts/bus/bus03-above-low.png",
    }),
    footer({}),
]);