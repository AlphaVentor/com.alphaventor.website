const nodemailer = require('nodemailer')
    //On se connecte au transporter avec différentes options en fonction de l'environnement
let transporter = null
if (process.env.NODE_ENV === 'prod') {
    transporter = nodemailer.createTransport({
        host: 'your host',
        port: 'your port',
        secure: false,
        auth: {
            user: 'the user of smtp',
            password: 'the password',
        },
    })
} else {
    transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    })
}
// Fonction asynchrone pour attendre le retour
async function sendMail() {
    const mailOptions = {
        from: 'from@email.fr',
        to: 'to@email.fr',
        subject: 'Test email pour le tutoriel',
        text: "Voici le texte de l'email de test", //Le contenu de la version texte
        html: "<h1>HTML</h1><p>Voici le texte dans un paragraph pour l'email de test</p>", // Le contenu de la version HTML
    }
    await transporter.sendMail(mailOptions)
}
//On lance l'email
sendMail()