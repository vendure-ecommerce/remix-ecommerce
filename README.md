# Remix + Vendure Demo

![logo](./app/images/remix-vendure.webp)

This is a proof-of-concept demo demonstrating full-stack open-source headless commerce, with a [Remix](https://remix.run) storefront powered by [Vendure](https://www.vendure.io). It is based on the [work of Jacob Ebey](https://github.com/jacob-ebey/remix-ecommerce) which in turn is an adaptation of the [Next.js Commerce](https://github.com/jacob-ebey/remix-ecommerce) project. 

## Development

Copy `.env.example` to `.env`. Update the Vendure API url if you need to, e.g. to point it at a local
Vendure instance.

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

This repo is set up to deploy to Netlify.
