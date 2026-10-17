# Monte Seu Creme — Oficina do Lanche

Site de pedidos (Vite + React + Tailwind CSS). O cliente monta o creme, o carrinho gera a mensagem e o pedido é finalizado pelo WhatsApp.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/ para publicar
npm run preview  # testa o build localmente
```

## Configurar

- **WhatsApp da loja**: copie `.env.example` para `.env` e ajuste `VITE_WHATSAPP_NUMBER` (DDI+DDD+número, só dígitos).
- **Preços, tamanhos e ingredientes**: `src/data.js`.
- **Cores e fontes**: `tailwind.config.js`.

## Estrutura

```
src/
  App.jsx              estado (builder, carrinho, toast) e checkout
  data.js              produtos, ingredientes e helpers
  components/          Navbar, Hero, Menu, Ingredients, HowItWorks,
                       FinalCTA, Footer, BuilderModal, CartDrawer, Toast, Reveal
  hooks/               usePresence (animação de modal), useProtection
  assets/              imagens
```
