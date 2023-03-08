
import { page, header, slide, footer, deck } from './aero/aero.js';

export const WEB_PAGE = page([
    header({
		logo : "graphics/alphaventor-logo-512x256px.png",
        menus: ["Home", "Technology", "Applications", "Partners", "Contact"],
        hrefs: ["/index.html", "/technology.html", "/applications.html", "/partners.html", "/contact.html"],
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
            },
            {
                name: "Shan JIANG", 
                photo: "assets/team/Shan_JIANG.jpg", 
                role: "Founder, Partner & Ground infrastructure & Artistic director",
                bio: `Architect and designer, founder of the architecture firm SJA, vice-president of the 
                French Association for Economic and Cultural Development of Shanghai.`
            },
            {
                name: "Pierre ROSSINI", 
                photo: "assets/team/Pierre_ROSSINI.jpg", 
                role: "Founder, Partner & COO",
                bio: `Founder of several companies in various fields, former administrative director of a Luxembourg company, former IT and general services director, former deputy general secretary of an association with a political purpose.`
            },
            {
                name: "Laurent DAUDÉ", 
                photo: "assets/team/Laurent_DAUDE.jpg", 
                role: "Executive Advisor",
                bio: `Senior Consultant, 
                Consulting in Strategic & Operational Management, 
                Management of Transversal Strategies.`
            },
            {
                name: "Jean-Luc DUFOUR", 
                photo: "assets/team/Jean-Luc_DUFOUR.png", 
                role: "Executive Advisor",
                bio: `Senior consultant, creation, takeover and corporate governance, finance and strategy consulting.`
            },
            {
                name: "Hélène PICHON", 
                photo: "assets/team/Helene_PICHON.jpg", 
                role: "Executive Advisor",
                bio: `Reserve Colonel (French Air Force), Former Director of Institutional Relations of the CEPS-OING.`
            },
            {
                name: "Philippe LACROUTE", 
                photo: "assets/team/Philippe_LACROUTE.jpg", 
                role: "Executive Advisor",
                bio: `Major Airline Captain, Reserve Colonel (Air Transport Gendarmerie),Vice-President of ‘Aéro-Club de France’.`
            },
            {
                name: "Richard VALENTI", 
                photo: "assets/team/Richard_VALENTI.jpg", 
                role: "Executive Advisor",
                bio: `More than 30 years of experience as a senior executive in leading financial institutions 
                (Groupe BPCE, Generali France, BNPP Assurance, BNPP-Korean Asset Management, BNPP Australia).`
            },
            {
                name: "Denis BAUPIN", 
                photo: "assets/team/Denis_BAUPIN.jpg", 
                role: "Advisor",
                bio: `Senior consultant in public energy and mobility policy, former Vice-President of the French National Assembly, Engineer Centrale Paris.`
            },
            {
                name: "Emmanuel DAVIDSON", 
                photo: "assets/team/Emmanuel_DAVIDSON.png", 
                role: "Advisor",
                bio: `Experienced aviation executive with an international network in the industry,
                General Management, Business Development and Marketing.`
            },
            {
                name: "Michel EMELIANOFF", 
                photo: "assets/team/Michel_EMELIANOFF.jpg", 
                role: "Advisor",
                bio: `Former CEO of Alcatel-Lucent Entreprise, 
                former president of a division of the Cobham Group 
                (aeronautics and embedded electronics), Engineer Centrale Paris.`
            },
            {
                name: "Jack KRINE", 
                photo: "assets/team/Jack_KRINE.jpg", 
                role: "Advisor",
                bio: `Retired Colonel (French Air Force), former fighter pilot and air combat instructor in the French Air Force, 
                former solo leader of the Patrouille de France, more than 20,000 flight hours on 42 types of aircraft, 
                flight director of more than 400 air shows, 
                officer of the Legion of Honor, officer of the National Order of Merit, Medal of Aeronautics.`
            },
            {
                name: "Jean-François MINNE", 
                photo: "assets/team/Jean-Francois_MINNE.jpg", 
                role: "Advisor",
                bio: `Senior communications consultant, 
                former CEO and board member of international advertising groups (TBWA, DMM Masius-D’Arcy).`
            },
            {
                name: "Sylvie PERRIN", 
                photo: "assets/team/Sylvie_PERRIN.jpg", 
                role: "Advisor",
                bio: `Lawyer in a famous international law firm, Founder of the think tank ‘La Plateforme Verte’ (‘The Green Platform’).`
            },
            {
                name: "Marc TEYSSIER d'ORFEUIL", 
                photo: "assets/team/MT.jpg", 
                role: "Advisor",
                bio: `Reserve Colonel (Gendarmerie), Founder and President of Com'Publics, Agency specialized in public affairs and institutional communication, Industrial Development Consulting.`
            }
        ]
    }),
    footer({}),
]);