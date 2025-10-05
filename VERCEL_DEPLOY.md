# Deploy no Vercel - Guia Completo

Este projeto está configurado para deploy completo no Vercel com backend serverless e frontend estático.

## 🚀 Passos para Deploy

### 1. Preparar o Repositório
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
4. Configure as seguintes opções:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detectado)
   - **Output Directory:** `dist` (auto-detectado)
   - **Install Command:** `npm install` (auto-detectado)

### 3. Configurar Variáveis de Ambiente
No dashboard do Vercel, vá em **Settings → Environment Variables** e adicione:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

**Como obter DATABASE_URL:**

#### Opção A: Vercel Postgres (Recomendado)
1. No dashboard do projeto, vá em **Storage**
2. Clique em **Create Database → Postgres**
3. A variável `DATABASE_URL` será automaticamente adicionada

#### Opção B: Neon (Grátis e Serverless)
1. Acesse [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie a connection string
4. Cole em **DATABASE_URL** no Vercel

#### Opção C: Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings → Database
4. Copie a "Connection String" (modo Connection pooling)
5. Cole em **DATABASE_URL** no Vercel

### 4. Migrar o Banco de Dados
Após configurar DATABASE_URL:

```bash
# Localmente, com a DATABASE_URL do Vercel
export DATABASE_URL="sua-connection-string"
npm run db:push
```

Ou crie as tabelas manualmente no console SQL do seu provedor.

### 5. Deploy
1. Clique em **Deploy** no Vercel
2. Aguarde o build completar
3. Acesse o URL fornecido pelo Vercel

## 📁 Estrutura do Projeto

```
├── api/              # Backend serverless (Vercel Functions)
│   └── index.ts      # Função principal da API
├── client/           # Frontend Vite/React
│   ├── src/
│   └── index.html
├── shared/           # Tipos compartilhados
│   └── schema.ts
├── vercel.json       # Configuração do Vercel
├── db.ts             # Conexão com banco (Neon serverless)
└── .vercelignore     # Arquivos ignorados no deploy
```

## 🔧 Como Funciona

### Frontend
- Build estático do Vite
- Servido diretamente pelo Vercel CDN
- Todos os assets em `/dist`

### Backend
- Função serverless em `/api`
- Rotas disponíveis em `/api/*`
- Executa em Node.js 20.x

### Banco de Dados
- PostgreSQL via Neon (HTTP-based)
- Otimizado para serverless
- Sem connection pooling necessário

## 🌐 URLs após Deploy

- **Frontend:** `https://seu-projeto.vercel.app`
- **API:** `https://seu-projeto.vercel.app/api`

## 🔒 Variáveis de Ambiente Necessárias

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | Connection string PostgreSQL | ✅ Sim |

## ⚡ Limitações Serverless

- **Timeout:** 10 segundos (Hobby), 60s (Pro)
- **Tamanho:** 250MB por função
- **Memória:** 1024MB (Hobby), 3000MB (Pro)
- **Cold Start:** ~200-500ms

## 🐛 Troubleshooting

### Erro: "DATABASE_URL must be set"
- Verifique se a variável está configurada em **Environment Variables**
- Redeploy o projeto após adicionar a variável

### Erro: "Cannot find module"
- Verifique se todas as dependências estão em `dependencies` (não `devDependencies`)
- Rode `npm install` localmente e commit o `package-lock.json`

### API retorna 404
- Verifique se o arquivo `api/index.ts` existe
- Confirme que o `vercel.json` está na raiz do projeto

### Build falha
- Rode `npm run build` localmente para identificar erros
- Verifique os logs de build no Vercel

## 📝 Comandos Úteis

```bash
# Testar build localmente
npm run build

# Testar localmente com Vercel CLI
npx vercel dev

# Deploy via CLI
npx vercel --prod

# Ver logs
npx vercel logs
```

## 🎯 Checklist Final

- [ ] Código commitado no GitHub
- [ ] Projeto importado no Vercel
- [ ] DATABASE_URL configurado
- [ ] Banco de dados migrado (`npm run db:push`)
- [ ] Deploy concluído com sucesso
- [ ] Site acessível via URL do Vercel
- [ ] API respondendo em `/api`

## 🚀 Próximos Passos

1. **Domínio Custom:** Configure em Settings → Domains
2. **Analytics:** Ative em Analytics tab
3. **Monitoring:** Configure alertas em Settings → Integrations
4. **CI/CD:** Já configurado automaticamente via GitHub

---

✅ **Projeto pronto para produção no Vercel!**
