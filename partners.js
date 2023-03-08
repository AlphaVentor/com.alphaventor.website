
import { page, header, slide, footer, deck } from './aero/aero.js';

export const WEB_PAGE = page([
    header({
		logo : "graphics/alphaventor-logo-512x256px.png",
        menus: ["Home", "Products", "Technology", "Partners", "Contact"],
        hrefs: ["/index.html", "/products.html", "/technology.html", "/partners.html", "/contact.html"],
        selected: "Partners"
    }),
    slide("prime", {
        theme: "dark", background: "black",
        title: "Muliti-discplinary team",
        paragraph: "People from different horizons, united around a vision",
    }),
    deck({
        cards: [
             {
                name: "Pierre CONVERT", 
                photo: "assets/team/Pierre_CONVERT.jpg", 
                role: "Founder, Partner & CEO",
                bio: `Engineer Ecole Polytechnique, Corps des Ponts et Chaussées, 
                Founder of several companies in the fields of technology and energy.`
            }
        ]
    }),
    footer({}),
]);