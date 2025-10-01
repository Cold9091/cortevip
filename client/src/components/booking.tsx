import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Calendar, Clock, Scissors } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const services = [
  { value: "Lavagem do Cabelo", price: "2.000,00" },
  { value: "Laminagem Simples", price: "2.000,00" },
  { value: "Escovinho Picante", price: "2.500,00" },
  { value: "Corte Obama / Moicano", price: "3.500,00" },
  { value: "Corte Francês", price: "4.000,00" },
  { value: "Corte Dois Tempo", price: "4.000,00" },
  { value: "Corte completo + Pintura Preta", price: "6.500,00" },
  { value: "Pintura em cor Loiro sem corte", price: "8.000,00" },
  { value: "Manicure", price: "3.000,00" },
  { value: "Pedicure", price: "5.000,00" },
  { value: "Pacote Segunda/Quarta (Corte + Manicure + Pedicure)", price: "8.000,00" },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertAppointmentSchema>>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof insertAppointmentSchema>) =>
      apiRequest("/api/appointments", "POST", data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      
      const message = encodeURIComponent(
        `Olá! Gostaria de agendar um horário:\n\n` +
        `👤 Nome: ${variables.clientName}\n` +
        `📱 Telefone: ${variables.clientPhone}\n` +
        `✂️ Serviço: ${variables.service}\n` +
        `📅 Data Preferida: ${variables.preferredDate}\n` +
        `🕒 Horário Preferido: ${variables.preferredTime}\n` +
        (variables.notes ? `📝 Observações: ${variables.notes}\n` : '') +
        `\nAguardo confirmação. Obrigado!`
      );
      
      window.open(`https://wa.me/244923542349?text=${message}`, '_blank');
      
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Agendamento enviado!",
        description: "Você será redirecionado para o WhatsApp para confirmar seu agendamento.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível processar seu agendamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof insertAppointmentSchema>) => {
    createMutation.mutate(data);
  };

  return (
    <section id="agendamento" className="py-20 px-4 bg-background" ref={ref} data-testid="section-booking">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary" data-testid="text-booking-title">
            Agende Seu Horário
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Reserve seu atendimento de forma rápida e prática via WhatsApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-card to-muted border-2 border-primary hover-glow">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Scissors className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Escolha o Serviço</h3>
                  <p className="text-sm text-muted-foreground">Selecione o serviço desejado</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Defina Data e Hora</h3>
                  <p className="text-sm text-muted-foreground">Escolha o melhor horário</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <SiWhatsapp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Confirme via WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Finalize no WhatsApp</p>
                </div>
              </div>

              <Button
                onClick={() => setIsDialogOpen(true)}
                size="lg"
                className="w-full dark-gradient hover:opacity-90 text-foreground font-semibold text-lg py-6"
                data-testid="button-open-booking"
              >
                <SiWhatsapp className="w-6 h-6 mr-2" />
                Agendar Agora
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto" data-testid="booking-dialog">
            <DialogHeader>
              <DialogTitle className="text-primary font-display text-2xl">Agendar Horário</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo e confirme seu agendamento via WhatsApp
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone/WhatsApp *</FormLabel>
                      <FormControl>
                        <Input placeholder="+244 923 456 789" {...field} data-testid="input-phone" />
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
                      <FormLabel>Serviço Desejado *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-service">
                            <SelectValue placeholder="Selecione o serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.value} - {service.price} Kz
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Preferida *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} data-testid="input-date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário Preferido *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-time">
                            <SelectValue placeholder="Selecione o horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Alguma preferência ou observação?"
                          className="min-h-[80px]"
                          {...field}
                          value={field.value || ""}
                          data-testid="textarea-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full dark-gradient hover:opacity-90 text-foreground font-semibold"
                  disabled={createMutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {createMutation.isPending ? "Processando..." : (
                    <>
                      <SiWhatsapp className="w-5 h-5 mr-2" />
                      Confirmar via WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
