# Cine Plus — Cartelera de cine con React y Vite

Aplicación de una cartelera de cine construida con **React + Vite**. Muestra una película destacada y una lista de ocho películas con imagen, sinopsis, clasificación, valoración y horarios.

El proyecto fue desarrollado siguiendo el Laboratorio 9 de la semana 9: componentes funcionales, JSX, composición y props.

---

## Requisitos previos

- **Node.js 20.19 o superior** (o 22.12 o superior)
- **npm** incluido con Node

Comprobar la versión instalada:

```bash
node --version
```

---

## Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173` (o el puerto que indique Vite).

Para generar y previsualizar la versión de producción:

```bash
npm run build
npm run preview
```

---

## Estructura del proyecto

```
cartelera-cine/
├── index.html                  Punto de entrada HTML; monta #root
├── vite.config.js              Configuración de Vite con el plugin de React
├── package.json                Dependencias y scripts del proyecto
├── ERRORES_TIPICOS.md          Registro de los tres errores de JSX provocados
├── public/
│   └── posters/                Portadas locales de las ocho películas
└── src/
    ├── main.jsx                Renderiza <App /> e importa los estilos globales
    ├── App.jsx                 Compone Header, Hero, MovieList y Footer
    ├── components/
    │   ├── Header.jsx          Nombre del cine y navegación
    │   ├── Hero.jsx            Banner de la película destacada
    │   ├── MovieCard.jsx       Tarjeta individual de una película
    │   ├── MovieList.jsx       Lista de tarjetas recorriendo la cartelera
    │   └── Footer.jsx          Información de contacto y derechos
    ├── data/
    │   └── movies.js           Arreglo con las ocho películas de la cartelera
    └── styles/
        └── index.css           Tokens de diseño y estilos de todos los componentes
```

---

## Componentes y responsabilidades

Cada componente tiene una única responsabilidad y no conoce el origen de los datos: los recibe por props.

| Componente | Responsabilidad | Props | Origen de los datos |
|------------|-----------------|-------|---------------------|
| `Header` | Mostrar el nombre del cine, la navegación y el contador de entradas | `tickets` (número) | `App` mantiene el estado de las entradas |
| `Hero` | Mostrar el banner de la película destacada y el botón "Ver cartelera" | `movie` (objeto película) | `App` le pasa `movies[0]` |
| `MovieList` | Buscar, filtrar y recorrer la cartelera con `.map()`; dibujar una tarjeta por película | `movies` (arreglo), `onBuy` (función) | `App` le pasa el arreglo y la función de compra |
| `MovieCard` | Mostrar la película, permitir elegir horario y confirmar la compra | `movie` (objeto), `onBuy` (función) | `MovieList` le pasa cada película y la función |
| `Footer` | Mostrar datos de contacto, dirección y derechos de autor | Ninguna | Datos propios del componente |

### Flujo de datos

```
src/data/movies.js
        │
        ▼
      App.jsx ──── props: tickets ────▶ Header.jsx
        │
        ├──────── props: movie ──────▶ Hero.jsx
        │
        └──────── props: movies, onBuy ───▶ MovieList.jsx
                                                │
                                                └── props: movie, onBuy ──▶ MovieCard.jsx
```

`App` es el único que conoce el archivo de datos y el estado de las entradas. `Header`, `Hero`, `MovieList` y `MovieCard` solo reciben lo que necesitan y no importan la fuente de datos.

---

## Interactividad

La cartelera responde a las acciones del usuario:

- **Buscador en vivo:** filtra las películas por título mientras se escribe.
- **Filtros por clasificación:** botones para mostrar todas o solo `PG`, `PG-13` o `R`.
- **Selección de horario:** cada tarjeta permite elegir uno de sus horarios y lo resalta.
- **Compra de entrada:** el botón se habilita al elegir un horario, confirma la reserva en la tarjeta e incrementa el contador de entradas del encabezado.
- **Estado vacío:** si la búsqueda no encuentra coincidencias, se muestra un mensaje en lugar de una lista vacía.
- **Navegación suave:** el botón "Ver cartelera" del Hero y los enlaces del Header desplazan la página hasta la cartelera.

El contador de entradas vive en `App` y se eleva como prop `tickets` hacia `Header`; la función `onBuy` viaja de `App` a `MovieList` y de ahí a `MovieCard`. Así el estado se mantiene en un solo lugar y los hijos solo notifican la acción.

---

## Modelo de datos

Cada película del archivo `src/data/movies.js` tiene esta forma:

```js
{
  id: 1,                       // identificador único, usado como key
  title: 'Dune: Parte Dos',
  image: '/posters/dune-parte-dos.jpg', // ruta local del póster
  synopsis: '...',             // resumen de la trama
  classification: 'PG-13',     // clasificación por edades
  rating: 8.4,                 // valoración
  schedule: ['13:00', '16:30'] // horarios de funciones
}
```

---

## Dependencias declaradas

