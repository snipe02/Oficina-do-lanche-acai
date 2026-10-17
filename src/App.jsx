import { useCallback, useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Ingredients from "./components/Ingredients";
import HowItWorks from "./components/HowItWorks";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BuilderModal from "./components/BuilderModal";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import { useProtection } from "./hooks/useProtection";
import {
  WHATSAPP_NUMBER,
  getLimits,
  getProduct,
  ingName,
  ingPrice,
  money,
} from "./data";

const EMPTY_SELECTION = { fruits: [], toppings: [], syrups: [], paid: {} };
const DEFAULT_PRODUCT = "s1-400";

const newUid = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function buildWhatsAppMessage(cart, total) {
  const lines = ["Olá! Quero fazer um pedido no *Monte Seu Creme* 🍦", ""];

  cart.forEach((item) => {
    lines.push(`*${item.qty}x ${item.label}* — ${money(item.unitPrice * item.qty)}`);
    if (item.fruits.length) lines.push(`   • Frutas: ${item.fruits.join(", ")}`);
    if (item.toppings.length) lines.push(`   • Acompanhamentos: ${item.toppings.join(", ")}`);
    if (item.syrups.length) lines.push(`   • Caldas: ${item.syrups.join(", ")}`);
    if (item.paid.length)
      lines.push(`   • Cremes pagos: ${item.paid.map((p) => `${p.qty}x ${p.name}`).join(", ")}`);
    lines.push("");
  });

  lines.push(`*Total: ${money(total)}*`, "", "Aguardo a confirmação. Obrigado! 😊");
  return lines.join("\n");
}

export default function App() {
  useProtection();

  const [productId, setProductId] = useState(DEFAULT_PRODUCT);
  const [sel, setSel] = useState(EMPTY_SELECTION);
  const [cart, setCart] = useState([]);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [shakeCat, setShakeCat] = useState(null);

  const toastTimer = useRef();
  const product = getProduct(productId);
  const limits = getLimits(product);

  const total =
    product.price +
    Object.entries(sel.paid).reduce((sum, [id, qty]) => sum + ingPrice(id) * qty, 0);
  const cartTotal = cart.reduce((sum, it) => sum + it.unitPrice * it.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  /* ---------- Toast ---------- */
  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }, []);

  /* ---------- Scroll lock + ESC ---------- */
  useEffect(() => {
    document.body.style.overflow = builderOpen || cartOpen ? "hidden" : "";
  }, [builderOpen, cartOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (cartOpen) setCartOpen(false);
      else if (builderOpen) setBuilderOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [builderOpen, cartOpen]);

  /* ---------- Builder ---------- */
  const selectProduct = useCallback((id) => {
    const p = getProduct(id);
    if (!p) return;
    const nextLimits = getLimits(p);
    setProductId(id);
    // corta seleções que ultrapassem o novo limite
    setSel((s) => ({
      ...s,
      fruits: s.fruits.slice(0, nextLimits.fruits),
      toppings: s.toppings.slice(0, nextLimits.toppings),
      syrups: s.syrups.slice(0, nextLimits.syrups),
    }));
  }, []);

  const openBuilder = useCallback(
    (id) => {
      if (id) selectProduct(id);
      setBuilderOpen(true);
    },
    [selectProduct],
  );

  const toggleIngredient = (cat, id) => {
    const current = sel[cat];
    if (current.includes(id)) {
      setSel({ ...sel, [cat]: current.filter((x) => x !== id) });
      return;
    }
    if (current.length >= limits[cat]) {
      showToast("Limite atingido para esta categoria 😉");
      setShakeCat(cat);
      setTimeout(() => setShakeCat(null), 320);
      return;
    }
    setSel({ ...sel, [cat]: [...current, id] });
  };

  const changePaid = (id, delta) => {
    const next = Math.max(0, Math.min(10, (sel.paid[id] || 0) + delta));
    const paid = { ...sel.paid };
    if (next === 0) delete paid[id];
    else paid[id] = next;
    setSel({ ...sel, paid });
  };

  /* ---------- Carrinho ---------- */
  const addToCart = () => {
    const item = {
      uid: newUid(),
      productId: product.id,
      label: product.label,
      qty: 1,
      unitPrice: total,
      fruits: sel.fruits.map((id) => ingName("fruits", id)),
      toppings: sel.toppings.map((id) => ingName("toppings", id)),
      syrups: sel.syrups.map((id) => ingName("syrups", id)),
      paid: Object.entries(sel.paid).map(([id, qty]) => ({
        name: ingName("paid", id),
        qty,
        price: ingPrice(id),
      })),
    };

    setCart((c) => [...c, item]);
    setBuilderOpen(false);
    setTimeout(() => setCartOpen(true), 260);
    showToast("Adicionado ao carrinho! 🍨");
    setSel(EMPTY_SELECTION); // limpa para o próximo creme
  };

  const changeCartQty = (uid, delta) =>
    setCart((c) =>
      c
        .map((i) => (i.uid === uid ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );

  const removeFromCart = (uid) => {
    setCart((c) => c.filter((i) => i.uid !== uid));
    showToast("Item removido");
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const text = encodeURIComponent(buildWhatsAppMessage(cart, cartTotal));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
  };

  return (
    <>
      <Navbar onOpenBuilder={openBuilder} />
      <main>
        <Hero onOpenBuilder={openBuilder} />
        <Menu onOpenBuilder={openBuilder} />
        <Ingredients />
        <HowItWorks />
        <FinalCTA onOpenBuilder={openBuilder} />
      </main>
      <Footer />

      {/* Botão flutuante do carrinho */}
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] w-14 h-14 bg-brand-purple text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-chocolate hover:scale-105 transition-all duration-300"
        aria-label="Abrir carrinho"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[24px] h-6 px-1.5 bg-brand-gold text-brand-purple font-poppins font-bold text-xs rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <BuilderModal
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        product={product}
        limits={limits}
        sel={sel}
        total={total}
        shakeCat={shakeCat}
        onSelectProduct={selectProduct}
        onToggle={toggleIngredient}
        onChangePaid={changePaid}
        onAdd={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onChangeQty={changeCartQty}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />

      <Toast message={toast.msg} visible={toast.visible} />
    </>
  );
}
