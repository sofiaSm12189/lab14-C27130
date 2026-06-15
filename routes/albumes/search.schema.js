import { z } from "zod";

const schema = z.object({
  text: z
    .string()
    .trim()
    .min(2, "La búsqueda debe tener al menos 2 caracteres")
    .max(50, "La búsqueda no puede superar los 50 caracteres")
    .transform((valor) => valor.toLowerCase()),
});

export default schema;