### Dependencias de ejecución

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react` | `^18.3.1` | Biblioteca de componentes |
| `react-dom` | `^18.3.1` | Renderizado de React en el DOM |

### Dependencias de desarrollo

| Paquete | Versión | Uso |
|---------|---------|-----|
| `vite` | `^5.4.0` | Servidor de desarrollo y empaquetado |
| `@vitejs/plugin-react` | `^4.3.1` | Soporte de JSX y Fast Refresh en Vite |

Todas están declaradas en `package.json`. `node_modules` y `dist` se excluyen del repositorio mediante `.gitignore`.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levanta el servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |

---

## Observaciones del laboratorio

1. **Organización por responsabilidad.** `src/` se dividió en `components/`, `data/` y `styles/`. Cada componente vive en su propio archivo y se exporta por defecto.
2. **Props mínimas.** `Hero` y `MovieCard` reciben un único objeto `movie`; `MovieList` recibe el arreglo `movies`. Ningún hijo importa el archivo de datos.
3. **Listas con clave.** `MovieList` usa `.map()` y asigna `key={movie.id}` a cada elemento. Los horarios dentro de `MovieCard` también usan `key={time}`.
4. **Un solo nodo raíz.** `App` devuelve un fragmento `<>...</>` que agrupa `Header`, `main` y `Footer`.
5. **Estilos centralizados.** `src/styles/index.css` contiene los tokens de diseño y los estilos de todos los componentes; se importa una sola vez en `src/main.jsx`.
6. **Errores documentados.** En `ERRORES_TIPICOS.md` se registran los tres errores provocados intencionalmente (`class` vs `className`, dos nodos raíz y falta de `key`) con su mensaje y su solución.
7. **Estado elevado.** El contador de entradas vive en `App` con `useState` y baja como prop `tickets` a `Header`; la función `onBuy` se pasa por props hasta `MovieCard`. Los estados de búsqueda, filtro, horario y confirmación son locales a cada componente que los necesita.
8. **Portadas locales.** Las ocho imágenes están en `public/posters/`, por lo que la cartelera no depende de servicios externos ni de límites de peticiones para mostrar las portadas.

---

## Cumplimiento de la rúbrica

| Criterio | Evidencia |
|----------|-----------|
| Crea el proyecto con Vite y lo levanta | Proyecto generado con Vite, dependencias instaladas y `npm run dev` operativo; `npm run build` compila sin errores |
| Componentes funcionales con JSX compuestos en una interfaz | `Header`, `Hero`, `MovieList`, `MovieCard` y `Button`, cada uno con una responsabilidad, compuestos en `App.jsx` |
| Datos del padre a los hijos mediante props | `App → Hero (movie)`, `App → MovieList (movies)`, `MovieList → MovieCard (movie)`; búsqueda y favoritas viajan como props también |
| Repositorio con interfaz y observaciones | Este README explica la estructura, las props y las dependencias; las nuevas observaciones del Lab10 aparecen a continuación |

## Observaciones del laboratorio (Lab 10 — Componentes y Eventos)

### Componente `Button` reutilizable con props

- **Dónde se usa**: sustituye los botones escritos a mano en tres lugares distintos del código:
  1. **Botones de selección de horario** en `MovieCard` (`variant="ghost"`, `type="button"`); cada horario es un `children` diferente.
  2. **Botón de compra** en `MovieCard` (`variant="primary"`); gestiona `disabled` y texto condicional (`confirmed ? '¡Entrada reservada!' : 'Comprar entrada'`).
  3. **Botones de filtro** en `MovieList` (`variant="ghost"`); la variante activa se maneja por props (`filter-btn--active` es una clase estática, pero la lógica de estado pertenece al componente padre).
- **Prop `children`**: todas las variantes reciben su contenido por esta prop, lo que permite un solo componente para casos visualmente distintos.
- **Prop `variant`**: tres valores (`primary`, `ghost`, `danger`) definiendo la apariencia mediante CSS clases prefijadas (`btn--primary`, `btn--ghost`, `btn--danger`) en `src/styles/index.css`. No hay duplicación de código: un solo componente `Button.jsx` gestiona los tres casos.

### `useState` + eventos del usuario

- **Estado elevado**: el estado de entradas (`tickets`) vive en `App` y baja como prop `tickets` a `Header`; el buscador (`query`) también vive en `App` y se pasa a `Hero` y a `MovieList` por props, cumpliendo *"el estado vive donde debe y la interfaz responde a cada evento sin recargar"*.
- **Sin manipulación directa del DOM**: no hay `document.getElementById`, `innerHTML` ni recargas de página. Todo evento (`onClick`, `onChange`, `onBuy`) es gestionado por React a través de handlers pasados por props.
- **Favoritas con `useState`**: `useState(() => ...)` inicializa el arreglo desde `localStorage`, y `setFavorites((prev) => prev.includes(id) ? ... : ...)` nunca muta el estado ajeno. Los botones de cada `MovieCard` llaman a `onToggleFavorite(id)` recibido por props, nunca tocan `setState` del padre directamente.

### Comunicación hacia arriba (hijo → padre)

- **El hijo avisa al padre por la función recibida**: `MovieCard` ejecuta `onToggleFavorite(id)` sin tocar el estado propio del padre. Se recibe `isFavorite` como dato (`prop`) y se pinta `★ En favoritas` o `☆ Añadir a favoritas` según él.
- **No duplica el estado**: el único estado de favoritas es el de `App`. No hay copia redundante en `MovieCard` ni en `MovieList`.
- **Persistencia en `localStorage`**: cada cambio guarda `JSON.stringify(favorites)` en `localStorage` (`useEffect` al finalizar); al recargar la página, `useState` initializer lee `JSON.parse(localStorage.getItem(...))`. Las favoritas sobreviven a recargas.

### Componentes y Eventos completados (checklist)

| Criterio | Hecho |
|---|---|
| Button reutilizable con children y variantes | ✅ (`src/components/Button.jsx`, usado en horarios, compra, filtros) |
| useState para favoritas en App | ✅ (`src/App.jsx`, inicializador con localStorage + toggle hacia arriba) |
| Buscador entrada controlada | ✅ (`src/components/MovieSearch.jsx`, usado en banner y lista) |
| Favoritas guardadas en localStorage | ✅ (`App.jsx`, initializer + useEffect con try/catch) |
| Debounce en el filtrado (300 ms) | ✅ (`useEffect` en `App.jsx`, logs `[tecleo]` vs `[filtro]` en consola) |
| Estado vacío mostrado con texto del buscador | ✅ (`MovieList.jsx`, mensaje "No se encontraron películas que coincidan con «X».") |
| Buscador en el banner integrando filtrado global | ✅ (`Hero.jsx`, el mismo `query`/handler que en `MovieList`) |
| Commit + push realizados antes del plazo | ✅ (último commit: `a82c3b4`) |

### Datos que la aplicación recuerda — dónde se decidió ponerlos y por qué

| Dato | Componente que lo almacena | Justificación |
|---|---|---|
| `tickets` (contador de entradas) | `App` (via prop `tickets → Header`) | Estado global compartido: `Header` necesita mostrar el número; elevarlo a `App` evita que cada componente gestione su propio contador y garantiza una única fuente de verdad. |
| `favorites` (array de IDs de películas favoritas) | `App` con `useState` initializer + `localStorage` persistencia | La persistencia transaccional (sobrevive recarga) justifica ponerlo en `App`. Usar `localStorage` en cada hijo rompería la consistencia; el patrón "lift state up + persist at root" es el estándar para datos que deben sobrevivir a recargas. |
| `query` (texto del buscador) | `App` (pasado por props a `Hero` y `MovieList`) | Queremos que el filtrado sea **compartido** entre el buscador del banner y el de la lista, de modo que buscar "Dune" en cualquiera de los dos filtre la misma cartelera. Vivir en `App` permite ese acoplamiento controlado sin duplicar estado. |
| `debouncedQuery` (texto filtrado con retardo) | `App` (estado derivado de `query` vía `useEffect` de 300 ms) | Evita que el filtrado dispare en cada tecla (`onChange` rápido), mejorando rendimiento y reduciendo cálculos innecesarios en `.filter()`. El estado original `query` sigue vivo para la escritura inmediata del usuario. |

### Captura del estado vacío del buscador

![Captura del estado vacío del buscador](screenshot.png)
*(Vista de la lista con el buscador mostrando "No se encontraron películas que coincidan con «zzz»." y las 8 tarjetas debajo una vez se limpia el texto.)*

---

## Estructura del proyecto (Lab10)

```
cartelera-cine/
├── index.html                  Punto de entrada HTML; monta #root
├── vite.config.js              Configuración de Vite con el plugin de React
├── package.json                Dependencias y scripts del proyecto
├── ERRORES_TIPICOS.md          Registro de los tres errores de JSX provocados
├── public/
│   └── posters/                Portadas locales de las ocho películas
└── src/
    ├── main.jsx                Renderiza <App /> e importa los estilos globales
    ├── App.jsx                 Compone Header, Hero, MovieList y Footer; mantiene el estado de tickets, favorites y query
    ├── components/
    │   ├── Header.jsx          Nombre del cine y navegación; recibe tickets por props
    │   ├── Hero.jsx            Banner de la película destacada + buscador MovieSearch
    │   ├── MovieCard.jsx       Tarjeta individual de una película; recibe isFavorite y onToggleFavorite por props
    │   ├── MovieList.jsx       Lista de tarjetas recorriendo la cartelera; recibe query y onQueryChange por props
    │   ├── MovieSearch.jsx     Entrada controlada: el texto vive en el estado y onChange lo actualiza
    │   └── Button.jsx          Componente reutilizable: children + variante (primary/ghost/danger)
    ├── data/
    │   └── movies.js           Arreglo con las ocho películas de la cartelera
    └── styles/
        └── index.css           Tokens de diseño y estilos de todos los componentes; incluye variantes de Button y estilos de formulario
```
