import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  return (
    <section id="galeria" className="py-20 px-4 bg-background" ref={ref} data-testid="section-gallery">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text-gradient" data-testid="text-gallery-title">
            Galeria de Trabalhos
          </h2>
          <p className="text-muted-foreground text-lg">Resultados que falam por si</p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">Em breve, nossa galeria de trabalhos estará disponível.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-testid="gallery-grid"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg border-2 border-border hover-glow cursor-pointer group"
                onClick={() => setSelectedImage(image)}
                data-testid={`gallery-image-${index}`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title || "Trabalho da CORTE VIP"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {image.title && (
                      <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                    )}
                    {image.description && (
                      <p className="text-white/80 text-xs line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black border-2 border-primary" data-testid="gallery-dialog">
            {selectedImage && (
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  data-testid="button-close-dialog"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title || "Trabalho da CORTE VIP"}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                {(selectedImage.title || selectedImage.description) && (
                  <div className="p-6 bg-card">
                    {selectedImage.title && (
                      <h3 className="text-primary font-display text-2xl font-bold mb-2">{selectedImage.title}</h3>
                    )}
                    {selectedImage.description && (
                      <p className="text-muted-foreground">{selectedImage.description}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
