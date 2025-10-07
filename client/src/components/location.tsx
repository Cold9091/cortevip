import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const whatsappNumbers = [
    { number: "+244 923 542 349", link: "https://wa.me/244923542349" },
    { number: "+244 931 054 104", link: "https://wa.me/244931054104" },
    { number: "+244 931 161 121", link: "https://wa.me/244931161121" },
  ];

  return (
    <section id="localizacao" className="py-20 px-4 bg-card" ref={ref} data-testid="section-location">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary" data-testid="text-location-title">
            Nossa Localização
          </h2>
          <p className="text-muted-foreground text-lg">Visite-nos no Outlets Shopping Mall</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-96 lg:h-[500px] rounded-lg overflow-hidden border-2 border-border"
            data-testid="map-container"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.1685827347845!2d13.398623!3d-8.974483899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a52034e84e622f3%3A0xf74bcfbe99629b5a!2sOutlets%20Shopping%20Mall!5e0!3m2!1spt-BR!2sao!4v1234567890123!5m2!1spt-BR!2sao"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Outlets Shopping Mall - CORTE VIP Location"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="bg-muted hover-glow" data-testid="card-address">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Endereço</h3>
                    <p className="text-muted-foreground">Avenida comandante fidel de Castro, km - 30 defronte a Vila Pacifica</p>
                    <p className="text-muted-foreground">zango 0 Outlet fashion Mall</p>
                    <p className="text-muted-foreground">Angola</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted hover-glow" data-testid="card-phone">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-primary">Telefone</h3>
                    <p className="text-muted-foreground">+244 931 996 699 (Shopping)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground" data-testid="card-whatsapp">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <SiWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">WhatsApp - Agendamento</h3>
                    <div className="space-y-2">
                      {whatsappNumbers.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm hover:underline"
                          data-testid={`link-whatsapp-${index}`}
                        >
                          {item.number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
