
import { page, header, slide, footer } from './aero/aero.js';


export const WEB_PAGE = page([
    header({ 
        menus: ["Home", "Technology", "Applications", "Team", "Contact"],
        hrefs: ["/index2.html", "/technology.html", "/applications.html", "/team.html", "/contact.html"],
        selected: "Home" }),
    slide("prime", {
        theme: "dark", background: "black",
        title: `Say Hello to <span class="emphasis">OCTOFAN</span>`,
        subtitle: `The world's first H2-powered multirole heavy duty drone with
        switchable nacelles`,
        asset: "assets/aircrafts/freighter/render0x07-low.png"
    }),
    slide("prime", {
        theme: "light", background: "pic:assets/backgrounds/sky03-low.jpg",
        title: `One Machine, Thousands of Applications`,
        subtitle: `When aerospace embraces platform paradigm`,
        asset: "assets/aircrafts/fleet/render0x03-low.png"
    }),
    slide("paragraph", {
        theme: "light", background: "white",
        subtitle: `The case for Factoring`,
        paragraph: `Multi-copters already proved their ubiquitous nature, with
        applications range growing everyday. But when it comes to develop
        the ultimate heavy-duty passengers-enabled best-in-class energy
        efficient drone, factoring becomes the obvious path: one carrier
        with extended capabilities, serving as a platform to enpower
        thousands of third-parties applications that come right under the
        machine as dedicated nacelles.`,
    }),
    slide("prime", {
        theme: "dark", background: "black",
        metrics: [
            {
                number: "6000", unit: "kg",
                parameter: "Max nacelle weight",
            },
            {
                modifier: ">", number: "12", unit: "h",
                parameter: "Flight time (ECO MODE 250km/h, full load)",
            },
            {
                modifier: ">", number: "3000", unit: "km",
                parameter: "Range (ECO MODE 250 km/h, full load)",
            },
            {
                modifier: ">", number: "450", unit: "km/h",
                parameter: "Max speed"
            }
        ]
    }),
    slide("prime", {
        theme: "dark", background: "pic:assets/backgrounds/london-octofan-env01.jpg",
        title: `Downtown airport`,
        subtitle: `Versatile <b>Point-to-Point</b> shuttle that ease commuters life`,
        paragraph: `With a 24 seats and an ability to land vertically on natural
        surfaces, Octofan enables unseen city integration.`,
        asset: "assets/aircrafts/bus/render0x05-low.png"
    }),
    footer({}),
]);