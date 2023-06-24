
export const EMAIL_FROM = 'minhhoangzeno@gmail.com';

export async function sendMail(
    Email: any,
    {
        to,
        from,
        subject,
        text,
        html,
        attachments,
    }: {
        to: string | string[];
        from?: string | string[];
        subject: string | string[];
        text?: string;
        html?: string;
        attachments?: {
            filename: string;
            path: string;
            contentType: string;
        }[];
    },
) {
    return new Promise((resolve, reject) => {
        Email.send(
            {
                to: to,
                from: from || EMAIL_FROM,
                subject: subject,
                text: text,
                html: html,
                attachments: attachments,
            },
            function (err: Error, mail: any) {
      
                err ? reject(err) : resolve(mail);
            },
        );
    });
}


export async function sendCreatedAccount(Email: any, info: any) {
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
