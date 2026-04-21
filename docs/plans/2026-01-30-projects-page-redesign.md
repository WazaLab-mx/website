# Projects Page Redesign

## Overview
Rediseño de la página de proyectos para mayor impacto visual y facilidad de exploración.

## Estructura

### Sección 1: Hero Storytelling (Scroll Vertical)
- 8 proyectos en scroll vertical fullscreen
- Cada slide ocupa 100vh con scroll-snap
- Screenshot de fondo con efecto parallax
- Overlay gradiente oscuro
- Título grande, descripción corta, tags y botón "Explorar"
- Indicador de dots lateral

**Proyectos en Hero (orden):**
1. TacosNearMe
2. San Luis Way
3. AdScout
4. Memecoin Scout
5. Claude Code Subagent Generator
6. Sobrecitos
7. TidyHome
8. Brief Boy

### Sección 2: Grid Masonry
- 14 proyectos restantes en mosaico tipo Pinterest
- Tarjetas de 3 tamaños (grande, mediana, pequeña)
- Screenshot + título + tags
- Info expandida al hover
- Entrada animada escalonada

### Sección 3: CTA
- Mantener el CTA existente

## Implementación Técnica

**Hero:**
- CSS scroll-snap-type: y mandatory
- Parallax con transform/background-attachment
- Intersection Observer para slide activo
- Framer Motion para animaciones

**Grid Masonry:**
- CSS Grid con grid-auto-rows y span variable
- Intersection Observer para animaciones de entrada

## Archivos
- `app/projects/page.tsx` - Página principal refactorizada
- `app/projects/components/ProjectHeroStory.tsx` - Sección hero
- `app/projects/components/ProjectHeroSlide.tsx` - Cada slide
- `app/projects/components/ProjectMasonryGrid.tsx` - Grid Pinterest
- `app/projects/components/ProjectMasonryCard.tsx` - Tarjetas del grid
- `app/projects/components/ScrollIndicator.tsx` - Dots de navegación
