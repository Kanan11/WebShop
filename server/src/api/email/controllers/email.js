
module.exports = {
    async sendEmail(ctx) {
      const { to, subject, text } = ctx.request.body;
      try {
        console.log('teeeeeeeeestttt')
        await strapi.plugins.email.services.email.send({
          to,
          from: 'sender@example1.com',
          subject,
          text,
        });
        // second variant
        await strapi.plugins['email'].services.email.send({
            to: 'valid email address',
            from: 'your verified email address', //e.g. single sender verification in SendGrid
            cc: 'valid email address',
            bcc: 'valid email address',
            replyTo: 'valid email address',
            subject: 'The Strapi Email plugin worked successfully',
            text: 'Hello world!',
            html: 'Hello world!',
          })
        ctx.send({ message: 'Email sent successfully' });
      } catch (error) {
        ctx.throw(400, `Failed to send email: ${error}`);
      }
    },
  };
  