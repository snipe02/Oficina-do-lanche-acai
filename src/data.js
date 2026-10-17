/* WhatsApp da loja (DDI+DDD+número). Pode ser definido em .env → VITE_WHATSAPP_NUMBER */
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "5586995186802";

export const PRODUCTS = [
  { id: "s1-300", group: "single", label: "Copo 300ml", size: "300ml", cups: 1, price: 20, limits: { fruits: 1, toppings: 3, syrups: 1 } },
  { id: "s1-400", group: "single", label: "Copo 400ml", size: "400ml", cups: 1, price: 24, limits: { fruits: 2, toppings: 4, syrups: 2 } },
  { id: "s1-500", group: "single", label: "Copo 500ml", size: "500ml", cups: 1, price: 28, limits: { fruits: 3, toppings: 5, syrups: 3 } },
  { id: "s2-300", group: "duplo", label: "Copo Duplo 300ml", size: "300ml", cups: 1, price: 24, limits: { fruits: 1, toppings: 3, syrups: 1 } },
  { id: "s2-400", group: "duplo", label: "Copo Duplo 400ml", size: "400ml", cups: 1, price: 28, limits: { fruits: 2, toppings: 4, syrups: 2 } },
  { id: "s2-500", group: "duplo", label: "Copo Duplo 500ml", size: "500ml", cups: 1, price: 30, limits: { fruits: 3, toppings: 5, syrups: 3 } },
];

export const INGREDIENTS = {
  fruits: [
    { id: "morango", name: "Morango" },
    { id: "banana", name: "Banana" },
    { id: "uva", name: "Uva" },
  ],
  toppings: [
    { id: "pacoca", name: "Paçoca" },
    { id: "ovomaltine", name: "Ovomaltine" },
    { id: "tubetes", name: "Tubetes" },
    { id: "granola", name: "Granola" },
    { id: "gotas-chocolate", name: "Gotas de Chocolate" },
    { id: "leite-po", name: "Leite em Pó" },
    { id: "mm", name: "M&M" },
    { id: "chocoball", name: "Chocoball" },
    { id: "marshmallow", name: "Marshmallow" },
    { id: "amendoim", name: "Amendoim" },
    { id: "mini-oreo", name: "Biscoito Mini Oreo" },
  ],
  syrups: [
    { id: "chocolate", name: "Chocolate" },
    { id: "morango-calda", name: "Morango" },
    { id: "leite-condensado", name: "Leite Condensado" },
    { id: "doce-leite", name: "Doce de Leite" },
  ],
  paid: [
    { id: "ninho", name: "Ninho Premium", price: 4 },
    { id: "nutella", name: "Creme Nutella", price: 4 },
    { id: "ninho-oreo", name: "Ninho c/ Oreo", price: 4 },
  ],
};

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

export const getLimits = (p) => ({
  fruits: p.limits.fruits * p.cups,
  toppings: p.limits.toppings * p.cups,
  syrups: p.limits.syrups * p.cups,
});

export const ingName = (cat, id) =>
  (INGREDIENTS[cat].find((i) => i.id === id) || {}).name || id;

export const ingPrice = (id) =>
  (INGREDIENTS.paid.find((i) => i.id === id) || {}).price || 0;

export const money = (v) => "R$ " + v.toFixed(2).replace(".", ",");
