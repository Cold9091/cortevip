# Deploy no Vercel - Landing Page Estática

Este projeto é uma landing page estática pronta para deploy no Vercel.

## 🚀 Passos para Deploy

### 1. Preparar o Repositório Git
```bash
git init
git add .
git commit -m "Preparado para deploy no Vercel"
git remote add origin <seu-repositorio-github>
git push -u origin main
```

### 2. Importar no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. O Vercel detectará automaticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 3. Deploy
1. Clique em **Deploy**
2. Aguarde o build completar (1-2 minutos)
3. Acesse o URL fornecido: `https://seu-projeto.vercel.app`

## 📁 Estrutura do Projeto

```
├── client/           # Frontend Vite/React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── index.html
│   └── public/      # Assets estáticos (favicon, imagens)
├── vercel.json      # Configuração do Vercel
└── dist/            # Build output (gerado automaticamente)
```

## 🔧 Como Funciona

### Frontend
- **Build Tool:** Vite
- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animações:** Framer Motion
- **Deploy:** Estático via Vercel CDN

### Performance
- **CDN Global:** Conteúdo servido de edge locations
- **Cache Automático:** Assets cacheados automaticamente
- **Compressão:** Brotli/Gzip automático
- **HTTPS:** SSL/TLS gratuito

## 🌐 URLs após Deploy

- **Site:** `https://seu-projeto.vercel.app`
- **Preview:** URL único para cada branch/PR

## ⚙️ Configuração Opcional

### Domínio Personalizado
1. Vá em **Settings → Domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Analytics
1. Vá em **Analytics** tab
2. Ative Vercel Analytics
3. Visualize métricas de performance

### Environment Variables
Nenhuma variável é necessária para o site funcionar. Se precisar adicionar no futuro:
1. Vá em **Settings → Environment Variables**
2. Adicione variáveis com prefixo `VITE_`
3. Redeploy para aplicar

## 🐛 Troubleshooting

### Build falha
```bash
# Teste o build localmente
npm run build

# Verifique erros no terminal
npm run dev
```

### Erro 404 em rotas
- O projeto usa client-side routing (Wouter)
- O `vercel.json` já está configurado para SPA
- Verifique se `cleanUrls: true` está no `vercel.json`

### Imagens não carregam
- Coloque imagens em `client/public/`
- Ou importe via `@assets/` no código
- Verifique caminhos relativos

### Favicon não aparece
- Arquivo deve estar em `client/public/favicon.png`
- Referenciado em `client/index.html`
- Limpe cache do navegador (Ctrl+F5)

## 📝 Comandos Úteis

```bash
# Build local
npm run build

# Preview do build
npm run preview

# Dev server
npm run dev

# Deploy via Vercel CLI (opcional)
npx vercel --prod
```

## 🎯 Checklist de Deploy

- [x] `vercel.json` configurado
- [x] Build scripts no `package.json`
- [x] Favicon em `client/public/`
- [ ] Código commitado no Git
- [ ] Push para GitHub
- [ ] Projeto importado no Vercel
- [ ] Deploy concluído
- [ ] Site acessível

## 🚀 Recursos do Vercel (Grátis)

- ✅ Deploys ilimitados
- ✅ SSL automático
- ✅ CDN global
- ✅ Preview deployments (PRs)
- ✅ Analytics básico
- ✅ 100GB bandwidth/mês

## 🔄 Deploy Automático

Após configurar:
- **Push to main:** Deploy automático em produção
- **Pull Request:** Preview deploy único
- **Rollback:** Reverta para deploys anteriores

## 📱 Otimizações Incluídas

- ✅ Compressão de assets
- ✅ Code splitting automático
- ✅ Tree shaking (dead code removal)
- ✅ CSS minificado
- ✅ Imagens otimizadas
- ✅ Fonts preloaded

---

## 🎉 Pronto para Produção!

Seu site CORTE VIP está otimizado e pronto para receber visitantes do mundo todo via Vercel CDN.

**URL esperado:** `https://corte-vip.vercel.app` (ou seu domínio personalizado)
