
import { page, header, slide, footer, movie, grid, gridCard } from './aero/aero.js';


export const WEB_PAGE = page({
    hasCookiesModalBox : true,
    header: header({
        logo: "assets/logos/logo-small-light.png",
        menus: ["Home", "Applications", "Technology", "Contact"],
        hrefs: ["/index2.html", "/applications.html", "/technology.html", "/contact.html"],
        selected: "Home"
    }),
    elements: [
        movie("std", {
            sequence : "assets/sequences/alpha-movie0.mp4"
        }),
        slide("prime", {
            theme: "light", background: "white",
            title: `Showcase your products`,
            subtitle: `Leverage the power of the <span class="emphasis">AlphaVentor</span> 
            platform to give your client a digital twin of your products`,
            asset: "assets/slides/slide00.png"
        }),
        grid("light", {
            theme: "light", 
            background: "white",
            cards : [
                gridCard("light", {
                    theme: "light", 
                    background: "pic:assets/images/casing00.png",
                }),
                gridCard("light", {
                    theme: "light", 
                    background: "pic:assets/aircrafts/evtol-cruise-low.png",
                }),
                gridCard("light", {
                    theme: "light", 
                    background: "blue",
                }),
                gridCard("light", {
                    theme: "light", 
                    background: "white",
                })
            ]
        }),
        slide("prime", {
            theme: "dark", background: "black",
            title: `Say Hello to <span class="emphasis">SiTy8000u</span> "Silent Typhoon"`,
            subtitle: `The world's first heavy duty eVTOL propeller`,
            asset: "assets/turbos/SiTyphoon-config-low.png"
        }),
        slide("prime", {
            theme: "dark", background: "black",
            metrics: [
                {
                    number: "4600", unit: "kg",
                    parameter: "Max Take-off thrust",
                },
                {
                    modifier: ">", number: "450", unit: "km/h",
                    parameter: "Max speed"
                }
            ]
        }),
        slide("prime", {
            theme: "dark",
            background: "pic:assets/backgrounds/skies-background-01-low.jpg",
            title: `Opening a new area for eVTOL`,
            subtitle: `Thrust up to 46kN`,
            asset: "assets/aircrafts/evtol-taking-off05-low.png"
        }),
        slide("paragraph", {
            theme: "dark", background: "pic:assets/capabilities/CFD-Screenshot-02.jpg",
            subtitle: `CFD for advanced turbo-units`,
            paragraph: `With a comprehensive know-how in aerodynamics, AlphaVentor is able to support custom turbomachines development`,
        }),
        slide("prime", {
            theme: "dark", background: "pic:assets/backgrounds/london-octofan-env01.jpg",
            title: `Downtown airport`,
            subtitle: `Versatile <b>Point-to-Point</b> Build versatile aircraft`,
            paragraph: `Silent Typhoon propeller enables advanced aircraft like Octofan.`,
            asset: "assets/aircrafts/evtol-cruise-low.png"
        }),
    ],
    footer: footer()
});