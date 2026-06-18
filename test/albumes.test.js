import { copyFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import request from "supertest";
import { beforeAll, afterAll, describe, it, expect } from "vitest";

const srcDb = join(process.cwd(), "data", "discostore.db");
const testDb = join(process.cwd(), "data", "discostore.test.db");
process.env.DISCONSTORE_DB = testDb;
process.env.NODE_ENV = "test";

let app;
let db;

beforeAll(async () => {
  copyFileSync(srcDb, testDb);
  ({ default: app } = await import("../index.js"));
  ({ db } = await import("../data/albumes.js"));
});

afterAll(() => {
  db?.close();
  rmSync(testDb, { force: true });
});

describe("Albumes API", () => {
  it("GET /albumes debe devolver 200 y un arreglo con un slug sembrado", async () => {
    const response = await request(app).get("/albumes");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(
      response.body.some((item) => item.slug === "my-dear-melancholy"),
    ).toBe(true);
  });

  it("GET /album/:slug con slug existente devuelve 200 y el álbum", async () => {
    const response = await request(app).get("/album/dawn-fm");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      slug: "dawn-fm",
      artista: "The Weeknd",
    });
  });

  it("GET /album/:slug con slug inexistente devuelve 404 en JSON", async () => {
    const response = await request(app).get("/album/no-existe");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Álbum no encontrado" });
  });

  it("GET /search/:text con menos de 3 caracteres devuelve 400 en JSON", async () => {
    const response = await request(app).get("/search/ab");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("POST /albumes con cuerpo válido devuelve 201, Location y objeto creado", async () => {
    const nuevo = {
      titulo: "Prueba Vitest",
      artista: "The Weeknd",
      genero: "R&B",
      anio: 2024,
      sello: "XO / Republic Records",
      pistas: 10,
      imagen: "new-album.avif",
      resumen: "Álbum de prueba para Vitest.",
      descripcion:
        "Descripción de prueba del álbum que se crea desde la suite de pruebas.",
    };

    const response = await request(app).post("/albumes").send(nuevo);

    expect(response.status).toBe(201);
    expect(response.headers).toHaveProperty("location", "/album/prueba-vitest");
    expect(response.body).toMatchObject({
      slug: "prueba-vitest",
      titulo: "Prueba Vitest",
    });
  });

  it("POST /albumes con cuerpo inválido devuelve 400 en JSON", async () => {
    const response = await request(app)
      .post("/albumes")
      .send({ artista: "The Weeknd" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("POST /albumes con slug duplicado devuelve 409 en JSON", async () => {
    const response = await request(app).post("/albumes").send({
      titulo: "Dawn FM",
      artista: "The Weeknd",
      genero: "Synth-pop",
      anio: 2022,
      sello: "XO / Republic Records",
      pistas: 16,
      imagen: "2albuntheweeknd.avif",
      resumen: "Álbum conceptual narrado como una emisora de radio.",
      descripcion:
        "Quinto álbum de estudio de The Weeknd, un concepto de synth-pop y new wave presentado como una estación de radio.",
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
  });

  it("PUT /album/:slug existente y válido devuelve 200 y objeto actualizado", async () => {
    const response = await request(app).put("/album/starboy").send({
      titulo: "Starboy Remastered",
      artista: "The Weeknd",
      genero: "Pop",
      anio: 2016,
      sello: "XO / Republic Records",
      pistas: 18,
      imagen: "6albuntheweeknd.avif",
      resumen: "Álbum ganador del Grammy con la colaboración de Daft Punk.",
      descripcion:
        "Versión remasterizada del tercer álbum de estudio de The Weeknd.",
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      slug: "starboy",
      titulo: "Starboy Remastered",
    });
  });

  it("PUT /album/:slug inexistente devuelve 404 en JSON", async () => {
    const response = await request(app).put("/album/no-existe").send({
      titulo: "No Existe",
      artista: "Nadie",
      genero: "Pop",
      anio: 2024,
      sello: "Test",
      pistas: 1,
      imagen: "no-existe.avif",
      resumen: "No existe.",
      descripcion: "No existe.",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Álbum no encontrado" });
  });

  it("DELETE /album/:slug existente devuelve 204 sin cuerpo", async () => {
    const response = await request(app).delete(
      "/album/beauty-behind-the-madness",
    );

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("DELETE /album/:slug inexistente devuelve 404 en JSON", async () => {
    const response = await request(app).delete("/album/no-existe");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Álbum no encontrado" });
  });
});
