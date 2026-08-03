---
name: human-ui
description: Use when creating or refactoring HTML and CSS (landing pages, dashboards, componentes, estilos, páginas web) so the result does NOT look like generic AI-generated design (anti "AI slop"). For FluneXy: follows the brand manual and the Figma file (fintech dashboard dark). Triggers on keywords like "html", "css", "estilos", "página web", "landing", "diseño", "web", "componente ui", "no parezca hecho por IA", "FluneXy", "fintech".
---

# Human UI — diseño web que no parece hecho por IA

Actúa como director de diseño de un estudio pequeño conocido por dar a cada
cliente una identidad visual que no podría confundirse con la de nadie más.
Trabaja en dos pasadas. No saltes directamente a escribir código.

---

## Brief de marca — FluneXy (obligatorio si el proyecto es FluneXy)

Fuente de verdad 1: manual en `C:\Users\santi\Downloads\Manual_de_identidad_FluneXy (1).pptx`
Fuente de verdad 2: Figma `https://www.figma.com/design/SnztjGiCRS1YO49LX5wIHT/FluneXy`
Fuente de verdad 3 (tokens implementados): `assets/css/tokens.css` del proyecto —
variables CSS equivalentes al manual. Sácala de ahí si el proyecto la tiene.

### Tokens de marca (extraídos del manual, Design System v1.0)

> Si el proyecto tiene `assets/css/tokens.css`, léelo primero: es la versión
> implementada de estos tokens (colores, tipografía, iconos, avatares e imágenes)
> y sirve de referencia para nombres de variable CSS y valores exactos.

**Colores — solo estos hex. No inventes colores fuera de marca.**
- Fondos (modo oscuro, por defecto): BG Deep `#070920`, BG Card `#0C0F40`, claro `#F8F9FF`
- Marca: Indigo `#818CF8` (acento principal), Violet `#A78BFA` (acento secundario), Sky `#38BDF8` (info/links)
- Estados: Green `#34D399` (éxito/positivo), Red `#F87171` (error/alerta), Amber `#FBBF24` (advertencia)
- Neutros: Slate 700 `#334155`, 500 `#64748B`, 400 `#94A3B8`, 300 `#CBD5E1`, 50 `#F1F5F9`, White `#FFFFFF`

**Tipografía — marca: Sora (display) + Inter (body).**
- Desktop: H1 Sora 40px, H2 28px, H3 22px, Body Inter 16px, Caption 13px, Small 12px
- Mobile: H1 Sora 32px, H2 24px, H3 20px, Body Inter 16px
- Resolución de referencia: desktop 1440×900, mobile 360×800. Grilla de 8px.

**Layout y tono.** Aplicación fintech, dashboard oscuro, "interactividad neón",
estructura geométrica, arquitectura limpia, contraste optimizado. Logotipo: X en
verde. Imágenes desktop: hero 360×480 (máx 600 full-width), banner 720×320, card
108×144 (3:4), thumbnail 64×64, avatar 40/48/56. Iconografía desktop: 16/20/24/32
(+40 destacados), trazo uniforme 1.5–2px, SVG + PNG @2x.

### Regla de oro

El manual y el Figma **mandan**. Las prohibiciones anti-IA de color y tipografía
de abajo quedan **suspendidas donde la marca lo exige** (el índigo/violeta y el
body Inter son de marca, no un default perezoso). La disciplina anti-IA se aplica
SIEMPRE en: composición, layout, jerarquía, copy, animación y en todos los
anti-patrones estructurales de la sección correspondiente. Nunca sustituyas Sora
por una sans genérica; nunca uses Inter como única cara.

## Paso 0 — Leer tokens.css y consultar el Figma antes de diseñar

0. Lee `assets/css/tokens.css` del proyecto (si existe): es la implementación del
   manual (colores, Sora/Inter, tamaños, iconos, avatares, imágenes). Reutiliza
   sus variables como tokens del CSS final — no dupliques ni inventes valores.
1. Abre `https://www.figma.com/design/SnztjGiCRS1YO49LX5wIHT/FluneXy` vía MCP de
   navegador (si está disponible) o pide acceso al usuario.
