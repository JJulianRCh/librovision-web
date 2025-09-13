This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Sitio Web: Libro Visión

El proposito de este sitio web es el de poder compartir reseñas de libros con los dema con tal de
de que los usuarios puedan descubrir otras obras literarias de su gusto.

## Entrar como Admin

Para entrar como administrador ingrese los siguientes datos en el login:

- username: admin2025
- email: admin@email.com
- password: accessAdmin2025

## Framework
El framework utilizado para este proyecto fue "nextjs" en fullstack

## Dependencias utilizadas

- bcrypt: ^6.0.0
- jsonwebtoken: ^9.0.2
- mongodb: ^6.19.0

# Instalacion

Clone el repositorio del proyecto

``` bash
git clone https://github.com/JJulianRCh/librovision-web.git

cd librovision
```
Instale las dependencias necesarias

``` bash
npm i bcrypt jsonwebtoken mongodb
```

- Debe tener un archivo .env que contenga lo siguiente

```ini
MONGODB_URI = "TU_CLUSTER_DE_MONGODB_CLOUD"
JWT_SECRET = "TU_SECRET_PROPIO"
```

## Configuracion de MONGODB

- En mongodb cloud tenga un cluster y base de datos para el proyecto
- Dentro de ellas debe crear 2 colecciones "users" y "bookreviews"
- Las colecciones tienen la siguiente estructuras

1. users
```json
{
    "_id": "ObjectId",
    "username": "string",
    "email": "string",
    "password": "string (hashed)",
    "role": "string (user | admin)"
}
```

2. bookreviews
```json
{
    "_id": "ObjectId",
    "title": "string",
    "author": "string",
    "review": "string",
    "rank": "number (0-5)",
    "userId": "ObjectId"
}
```

## Desplegar el proyector

```bash
npm i && npm run build && npm run start
```

A continuacion viene documentacion creada por nextjs para su ejecucion.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
