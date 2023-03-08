
import { page, header, slide, footer } from './aero/aero.js';

export const WEB_PAGE = page([
    header({
		logo : "graphics/alphaventor-logo-512x256px.png",
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
        theme: "dark", background: "grey128",
       	title: `Architecture B`,
        subtitle: `Versatile <b>Point-to-Point</b> logistics, H2-backed, with best in
        class efficiency`,
        paragraph: `With a net payload of more than 4.2 tons and loading volume of
        more than 24 m3, Octofan freighter is a game changer in logistics.`,
        asset: "assets/architectures/turbocompressor-arch-B.png"
    }),
    slide("prime", {
        theme: "dark", background: "grey64",
        title: `Architecture C`,
        subtitle: `Versatile <b>Point-to-Point</b> logistics, H2-backed, with best in
        class efficiency`,
        paragraph: `With a net payload of more than 4.2 tons and loading volume of
        more than 24 m3, Octofan freighter is a game changer in logistics.`,
        asset: "assets/architectures/turbocompressor-arch-C.png"
    }),
    slide("prime", {
        theme: "light", background: "grey128",
        title: `Architecture D`,
        subtitle: `Versatile <b>Point-to-Point</b> logistics, H2-backed, with best in
        class efficiency`,
        paragraph: `With a net payload of more than 4.2 tons and loading volume of
        more than 24 m3, Octofan freighter is a game changer in logistics.`,
        asset: "assets/architectures/turbocompressor-arch-D.png"
    }),
     slide("prime", {
        theme: "dark", background: "grey64",
       	title: `Architecture E`,
        subtitle: `Versatile <b>Point-to-Point</b> logistics, H2-backed, with best in
        class efficiency`,
        paragraph: `With a net payload of more than 4.2 tons and loading volume of
        more than 24 m3, Octofan freighter is a game changer in logistics.`,
        asset: "assets/architectures/turbocompressor-arch-E.png"
    }),
    slide("prime", {
        theme: "light", background: "white",
        title: `Meet the new truck`,
        subtitle: `Versatile <b>Point-to-Point</b> logistics, H2-backed, with best in
        class efficiency`,
        paragraph: `With a net payload of more than 4.2 tons and loading volume of
        more than 24 m3, Octofan freighter is a game changer in logistics.`,
        asset: "assets/architectures/turbocompressor-arch-A.png"
    }),
 slide("prime", {
        theme: "light", background: "white",
        title: `Streamlined supply chain`,
        subtitle: `Fewer transloadings, fewer dependencies mean stronger, more reliable deliveries`,
        asset: "assets/applications/cases/use-case-cargo-low.png"
    }),
    slide("prime", {
        theme: "dark", background: "pic:assets/backgrounds/offshore-wind-1.jpg",
        title: `The missing Link`,
        subtitle: `Flying offshore LH2 tanker. Next stop: gas station`,
        paragraph: `H2 is emerging as the best vector to bring back to shore the
        massive power of offshore wind. Here comes the first eVTOL LH2 tanker
        that offers a direct link between offshore wind farms and final
        consumer.`,
        asset: "assets/aircrafts/tanker/render0x02-low.png"
    }),
 slide("prime", {
        theme: "light", background: "white",
        title: `Self-turbocharged H2 scaling-up`,
        subtitle: `By bringing a convenient way of transporting H2, Octofan closes the H2 cycle and 
		empowers a whle new economy`,
        asset: "assets/applications/cases/use-case-tanker-low.png"
    }),
    slide("prime", {
        theme: "dark", background: "pic:assets/backgrounds/background-twilight-low.png",
        title: `Point to point Hydrogen fuel Delivery`,
        subtitle: `Unmatchable efficiency`,
        paragraph: `Direct delivery appears as the best option for fast, efficient, losses-reducing  
        shipment to the gas station.`,
        asset: "assets/applications/hsw/gas-station-refilled-03-low.png"
    }),
    slide("prime", {
        theme: "dark", background: "black",
        metrics: [
            {
                number: "3.3", unit: "€/kg",
                parameter: "LH2 fuel distributed",
            },
            {
                number: "1.02", unit: "€/L",
                parameter: "Equivalent Price of fuel at the pump (= energy content as 1L of Diesel). Without taxes. ",
            },
            {
                number: "0.60", unit: "€/L",
                parameter: "Engine efficiency corrected",
            }
        ]
    }),
    slide("prime", {
        theme: "light", background: "pic:assets/backgrounds/wild-coast-low.jpg",
        title: `Untouched landscapes`,
        subtitle: `Heavy duty eVTOL only require light infrastructures`,
        paragraph: `Imagine beautiful landscapes without the overwhelming road,
        rails, airports, docks infrastructure. Imagine those spaces left
        untouched. But imagine them with vibrant economic activities.`,
        asset: "assets/aircrafts/bus/render0x02-low.png",
    }),
 slide("prime", {
        theme: "light", background: "white",
        title: `Faster/Smoother commuting`,
        subtitle: `Spend less time in transportation, relax while seeing the city from above.`,
        asset: "assets/applications/cases/use-case-shuttle-low.png"
    }),
    footer({}),
]);