2. Página **"escritorio"** (desktop). Frames en el panel de Capas:
   `Home Dashboard`, `Landing Page`, `MOD01 Autenticación`, `MOD02 Usuario`,
   `MOD04 Fondos`, `MOD05 Movimientos`, `MOD06 Plantillas`, `MOD07 Activos`,
   `MOD08 Pasivos`, `MOD09 Metas`, `MOD10 Cuotas`, `MOD11 Pagos`,
   `MOD12 Flujo de Caja`, `MOD13 Detalle Flujo de Caja`, `MOD14 Balance
   Financiero`, `MOD15 Indicador Financiero`, `MOD16 Alerta`, `MOD17 Reporte`,
   `MOD18 Asistente Inteligente`.
3. Si el modelo ve imágenes: haz screenshot de los frames relevantes a la tarea
   antes de escribir código. Si no: pide al usuario exportar el frame concreto o
   descríbelo leyendo las capas.
4. Extrae de ahí (y no de otro lugar) radios, espaciados, sombras y estructura de
   cada pantalla. Si algo no está en Figma, en `tokens.css` ni en el manual,
   pregúntalo.

---

## Paso 1 — Plan de diseño breve (antes de escribir cualquier código)

Crea un sistema de tokens compacto con: **color, tipo, layout y firma**.

- **Color**: para FluneXy usa **solo los hex del manual** (dark-mode-first: BG
  Deep, BG Card, un acento Indigo y un segundo Violet/Sky con contención). Si NO
  hay identidad de marca que lo exija, elige 4–6 hex propios evitando los
  "colores de IA": azul `#3B82F6` / índigo `#6366F1`, morado `#8B5CF6` /
  `#7C3AED`, teal `#06B6D4`; fuera de las bandas hue 210–280; sin `#FFFFFF` ni
  `#000000` puros — usa blanco cálido `hsl(35,20%,96%)` o negro teñido
  `hsl(220,15%,8%)`. Máximo 1 color dominante + 1 acento. Prohibidos gradientes
  decorativos y degradados púrpura-azul.
- **Tipo**: 2+ roles con carácter, usados con contención (FluneXy: Sora display +
  Inter body — marca; fuera de marca: display y body de categorías distintas,
  p. ej. serif display con sans body). PROHIBIDO usar una fuente por defecto como
  única cara: Inter, Roboto, Open Sans, Lato, Arial, Poppins, Montserrat,
  system-ui. Escala con saltos reales (~3x entre niveles), no cinco matices de
  medium. Headlines: line-height 1.1–1.3 y letter-spacing ajustado (-0.02em).
- **Layout**: concepto en 1 frase + wireframe ASCII para comparar opciones.
  Evita el grid simétrico de 12 columnas con secciones alternando
  izquierda-derecha y las "tres tarjetas idénticas". Usa asimetría controlada
  (5fr/3fr, 7fr/4fr, desplazamientos tipo `ml-[12%]`), varía el padding entre
  secciones (ancho entre secciones, ajustado dentro), y usa un sistema de
  espaciado modular (base 4px o 5px — FluneXy: base 8px), no un solo `gap`
  repetido.
- **Firma**: el elemento único por el que se recuerda la página, que encarna el
  brief. En FluneXy, la firma natural es el motivo de la **X verde** y la
  "interactividad neón" aplicada con contención. Un solo lugar para gastar la
  audacia; todo lo demás, silencioso y disciplinado.

Antes de construir, revisa el plan: si alguna parte lee como la respuesta
genérica que darías para cualquier página parecida, revísala, di qué cambiaste
y por qué. Además, valida el plan contra el manual (colores y tipos) y contra el
Figma (composición por pantalla).

## Paso 2 — Código

Escribe el código siguiendo el plan revisado. Deriva **cada** decisión de
color y tipo de ese plan (y, en FluneXy, de los tokens de marca).

### Anti-patrones que NUNCA usar (delatan a la IA)

