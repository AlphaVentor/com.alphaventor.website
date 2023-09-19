
import { page, header, slide, footer } from './aero/aero.js';

export const WEB_PAGE = page([
    header({ 
		logo : "graphics/alphaventor logo -256px -white gen3.2.png",
        menus: ["Home", "Products", "Technology", "Partners", "Contact"],
        hrefs: ["/index.html", "/products.html", "/technology.html", "/partners.html", "/contact.html"],
        selected: "Contact" }),
    slide("prime", {
        theme: "light", background: "pic:assets/backgrounds/industry.jpg",
        title: `Contact`,
        paragraph: `Write us at contact@alphaventor.com`
    }),
    footer({}),
]);