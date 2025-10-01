import { motion } from "framer-motion";
import { SiInstagram, SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background py-12 px-4 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-8 mb-8"
        >
          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-primary" data-testid="text-footer-brand">
              CORTE VIP
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Excelência em cuidados masculinos com serviços premium em Luanda.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/cortevip_oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://www.facebook.com/cortevipoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/20 hover:bg-primary/30 p-2 rounded-full transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <SiFacebook className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Horário</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Segunda - Quarta: Promoções Especiais</p>
              <p>Quinta - Domingo: Tabela Normal</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Navegação</h4>
            <div className="space-y-2 text-sm">
              <a href="#precos-fixos" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="link-nav-precos">
                Preços Fixos
              </a>
              <a href="#precos-promocionais" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="link-nav-promocoes">
                Promoções
              </a>
              <a href="#localizacao" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="link-nav-localizacao">
                Localização
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Contacto</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Outlets Shopping Mall, Luanda</p>
              <p>WhatsApp: +244 923 542 349</p>
              <p>Tel: +244 931 054 104</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-border pt-8 text-center"
        >
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            &copy; 2025 CORTE VIP. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2" data-testid="text-updated">
            Atualizado em 29 de Setembro de 2025
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
