import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { id: 1, name: "Lavagem do Cabelo", price: "2.000,00" },
  { id: 2, name: "Laminagem Simples", price: "2.000,00" },
  { id: 3, name: "Escovinho Picante", price: "2.500,00" },
  { id: 4, name: "Laminagem com Pintura Preta", price: "3.000,00" },
  { id: 5, name: "Depilação da barba com Pó Magic", price: "3.000,00" },
  { id: 6, name: "Corte Obama / Moicano", price: "3.500,00" },
  { id: 7, name: "Escovinha Cheio", price: "3.500,00" },
  { id: 8, name: "Corte Francês", price: "4.000,00" },
  { id: 9, name: "Corte Dois Tempo", price: "4.000,00" },
  { id: 10, name: "Corte completo + Pintura Preta", price: "6.500,00" },
  { id: 11, name: "Pintura em cor Loiro sem corte", price: "8.000,00" },
  { id: 12, name: "Pintura em cor Platinada ou Branca", price: "15.000,00" },
  { id: 13, name: "Pintura em cor Loira + corte", price: "10.000,00" },
  { id: 14, name: "Pintura em cor Loira, cor Branca e cor Platinada em cabelos longos", price: "20.000,00" },
  { id: 15, name: "Manicure", price: "3.000,00" },
  { id: 16, name: "Pedicure", price: "5.000,00" },
  { id: 17, name: "Pintura das unhas do Pé", price: "2.000,00" },
];

export default function PricingTables() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="precos-fixos" className="py-20 px-4 bg-card" ref={ref} data-testid="section-pricing-fixed">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary" data-testid="text-pricing-title">
            Tabela de Preços Fixo
          </h2>
          <p className="text-muted-foreground text-lg">Serviços profissionais com preços transparentes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto hover-glow rounded-lg border border-border"
          data-testid="table-pricing-fixed"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="dark-gradient">
                <th className="px-6 py-4 text-center w-20 text-primary-foreground font-bold uppercase tracking-wide text-sm">Nº</th>
                <th className="px-6 py-4 text-primary-foreground font-bold uppercase tracking-wide text-sm">Designação</th>
                <th className="px-6 py-4 text-right w-40 text-primary-foreground font-bold uppercase tracking-wide text-sm">Valor (Kz)</th>
              </tr>
            </thead>
            <tbody className="bg-muted">
              {services.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="border-b border-border hover:bg-primary/10 transition-colors duration-300"
                  data-testid={`row-service-${service.id}`}
                >
                  <td className="px-6 py-4 text-center font-semibold text-primary" data-testid={`text-service-number-${service.id}`}>
                    {service.id.toString().padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4 font-medium" data-testid={`text-service-name-${service.id}`}>
                    {service.name}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-primary" data-testid={`text-service-price-${service.id}`}>
                    {service.price}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
