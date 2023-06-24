"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCreatedAccount = exports.sendMail = exports.EMAIL_FROM = void 0;
exports.EMAIL_FROM = 'minhhoangzeno@gmail.com';
async function sendMail(Email, { to, from, subject, text, html, attachments, }) {
    return new Promise((resolve, reject) => {
        Email.send({
            to: to,
            from: from || exports.EMAIL_FROM,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments,
        }, function (err, mail) {
            err ? reject(err) : resolve(mail);
        });
    });
}
exports.sendMail = sendMail;
async function sendCreatedAccount(Email, info) {
    const html = `<p> Bonjour</p>
                      <p>Votre compte a été créé par votre entreprise sur la plateforme numérique Suvi Tracking. Vos identifiant et mot de passe sont :</p>
                      <p>- identifiant: ${info.email} </p>
                      <p>- mot de passe : ${info.password}</p>
                      <p>Nous vous invitons à changer votre mot de passe à la 1ère connexion.</p>
                      <p>Merci</p>
                      <p>Cordialement,</p>
                      <p>L’équipe Suvi Tracking.</p>`;
    return sendMail(Email, {
        to: info.email,
        subject: 'Votre compte Suvi Tracking',
        html: html,
    }).catch((error) => {
        console.log(error);
    });
}
exports.sendCreatedAccount = sendCreatedAccount;
//# sourceMappingURL=send-mail.js.map