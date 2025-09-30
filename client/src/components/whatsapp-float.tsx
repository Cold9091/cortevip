import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export default function WhatsAppFloat() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50"
      data-testid="button-whatsapp-float"
    >
      <a
        href="https://wa.me/244923542349"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp - Agende seu horário"
      >
        <SiWhatsapp className="w-8 h-8 text-white" />
      </a>
    </motion.div>
  );
}
