module.exports = ({ env }) => ({
  // ... other configurations ...

  // enable the plugin by adding it to the plugins array
  plugins: [
    // ... other plugins ...
    {
      name: 'email',
      enabled: true,
      options: {
        provider: 'smtp',
        providerOptions: {
          host: env('SMTP_HOST'),
          port: env('SMTP_PORT'),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          secure: true,
          username: env('SMTP_USERNAME'),
          password: env('SMTP_PASSWORD'),
          rejectUnauthorized: true,
          requireTLS: true,
          connectionTimeout: 5000,
        },
        settings: {
          defaultFrom: env('EMAIL_DEFAULT_FROM'),
          defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO'),
        },
      },
    },
    {
      name: "stripe",
      enabled: true,
      // ... plugin options ...
      options: {
        apiKey: env('STRIPE_API_KEY'),
        apiVersion: env('STRIPE_API_VERSION', '2020-08-27'),
      },
    },
  ],
});
