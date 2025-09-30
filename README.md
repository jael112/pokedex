Pokédex con PokeAPI

Una aplicación web construida con React + Vite + TailwindCSS que consume la PokeAPI
 para mostrar una Pokédex interactiva.
Incluye búsqueda por nombre o ID, paginación, tarjetas visuales de Pokémon y un modal con detalles centrados y estilizados.

Tecnologías utilizadas

React 18 + Vite → frontend rápido y modular.

TailwindCSS 3.x → estilos utilitarios y responsivos.

PokeAPI → datos públicos de Pokémon (sprites, stats, tipos, etc).

ESLint → buenas prácticas y linting.

Custom hooks → búsqueda con useDebounced.

Funcionalidades

Listado de Pokémon con paginación (“Cargar más”).

Buscador por nombre o número de Pokédex.

Tarjetas de Pokémon con imagen, número e información básica.

Modal de detalles con:

Imagen oficial animada con efecto flotante.

Tipo(s) de Pokémon con chips estilizados por color.

Altura, peso y habilidades.

Barras de stats animadas y centradas.

Fondo con blur y spotlights de color.

Estilos modernos con Tailwind y animaciones personalizadas.

Instalación y uso
Clona el repositorio e instala dependencias:

git clone https://github.com/jael112/pokedex
cd pokedex
npm install

Ejecuta en desarrollo:

npm run dev
