import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMapSchema, mapSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/maps", async (req, res) => {
    try {
      const maps = await storage.getAllMaps();
      res.json(maps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch maps" });
    }
  });

  app.get("/api/maps/:id", async (req, res) => {
    try {
      const map = await storage.getMap(req.params.id);
      if (!map) {
        return res.status(404).json({ error: "Map not found" });
      }
      res.json(map);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch map" });
    }
  });

  app.post("/api/maps", async (req, res) => {
    try {
      const validatedData = insertMapSchema.parse(req.body);
      const map = await storage.createMap(validatedData);
      res.status(201).json(map);
    } catch (error) {
      res.status(400).json({ error: "Invalid map data" });
    }
  });

  app.put("/api/maps/:id", async (req, res) => {
    try {
      const validatedData = insertMapSchema.partial().parse(req.body);
      const map = await storage.updateMap(req.params.id, validatedData);
      if (!map) {
        return res.status(404).json({ error: "Map not found" });
      }
      res.json(map);
    } catch (error) {
      res.status(400).json({ error: "Invalid map data" });
    }
  });

  app.delete("/api/maps/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMap(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Map not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete map" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
