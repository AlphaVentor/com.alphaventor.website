
import { page, header, slide, footer, movie, grid, gridCard } from './aero/aero.js';


export const WEB_PAGE = page({
    hasCookiesModalBox : true,
    header: header({
        theme: "dark",
        menus: ["Platform", "Engineering", "Stack", "Contact"],
        hrefs: ["/platform.html", "/engineering.html", "/stack.html", "/contact.html"],
        selected: "Engineering"
    }),
    elements: [
        slide("prime", {
            theme: "dark", background: "black",
            title: `<b>Built-in</b> engineering capabilities`,
            subtitle: `The Alphaventor platform came with efficient libraries to power your engineering app.`,
            paragraph: `Libraries enables complex applications capabilities out of the boxes, greatly 
            reducing the development time and platform integration`,
            asset: "assets/turbos/SiTyphoon-config-low.png"
        }),
        slide("prime", {
            theme: "dark",
            background: "pic:assets/backgrounds/skies-background-01-low.jpg",
            title: `Qx-ng-aircrafts`,
            subtitle: `Blade element analysis: A powerful tool for the low-latitude economy`,
            paragraph: `Blade element analyis is especially powerful when it comes to calculate quickly 
            -and accurately- the power/torque of propellers (whether thrusters or pushers) for the analysis
            of take-off capabilities, entire flight analysis. They offer near instant alternative to CFD and 
            can therefore be easily integrated into repeatable routines that require speed and stability.`,
            asset: "assets/aircrafts/evtol-taking-off05-low.png"
        }),
        slide("prime", {
            theme: "light",
            background: "white",
            title: `Thermodynamics`,
            subtitle: `The foundation layer for process engineering`,
            paragraph: `Being able to compute the thermodynamics properties of process gas (water, steam, natural gas, 
                refrigerants, thermal oil) is at the heart of many common simulations of equipment. It is more specifically 
                useful when it comes to predict the behaviour of fluid handling equipement in a specific customer case, be it a 
                pump, a valve, a turbine or a compressor.`,
            asset: "assets/applications/power-plant00.png",
        }),
        slide("prime", {
            theme: "light",
            background: "pic:assets/applications/meshing.png",
            title: `Thermodynamics`,
            subtitle: `The foundation layer for process engineering`,
            paragraph: `Being able to compute the thermodynamics properties of process gas (water, steam, natural gas, 
                refrigerants, thermal oil) is at the heart of many common simulations of equipment. It is more specifically 
                useful when it comes to predict the behaviour of fluid handling equipement in a specific customer case, be it a 
                pump, a valve, a turbine or a compressor.`
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
           
            title: `Opening a new area for eVTOL`,
            subtitle: `Thrust up to 46kN`,
            
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