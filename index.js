const { jsPDF } = require("jspdf");
const path = require('path');
const express = require("express");
const helmet = require("helmet");
const app = express();
app.use(helmet());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    req.originalUrl !== '/' ? res.sendStatus(404) : next();
});

app.get('/', (req, res) => {
    const doc = new jsPDF();
    const myFont = "/Champagne_et_Limousines";
    doc.addFileToVFS("MyFont.ttf", myFont);
    doc.addFont("Champagne_et_Limousines.ttf", "Champagne_et_Limousines", "normal");
    doc.setFont("Champagne_et_Limousines");
    doc.setFontSize(12);
    let date = new Date();
    doc.text(`Jimmy Gaubert\ncontact@truc-bidule.fr\n${date.getFullYear() - (1996)} ans, sans permis`, 5, 10);
    doc.text("Développeur Web et Web Mobile\nMon site : truc-bidule.fr/cv\n\n", 120, 10);
    doc.text("Possédant le titre professionnel de développeur web et web mobile (classé de niveau 5 dans les domaines d'activité 326t),\ninitié aux méthodes agiles, fullstack et pouvant donc travailler sur n'importe quel front technologique d'un projet web,\nje suis à la recherche d'un travail en remote.", 5, 30);
    doc.text("FORMATIONS :\n\nDÉVELOPPEUR WEB ET WEB MOBILE - NIVEAU V\nO'CLOCK - GRANDE ECOLE DU NUMÉRIQUE | 2021\n- Socle ( HTML5 / CSS3 / PHP / JavaScript / SQL )\n- Spécialisation ( ES6 / React / Redux )\n- Projet en groupe ( React / Symfony )\n\nPRÉVENTION ET SECOURS CIVIQUE - NIVEAU I\n\nBREVET D'APTITUDES AUX FONCTIONS D'ANIMATEUR", 5, 60);
    doc.text("EXPÉRIENCES :\n\nSTAGIAIRE - DÉVELOPPEUR WEB - MAMAN EST DEBOUT\nAOUT 2021 - SEPTEMBRE 2021\n2 mois en solo, sans tuteur technique :\n- 2 semaines de conception\n- 1 semaine de développement\n- 1 semaine de veille\n- 4 semaines de développement\n\nSTAGIAIRE - FORMATION PROFESSIONNELLE - PROMOGAMING\nJUIN 2021 - SEPTEMBRE 2021\n1 mois à 5 étudiants :\n- 1 semaine de conception\n- 3 semaines de développement\n\nSTAGIAIRE - TECHNICIEN DE MAINTENANCE INFORMATIQUE \nPC-CLEAN | 2019 \nDEV-CRY | 2017", 5, 150);
    doc.text("TEMPS LIBRE :\n\nAdmin Discord Bénévole\nNorthgard (Shiro Games) | 2022 - Aujourd'hui\nWartales (Shiro Games) | 2022 - Aujourd'hui\n\nModérateur Discord Bénévole\nDune : Spice Wars (Shiro Games) | 2022 - Aujourd'hui\nDarksburg (Shiro Games) | 2020 - Aujourd'hui\n\nHelper Bénévole (IRC, FORUM, IG)\nNostale (GameForge) | 2015 - 2021", 120, 150);
    doc.text("PROFIL :\n\nHARD-SKILLS\nMaîtrise de Git et GitHub\nMaîtrise du terminal Linux\nMaîtrise de Visual Studio Code\n\nSOFT-SKILLS\nRésilence et détermination\nEsprit d'équipe et médiation\nTrès grande curiosité !\n\nLANGAGES\nFrançais C2, Anglais B2, Breton A1,\nJS, SQL, PHP, HTML, CSS, COW...", 120, 60)
    doc.save("cv-jimmy-gaubert.pdf");
    res.download(path.join(__dirname, 'cv-jimmy-gaubert.pdf'), (err)=>{console.log(err)});
});
app.listen(8888, '127.0.0.1');