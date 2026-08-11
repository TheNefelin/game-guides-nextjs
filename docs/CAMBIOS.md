# Cambios y Arquitectura

Este documento resume los cambios realizados para desacoplar la BD (de una API/SQL remota a un JSON local) y las decisiones de rendimiento de imágenes.

## 1. Base de Datos en JSON

La BD ya no vive en una API externa (`dragonra.bsite.net`). Todo el contenido está en un único archivo versionado:

- **`data/db.json`** — la "BD" completa (juegos, guías, aventuras, personajes, fuentes, fondos, imágenes). Es el archivo que se edita o regenera.
- **`BD.ods`** — la fuente original en hoja de cálculo. Si se actualiza, se regenera el JSON:

```bash
npm run generate:db
```

### Servicios (cómo se lee la BD)

```
src/services/
├── fetching.tsx        → punto único de cambio (alterna entre local y API)
├── fetchingLocal.tsx   → lee data/db.json (JSON local)
├── fetchingApi.tsx     → llama a la API remota original
└── jsonDb.ts           → capa de acceso a data/db.json
```

Para alternar entre BD local (JSON) y API remota, **solo se cambia una importación** en `src/services/fetching.tsx`:

```tsx
// BD local: data/db.json
import { getGamesAsync } from "./fetchingLocal";
// API remota:
// import { getGamesAsync } from "./fetchingApi";
```

Toda la app (páginas + `/api/getGames`) lee desde `@/services/fetching`, así que un solo cambio re-apunta todo.

## 2. Imágenes

- Las imágenes se descargan a **`public/images/`** (562 archivos webp).
- Se sirven mediante `/api/getImage?fileName=...` que lee del disco local (con protección contra path traversal).
- Para descargarlas desde la API original:

```bash
npm run download:images https://tu-api.com
```

(Las que ya existan en `public/images/` no se vuelven a bajar.)

### Rendimiento en Vercel

Las imágenes **ya están optimizadas y en webp al tamaño correcto** (los nombres incluyen las dimensiones). Por eso, en `next.config.ts` se activó:

```ts
images: { unoptimized: true }
```

Efecto:
- `next/image` **no pasa por el optimizador de Vercel** → las sirve como estático puro desde el CDN.
- **Cero uso del límite de "transformaciones de imagen"** del plan.

### Límite de optimización de Vercel (contexto)

- Hobby incluye **5.000 transformaciones de imagen/mes** (el "1.000" que circula es del modelo legacy por *imagen de origen*).
- 1 transformación = 1 caché-miss de una combinación única (URL + tamaño + calidad). Ver la misma imagen en el mismo tamaño por N usuarios = 1 transformación + caché-hits.
- Los límites de imagen son **por cuenta/equipo** y se suman entre todos los proyectos.
- Si se supera en Hobby **no se cobra**: las imágenes dejan de optimizarse (error 402 y se muestra el `alt`).
- Con `unoptimized: true` este límite deja de ser relevante.
- **Si algún día se necesita redimensionar dinámicamente** (responsive, formatos), la vía es migrar a un CDN de imágenes (Cloudinary, Imgix), que asume la banda/optimización y deja de gastar el plan de Vercel. El cambio sería solo la URL en `data/db.json` + `remotePatterns` en `next.config.ts`.

## 3. Checks de usuario (localStorage)

Sin login ni BD remota, los "checks" de capítulos/adventuras se guardan en el navegador (localStorage):

- `guide-check-{guide_Id}` → "Capítulo Completado"
- `adventure-check-{adventure_Id}` → aventura marcada

Son por navegador/dispositivo (no sincronizan entre dispositivos). Implementado en:
- `src/components/TimelineGuideCheck.tsx`
- `src/components/TimelineAdventureCheck.tsx`

Se eliminaron `/api/postGuideCheck` y `/api/postAdventureCheck` (ya no se usan).

## 4. Autenticación (desactivada)

El login de Google quedó **desenchufado** porque crasheaba el build con `NEXTAUTH_URL` vacío (`new URL('')`):

- Se quitó `getServerSession` de todas las páginas.
- Se quitó `SessionProvider` del layout y `BtnAuth` de la `NavBar`.
- Los archivos se conservan para reactivarlos después:
  - `src/services/authOptions.tsx`
  - `src/services/SessionProviderContext.tsx`
  - `src/components/BtnAuth.tsx`
  - `src/app/api/auth/[...nextauth]/route.tsx`

Para reactivarla: restaurar `SessionProvider` en `src/app/layout.tsx`, `BtnAuth` en `NavBar.tsx`, y definir `GOOGLE_ID`, `GOOGLE_SECRET` y `NEXTAUTH_URL` en el entorno.

## 5. Endpoints

| Ruta | Estado | Descripción |
|---|---|---|
| `/api/getGames` | activo | Lee de la BD (local o API según el switch de `fetching.tsx`) |
| `/api/getImage` | activo | Sirve imágenes desde `public/images/` |
| `/api/auth/[...nextauth]` | inactivo | Conservado para reactivar auth |
| `/api/postGuideCheck` | eliminado | Los checks son local (localStorage) |
| `/api/postAdventureCheck` | eliminado | Los checks son local (localStorage) |
