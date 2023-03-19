module.exports = ({ env }) => ({
  // ... other configurations ...

  // enable the plugin by adding it to the plugins array
  plugins: [
    // ... other plugins ...
    {
      name: "stripe",
      enabled: true,
      // ... plugin options ...
    },
  ],
});
