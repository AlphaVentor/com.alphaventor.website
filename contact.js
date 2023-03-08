
import { page, header, slide, footer } from './aero/aero.js';

export const WEB_PAGE = page([
    header({ 
		logo : "graphics/logo.png",
        menus: ["Home", "Technology", "Applications", "Team", "Contact"],
        hrefs: ["/index.html", "/technology.html", "/applications.html", "/team.html", "/contact.html"],
        selected: "Contact" }),
    slide("prime", {
        theme: "light", background: "pic:assets/backgrounds/industry.jpg",
        title: `Contact`,
        paragraph: `Write us at contact@octofan.com`
    }),
    footer({}),
]);