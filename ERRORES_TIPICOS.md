# Errores típicos en JSX/React

Durante el desarrollo de la cartelera se provocaron intencionalmente los tres errores más comunes para observar cómo reacciona React y aprender a leer sus mensajes.

---

## 1. Usar `class` en vez de `className`

**Causa:** En JSX no se puede usar el atributo HTML `class` porque es una palabra reservada de JavaScript. React requiere `className`.

**Código que falla:**
```jsx
<div class="container">Contenido</div>
```

**Mensaje de error:**
```
Warning: Invalid DOM property `class`. Did you mean `className`?
```

Esta advertencia aparece en la consola del navegador y React ignora el atributo `class`, por lo que los estilos no se aplican.

---

## 2. Devolver dos nodos raíz desde un componente

**Causa:** Un componente de React debe devolver un solo elemento raíz. Devolver dos elementos adyacentes sin envolverlos rompe la regla de un único nodo raíz.

**Código que falla:**
```jsx
function Header() {
  return (
    <div>Logo</div>
    <nav>Navegación</nav>
  )
}
```

**Mensaje de error:**
```
Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
```

**Solución:** envolver en un fragmento `<>...</>` o en un contenedor `<div>...</div>`.

---

## 3. Olvidar la clave (`key`) en un `.map()`

**Causa:** Al renderizar listas con `.map()`, React necesita una clave estable y única para cada elemento para poder identificar qué elementos cambiaron, se agregaron o se eliminaron.

**Código que falla:**
```jsx
{movies.map((movie) => (
  <MovieCard movie={movie} />
))}
```

**Mensaje de error:**
```
Warning: Each child in a list should have a unique "key" prop.
```

**Solución:** agregar `key={movie.id}` al elemento devuelto dentro del map.

---

## Registro de comprobación

| Error | Se observó en consola | Solución aplicada |
|-------|----------------------|-------------------|
| `class` en lugar de `className` | `Invalid DOM property class` | Se usó `className` en todos los componentes |
| Dos nodos raíz | `Adjacent JSX elements must be wrapped` | Se envolvió el retorno en `<>...</>` o un contenedor |
| Falta de `key` en `.map()` | `Each child in a list should have a unique key prop` | Se agregó `key={movie.id}` en `MovieList` |
