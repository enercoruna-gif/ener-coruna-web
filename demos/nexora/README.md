# Nexora — demo estática en español

Recreación de la referencia IMG_0994: hero alpino, fondo negro, producto oscuro, planes con Pro en blanco, opiniones de ejemplo y cierre con paisaje.

## Integración

- Copiar esta carpeta completa a `demos/nexora/` en el sitio de Ener Coruña.
- Enlazar a `demos/nexora/` desde el catálogo de demos. No necesita npm, compilación ni backend.
- Para publicar esta demo por separado en Cloudflare Pages, subir el contenido de la carpeta (con `index.html` en la raíz).
- Vista previa local: `python3 -m http.server 4173 --directory demos/nexora`.

## Comportamiento

Navegación interna, menú móvil, pasos desplegables, pestañas accesibles por teclado, precios mensual/anual y modal de registro ilustrativo. El formulario valida el correo en el navegador, pero no almacena ni transmite información. Los enlaces de información abren contenido local.

Marca, nombres, opiniones, logos, cifras y precios son ficticios y están presentados como ejemplos. La demo lleva `noindex` para no indexar una oferta inexistente. Incluye metadatos en español, Open Graph 1200×630 y JSON-LD de WebPage; al integrarla en un dominio, convertir la URL de `og:image` en absoluta para compatibilidad con redes sociales.

## Recursos

Todos los archivos visuales y tipográficos son locales; no hay peticiones externas en ejecución.

- Alpes: [imagen de archivo de Unsplash](https://images.unsplash.com/photo-1506905925346-21bda4d32df4).
- Valle: [imagen de archivo de Unsplash](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b).
- Licencia de fotografía: https://unsplash.com/license. Se usan solo como imágenes ilustrativas, no como contenido de la captura original.
- Avatares ilustrativos: https://i.pravatar.cc/ (perfiles de demostración, sin relación con los nombres).
- Inter: https://fonts.google.com/specimen/Inter (SIL Open Font License, ver `assets/OFL.txt`).

La captura de referencia es de baja resolución y monta la página en dos columnas. Se mantiene su orden visual en una sola página responsive; las imágenes y los datos no son los originales del producto.
