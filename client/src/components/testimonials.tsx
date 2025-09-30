import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTestimonialSchema, type Testimonial } from "@shared/schema";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const testimonialFormSchema = insertTestimonialSchema.extend({
  rating: z.number().min(1).max(5),
});

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      clientName: "",
      rating: 5,
      comment: "",
      service: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof testimonialFormSchema>) =>
      apiRequest("/api/testimonials", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Depoimento enviado!",
        description: "Obrigado pelo seu feedback. Seu depoimento será revisado em breve.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar seu depoimento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof testimonialFormSchema>) => {
    createMutation.mutate(data);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-primary text-primary" : "text-muted"}`}
      />
    ));
  };

  return (
    <section id="depoimentos" className="py-20 px-4 bg-card" ref={ref} data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text-gradient" data-testid="text-testimonials-title">
            Depoimentos de Clientes
          </h2>
          <p className="text-muted-foreground text-lg mb-6">O que nossos clientes dizem sobre nós</p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="gold-gradient hover:opacity-90 text-primary-foreground font-semibold"
            data-testid="button-add-testimonial"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Deixar Depoimento
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">Seja o primeiro a deixar um depoimento!</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="testimonials-grid"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                data-testid={`testimonial-${index}`}
              >
                <Card className="bg-muted hover-glow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-foreground mb-4 italic">"{testimonial.comment}"</p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-primary">{testimonial.clientName}</p>
                      {testimonial.service && (
                        <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]" data-testid="testimonial-dialog">
            <DialogHeader>
              <DialogTitle className="text-primary font-display text-2xl">Deixar Depoimento</DialogTitle>
              <DialogDescription>
                Compartilhe sua experiência conosco. Seu feedback é muito importante!
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} data-testid="input-client-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço Realizado (Opcional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="Selecione o serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Corte Francês">Corte Francês</SelectItem>
                          <SelectItem value="Corte Dois Tempo">Corte Dois Tempo</SelectItem>
                          <SelectItem value="Corte Obama / Moicano">Corte Obama / Moicano</SelectItem>
                          <SelectItem value="Pintura">Pintura</SelectItem>
                          <SelectItem value="Manicure/Pedicure">Manicure/Pedicure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avaliação</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => field.onChange(star)}
                              className="transition-transform hover:scale-110"
                              data-testid={`star-${star}`}
                            >
                              <Star
                                className={`w-8 h-8 ${star <= field.value ? "fill-primary text-primary" : "text-muted"}`}
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Comentário</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte-nos sobre sua experiência..."
                          className="min-h-[100px]"
                          {...field}
                          data-testid="textarea-comment"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gold-gradient hover:opacity-90 text-primary-foreground font-semibold"
                  disabled={createMutation.isPending}
                  data-testid="button-submit-testimonial"
                >
                  {createMutation.isPending ? "Enviando..." : "Enviar Depoimento"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
