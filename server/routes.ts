import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGalleryImageSchema, insertTestimonialSchema, insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/gallery", async (_req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const data = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(data);
      res.json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create gallery image" });
      }
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      await storage.deleteGalleryImage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const data = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(data);
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create testimonial" });
      }
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const data = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(data);
      res.json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create appointment" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
