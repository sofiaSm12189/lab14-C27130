export const home = (req, res) => {
  res.json({
    nombre: "DiscoStore API",
    version: "1.0.0",
    descripcion:
      "Catálogo de álbumes de una tienda de música (discografía de The Weeknd).",
    endpoints: {
      "GET /": "Información de la API.",
      "GET /albumes": "Lista todos los álbumes.",
      "GET /album/:slug": "Devuelve un álbum por su slug.",
      "GET /genero/:genero": "Slugs de los álbumes de un género.",
      "GET /search/:text": "Busca álbumes por texto.",
      "POST /albumes": "Crea un álbum.",
      "PUT /album/:slug": "Actualiza un álbum.",
      "DELETE /album/:slug": "Elimina un álbum.",
      "GET /imagenes/:archivo": "Portadas (archivos estáticos).",
    },
  });
};
