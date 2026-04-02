# Prueba Técnica - Rick and Morty App

Aplicación web desarrollada con Next.js y React para explorar personajes de Rick and Morty, marcar favoritos y mantener ese estado sincronizado con una base local usando json-server.

## Descripción General Del Proyecto

El proyecto consume la API pública de Rick and Morty para listar personajes en una interfaz responsive. Además, implementa una capa de estado con Zustand para gestionar favoritos con persistencia local.

Características principales:

- Listado de personajes con búsqueda.
- Vista de detalle de personaje seleccionado.
- Sistema de favoritos con persistencia en db.json.
- Evita duplicados en favoritos y mantiene sincronía UI/BD.
- Pruebas unitarias con Vitest y Testing Library.

## Stack Tecnológico

- Next.js
- React
- TypeScript
- Zustand
- Axios
- json-server
- Vitest + Testing Library

## Instrucciones Para Levantar El Proyecto

1. Instalar dependencias.

```bash
npm install
```

2. Levantar la base local (json-server).

```bash
npx json-server --watch db.json --port 3001
```

3. En otra terminal, levantar la app.

```bash
npm run dev
```

4. Abrir en navegador.

- http://localhost:3000

## Instrucciones Para Correr Pruebas Unitarias (Mínimo Requerido)

Con el proyecto instalado, ejecutar:

```bash
npm run test
```

## ¿Qué Es Lo Que Más Me Gustó De Mi Desarrollo?
Me gustó especialmente combinar una temática que me motiva con decisiones técnicas reales. Disfruté diseñar una UI con identidad visual propia y, al mismo tiempo, resolver la lógica de negocio de favoritos con persistencia, sincronización entre estado global y base local, y cobertura de pruebas unitarias.


## Si Hubiera Tenido Más Tiempo, ¿Qué Habría Mejorado O Qué Más Habría Hecho?
Habría profundizado en la experiencia móvil para dejarla al mismo nivel que desktop: ajustar mejor la densidad visual de las cards, pulir spacing y scroll en pantallas pequeñas.


## Pain Point O Bug Encontrado Y Cómo Lo Solucioné
Pain Point: En mobile, las cards se recortaban y en algunos breakpoints parecían sobrepuestas. Además, en favoritos se presentaban duplicados porque la base local generaba IDs distintos por registro.

Solución: Reorganicé los estilos responsivos (ancho de card, padding horizontal y grid en móvil) para que cada card se adaptara correctamente al espacio disponible sin desbordes.

