import { z } from "zod";

const anioActual = new Date().getFullYear();

const schema = z.object({
  titulo: z
    .string({ error: "El título es obligatorio" })
    .trim()
    .min(1, "El título no puede estar vacío")
    .max(120, "El título es demasiado largo"),
  artista: z
    .string({ error: "El artista es obligatorio" })
    .trim()
    .min(1, "El artista no puede estar vacío")
    .max(120, "El artista es demasiado largo"),
  genero: z
    .string({ error: "El género es obligatorio" })
    .trim()
    .min(1, "El género no puede estar vacío")
    .max(60, "El género es demasiado largo"),
  anio: z
    .number({ error: "El año debe ser un número" })
    .int("El año debe ser un número entero")
    .min(1900, "El año debe ser 1900 o posterior")
    .max(anioActual + 1, `El año no puede ser mayor a ${anioActual + 1}`),
  sello: z
    .string({ error: "El sello es obligatorio" })
    .trim()
    .min(1, "El sello no puede estar vacío")
    .max(120, "El sello es demasiado largo"),
  pistas: z
    .number({ error: "Las pistas deben ser un número" })
    .int("Las pistas deben ser un número entero")
    .positive("Las pistas deben ser un número positivo")
    .max(200, "Demasiadas pistas"),
  imagen: z
    .string({ error: "La imagen es obligatoria" })
    .trim()
    .min(1, "La imagen no puede estar vacía")
    .max(200, "El nombre de la imagen es demasiado largo"),
  resumen: z
    .string({ error: "El resumen es obligatorio" })
    .trim()
    .min(1, "El resumen no puede estar vacío")
    .max(300, "El resumen es demasiado largo"),
  descripcion: z
    .string({ error: "La descripción es obligatoria" })
    .trim()
    .min(1, "La descripción no puede estar vacía")
    .max(2000, "La descripción es demasiado larga"),
});

export default schema;
