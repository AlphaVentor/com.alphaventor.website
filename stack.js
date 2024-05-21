
import { page, header, slide, footer, movie, grid, gridCard } from './aero/aero.js';


export const WEB_PAGE = page({
    hasCookiesModalBox : true,
    header: header({
        logo: "assets/logos/logo-small-light.png",
        menus: ["Platform", "Engineering", "Stack", "Contact"],
        hrefs: ["/platform.html", "/engineering.html", "/stack.html", "/contact.html"],
        selected: "Stack"
    }),
    elements: [
        slide("prime", {
            theme: "light", background: "white",
            title: `The <b>Complex</b> objects handling made <b>simple</b>`,
            subtitle: `S8 is a one-of-its kind integrated stack for Saas, enabling simple 
            coding and deployment of complex SaaS applications.`,
            paragraph: `Vastly increase your sales performance by providing your team with direct insights of the core business objects. 
            Want to answer to a client on how will the product will perform in its use case? 
            Alphaventor platform is the way.`,
            asset: "assets/logos/S8-stack-logo.png",
            arrangement: "text-down",
            assetAspectRatio : 16/9
        }),
        slide("prime", {
            theme: "light", background: "white",
            title: `<b>Showcase</b> your technical objects <b>anywhere</b>`,
            subtitle: `Enable your customer to deep dive in your products capabilities.`,
            paragraph: `Strong engagement relies on appropriation. By enabling your customers and partners to use your products
            virtually anywhere, you become de facto the reference product.`,
            asset: "assets/slides/slide03.png"
        }),
        slide("prime", {
            theme: "light", background: "white",
            title: `<b>Deliver</b> your technical objects along the <b>integration chain</b>`,
            subtitle: `Gain value beyond your product inherent value.`,
            paragraph: `Delivering a great product is an achievement. Seamlessly integrate in your customers assemblies is 
            paramount, like going from good to unavoidable.`,
            asset: "assets/slides/slide04.png"
        }),
        slide("prime", {
            theme: "light", background: "white",
            title: `Stay in control`,
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