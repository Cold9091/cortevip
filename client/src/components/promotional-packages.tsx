import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Calendar, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const packages = [
  {
    day: "Segunda-Feira",
    price: "8.000",
    services: ["Corte Dois Tempos", "Manicure", "Pedicure"],
  },
  {
    day: "Quarta-Feira",
    price: "8.000",
    services: ["Corte Picante", "Manicure", "Pedicure"],
  },
];

export default function PromotionalPackages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="precos-promocionais" className="py-20 px-4 bg-background" ref={ref} data-testid="section-pricing-promotional">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wide">
              Oferta Especial
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary" data-testid="text-promotional-title">
            Tabela de Preços Promocional
          </h2>
          <p className="text-muted-foreground text-lg">Pacotes especiais em dias selecionados</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.day}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              data-testid={`card-package-${index}`}
            >
              <Card className="bg-card border-2 border-primary hover-glow h-full">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl font-bold text-primary" data-testid={`text-package-day-${index}`}>
                      {pkg.day}
                    </h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary" data-testid={`text-package-price-${index}`}>
                        {pkg.price} Kz
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {pkg.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-start gap-3" data-testid={`service-${index}-${serviceIndex}`}>
                        <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
          data-testid="card-package-alternative"
        >
          <Card className="bg-card border-2 border-primary hover-glow">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-primary">Segunda à Quarta-Feira</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">8.000 Kz</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Corte Francês + Manicure + Pedicure</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto space-y-6"
        >
          <Card className="bg-muted border-l-4 border-primary" data-testid="card-notice-observation">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary text-lg">Observação Importante</h4>
                  <p className="text-muted-foreground">
                    Na eventualidade da não adesão aos Pacotes Promocional nos três dias em referência,
                    aplica-se a Tabela de Preços Fixo em vigor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border" data-testid="card-notice-appointment">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary text-lg">Faça o Seu Agendamento</h4>
                  <p className="text-muted-foreground">
                    Por formas a garantirmos uma melhor gestão no atendimento aos nossos clientes,
                    nos dias em que vigora a Tabela de Preço Promocional, sugerimos que faça com a
                    devida antecedência o seu agendamento ou respectiva Marcação.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