- Tipografías por defecto (Inter, Roboto, Open Sans, system-ui) como única cara.
- Gradientes azul→púrpura, botones con gradiente, blobs/orbs flotantes.
- Hero genérico: badge pill + heading + subheading + 2 botones (estructura de >70% de los heroes de IA).
- Grid de 3 columnas con tarjetas idénticas (mismo padding, radio, sombra, gaps internos) repetido en cada sección.
- Tarjeta = icono redondeado + heading + párrafo (la "santísima trinidad").
- `rounded-lg` (0.5rem) en todo. Usa DOS radios que discrepen (p. ej. botón 4px, contenedor 0px, o botón 8px, tarjeta 2px).
- `line-height: 1.5` en todo, `letter-spacing` por defecto, escalas uniformes (16→24→32).
- Animación única "fade-up" (opacity 0→1 + translateY(20px), 300ms, ease-in-out) en scroll sobre todos los elementos. Diferencia el movimiento por tipo de componente: clip-reveal, slide con stagger, scale desde 95%. Easing variados. Nada de bounce/spring.
- Hover de "scale-1.05 + sombra" en todas las tarjetas.
- Sombras fuertes en todo; prefiere bordes sutiles.
- Copy genérico: "Unlock your potential", "Seamlessly streamline your workflow", "Empower", "Learn more" repetido, secciones tituladas "Features / Solutions / Benefits", subtítulos de 3 frases. Verbos concretos (calcula, compara, encuentra, construye, trackea — en FluneXy: fluye, mueve, proyecta, alerta, reporta). Subtítulo: 1 frase máximo.
- Emojis como iconos, imágenes de stock irrelevantes, placeholders con gradiente donde debería haber imagen, iconos redondeados sobre cada encabezado.
- `transition-all duration-300` por defecto, fondos de sección alternados `#F5F5F5 / white` sin cambio de contenido real, 5+ colores compitiendo.

### Detalles de oficio que delatan a un humano (incluir)

- `::selection` personalizado, `:focus-visible` visible en todos los interactivos, `prefers-reduced-motion` respetado, print stylesheet si aplica.
- Ajustes ópticos de 1–2px (los nudges de un diseñador real), tracking distinto en display vs body, ragos/tablas con oldstyle figures cuando se pueda.
- Estados completos de componentes: hover, focus, active, disabled, error.
- Semántica HTML correcta (header, main, section, footer), aria-labels en botones solo-icono, contraste 4.5:1 mínimo (en modo oscuro FluneXy, verifica contraste de los Slates sobre BG Deep).
- HTML semántico + CSS organizado: variables CSS para colores/espaciado, clases con nombres semánticos, comentarios por sección. Nada de estilos inline dispersos.

### Responsive y jerarquía

- Mobile-first obligatorio (empieza por 360/390px; el scroll horizontal es un fallo).
- Densidad real: jerarquía visual clara, mucho espacio negativo entre secciones (96px+ en desktop), `max-width` coherente (1280px marketing / 1440px dashboard — FluneXy usa 1440px).

## Verificación

Después de construir, autocritícate contra esta lista y corrige antes de
entregar:

1. ¿Usé Inter/Roboto/Open Sans/system-ui como única cara? → cambiar (en FluneXy, body Inter es marca; nunca como única).
2. ¿Hay gradiente azul-morado o neones? → eliminar.
3. ¿Hay 3+ tarjetas idénticas o secciones repetidas? → romper la simetría.
4. ¿Todos los radios/sombras son iguales? → hacer que difieran.
5. ¿Animo todo con fade-up? → variar o quitar.
6. ¿El hero es "badge + título + subtítulo + 2 botones"? → reestructurar.
7. ¿El copy es vago? → reescribir con verbos concretos y específicos.
8. ¿Fondo blanco/negro puro? → usar tonos teñidos (FluneXy: BG Deep/BG Card).
9. ¿Dejé fuera accesibilidad (focus, contraste, reduced-motion)? → añadir.
10. FluneXy: ¿algún color/tipo fuera del manual? ¿El layout contradice el frame del Figma para esa pantalla? ¿Reinventé valores que ya estaban en `tokens.css`? → corregir contra la fuente de verdad.

Sé estricto: mejor cortar decoración que sobra ("quítate un accesorio antes de
salir de casa"). El resultado debe leerse como una decisión, no como una
plantilla.
