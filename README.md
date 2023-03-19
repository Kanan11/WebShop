# WebShop
React (TypeScript), Strapi (Stripe and Klarna)

cd client
yarn create react-app . --template typescript
or 
npx create-react-app . --template typescript

cd server
npx create-strapi-app .

npm run develop
│ http://localhost:1337/admin │




npm i --save-dev @strapi/strapi

## how to create Custom Stripe plugin in to Strapi

first create this files
server/plugins/stripe/index.js
server/plugins/stripe/package.json
npm install

then create server/config/plugins.js
and enable this stripe plugin  
