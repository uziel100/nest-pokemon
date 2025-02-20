<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

Este proyecto es un ejemplo de una API REST con NestJS y TypeORM. La API permite realizar operaciones CRUD sobre una entidad de usuarios.

## Ejecutar en desarrollo

1. Clone el repositorio
2. Ejecutar

```bash
$ npm install
```

3. Tener Nest CLI instalado

```bash
$ npm i -g @nestjs/cli
```

4. Levantar la base de datos con docker

```bash
$ docker-compose up -d
```

5. Clonar el archivo `.env.example` y renombrarlo a `.env`
6. LLenar las variables de entorno en el archivo `.env`
7. Ejecutar la aplicación

```bash
$ npm run start:dev
```

8. Reconstruir la base de datos con la semilla

```bash
$ http://localhost:3000/api/seed
```

# Production build

1. Crear el archivo `.env.production` y llenar las variables de entorno
2. Crear la imagen de docker

```bash
$ docker-compose -f docker-compose.prod.yaml --env-file .env.production up -d --build
```
