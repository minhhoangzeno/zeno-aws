"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmResetPassword = exports.sendResetPasswordEmail = void 0;
const constants_1 = require("../constants");
const send_mail_1 = require("./send-mail");
async function sendResetPasswordEmail(Email, info) {
    let url = 'http://localhost:3001';
    // switch (process.env.NODE_ENV) {
    //     case 'production':
    //         url = urlBOProd;
    //         break;
    //     case 'preprod':
    //         url = urlBOPreProd;
    //         break;
    //     case 'staging':
    //         url = urlBOStaging;
    //         break;
    //     case 'develop':
    //         url = urlBODevelop;
    //         break;
    //     default:
    //         url = 'http://localhost:4200';
    // }
    const link = `${url}/reset-password?token=${info.accessToken.id}`;
    const html = `
    <p>************************</p>
    <p><b>Bonjour, ${info.email}</b></p>
      <p>Voici le lien pour réinitialiser votre mot de passe sur l'application Plan de Transport: </p>
    <a href=${link}>Changer le mot de passe</a>
      <p>Bonne journée.</p>
      <p>************************</p>`;
    return (0, send_mail_1.sendMail)(Email, {
        to: info.email,
        subject: constants_1.EmailText.RESET_PASSWORD_TITLE,
        html: html,
    }).catch((error) => {
        console.log(error);
    });
}
exports.sendResetPasswordEmail = sendResetPasswordEmail;
async function sendConfirmResetPassword(Email, info) {
    const html = `<p><b>Bonjour, ${info.email}</b></p>
    <p>Votre mot de passe a été modifié avec succès.</p>
      <p>Cordialement, </p>
      <p>L'équipe Transalliance </p>`;
    return (0, send_mail_1.sendMail)(Email, {
        to: info.email,
        subject: 'Confirmation de changement de mot de passe',
        html: html,
    }).catch((error) => {
        console.log(error);
    });
}
exports.sendConfirmResetPassword = sendConfirmResetPassword;
//# sourceMappingURL=reset-password.js.map