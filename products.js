
import { page, header, slide, footer } from './aero/aero.js';

export const WEB_PAGE = page([
    header({
        logo: "graphics/alphaventor-logo-512x256px.png",
        menus: ["Home", "Products", "Technology", "Partners", "Contact"],
        hrefs: ["/index.html", "/products.html", "/technology.html", "/partners.html", "/contact.html"],
        selected: "Products"
    }),
    slide("prime", {
        theme: "dark", background: "black",
        title: `Build on this platform`,
        subtitle: `Opening aircraft development to thrird parties`,
        paragraph: `Building on the indredible performance of Octofan, 
        Third-Parties of all horizons can develop dedicated solutions: 
        <li>Fire-fighting</li>
        <li>Emergency post-crisis/catastrophies fast response</li>
        <li>Freight</li>
        <li>Commuting mass passengers transportation</li>
        <li>Liquefied Hydrogen long-range/point-to-point delivery</li>
        <li>Touring</li>
        <li>Racing</li>
        <li>and so much more...</li>
        </ul>`,
        asset: "assets/aircrafts/nake/render0x02-low.png"
    }),
    slide("prime", {
        theme: "dark", background: "grey64",
        title: `Architecture A`,
        subtitle: `Standard RADIAL/RADIAL TURBO-COMPRESSOR`,
        paragraph: `Well-suited for low to moderate expansion ratio on both 
        sides and low to medium mass flows on both expander and compressor side. 
        <ul>
        <li>Air separtion units</li>
<li>Cryogenic</li>
<li>Reversed Brayton</li>
<li>Oil&Gas general duty</li>
		</ul>
        `,
        asset: "assets/architectures/turbocompressor-arch-A.png"
    }),
    slide("prime", {
        theme: "light", background: "white",
        title: `Architecture A Series arrangement`,
        asset: "assets/architectures/turbocompressor-arch-A-series.png"
    }),
    slide("prime", {
        theme: "dark", background: "grey128",
        title: `Architecture B`,
        subtitle: `Standard RADIAL/AXIAL TURBO-COMPRESSOR`,
        paragraph: `Architecture B Turbo-compressor is well-suited for low to moderate compression ratio on compressor side, and it allows for moderate to high pressure ratio on the expander side thanks to the axial turbine wheel. Regarding expander side, supported outlet volume flows can be much higher compared to A arch.
`,
        asset: "assets/architectures/turbocompressor-arch-B.png"
    }),
    slide("prime", {
        theme: "dark", background: "grey64",
        title: `Architecture C`,
        subtitle: `DIRECT DRIVE CENTRIFUGAL COMPRESSOR`,
        paragraph: `High efficiency, high power density Permanent Magnet Direct drive compressor. Well-suited for low to moderate compression ratio on both compressoin sides, this architecture allows multiple –potentially tandem arranged- compression stages each running at its own speed, to achieve signifiant compression ratio for custom process programs, while building on standard blocks.
`,
        asset: "assets/architectures/turbocompressor-arch-C.png"
    }),
    slide("prime", {
        theme: "light", background: "grey128",
        title: `Architecture D`,
        asset: "assets/architectures/turbocompressor-arch-D.png"
    }),
    slide("prime", {
        theme: "dark", background: "grey64",
        title: `Architecture E`,
        asset: "assets/architectures/turbocompressor-arch-E.png"
    }),
    footer({}),
]);