import { Apple, CupSoda, Cookie, Droplet, IceCream, PlusCircle, ShoppingBag, X } from "lucide-react";
import { usePresence } from "../hooks/usePresence";
import { INGREDIENTS, PRODUCTS, money } from "../data";
import acai from "../assets/acai.png";
import acai2 from "../assets/acai2.jpeg";

const SECTIONS = [
  { cat: "fruits", title: "Frutas", Icon: Apple, iconClass: "text-brand-strawberry" },
  { cat: "toppings", title: "Acompanhamentos", Icon: Cookie, iconClass: "text-brand-gold" },
  { cat: "syrups", title: "Caldas", Icon: Droplet, iconClass: "text-brand-purple" },
];

function SizeButtons({ group, productId, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PRODUCTS.filter((p) => p.group === group).map((p) => {
        const active = productId === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            aria-pressed={active}
            className={`text-left rounded-2xl border px-2.5 py-2.5 sm:px-3 sm:py-3 transition-all duration-200 ${
              active
                ? "border-brand-purple bg-brand-purple text-white shadow-lg"
                : "border-brand-purple/10 bg-white hover:border-brand-purple/40"
            }`}
          >
            <span className={`block font-poppins font-bold text-xs sm:text-sm ${active ? "text-white" : "text-brand-purple"}`}>
              {p.size}
            </span>
            <span className={`block text-[10px] sm:text-xs mt-0.5 ${active ? "text-white/80" : "text-brand-chocolate/60"}`}>
              {money(p.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ChipSection({ cat, title, Icon, iconClass, selected, limit, shaking, onToggle }) {
  const full = selected.length >= limit;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-poppins font-semibold text-brand-purple flex items-center gap-2 text-sm sm:text-base">
          <Icon className={`w-4 h-4 ${iconClass}`} />
          {title}
        </h4>
        <span
          className={`text-xs font-poppins font-bold px-2.5 py-1 rounded-full ${
            full
              ? "bg-brand-strawberry/15 text-brand-strawberry"
              : "bg-brand-purple/10 text-brand-purple"
          } ${shaking ? "shake" : ""}`}
        >
          {selected.length}/{limit}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {INGREDIENTS[cat].map((it) => {
          const active = selected.includes(it.id);
          const disabled = !active && full;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onToggle(cat, it.id)}
              aria-pressed={active}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-brand-purple text-white border-brand-purple shadow-md"
                  : disabled
                    ? "bg-white/60 text-brand-chocolate/30 border-brand-purple/5 cursor-not-allowed"
                    : "bg-white text-brand-chocolate/80 border-brand-purple/10 hover:border-brand-purple/40 hover:-translate-y-0.5"
              }`}
            >
              {it.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BuilderModal({
  open,
  onClose,
  product,
  limits,
  sel,
  total,
  shakeCat,
  onSelectProduct,
  onToggle,
  onChangePaid,
  onAdd,
}) {
  const { mounted, shown } = usePresence(open, 250);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Monte seu creme">
      <div className="absolute inset-0 bg-brand-purple/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative h-full w-full flex items-end sm:items-center justify-center sm:p-6 pointer-events-none">
        <div
          className={`pointer-events-auto bg-brand-cream w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            shown ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-4 sm:px-6 py-4 bg-white border-b border-brand-purple/10 shrink-0">
            <div className="min-w-0">
              <h3 className="font-poppins font-bold text-lg sm:text-xl text-brand-purple flex items-center gap-2">
                <IceCream className="w-5 h-5 text-brand-gold shrink-0" />
                Monte seu creme
              </h3>
              <p className="text-xs sm:text-sm text-brand-chocolate/60 mt-0.5 truncate">
                {product.label} • {product.group === "duplo" ? "2 cremes" : "1 creme"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 w-10 h-10 rounded-full bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center text-brand-purple transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto nice-scroll px-4 sm:px-6 py-5 sm:py-6 space-y-6 sm:space-y-8">
            {/* Tamanhos */}
            <div>
              <h4 className="font-poppins font-semibold text-brand-purple flex items-center gap-2 text-sm sm:text-base mb-3">
                <CupSoda className="w-4 h-4 text-brand-gold" />
                Tamanho do copo
              </h4>

              <p className="flex items-center gap-1 text-[10px] sm:text-xs font-poppins font-semibold text-brand-chocolate/50 uppercase tracking-wide mb-2">
                Sendo 1 creme
                <img src={acai} alt="" className="w-10 h-10 object-contain pointer-events-none" />
              </p>
              <div className="mb-4">
                <SizeButtons group="single" productId={product.id} onSelect={onSelectProduct} />
              </div>

              <p className="flex items-center gap-1 text-[10px] sm:text-xs font-poppins font-semibold text-brand-chocolate/50 uppercase tracking-wide mb-2">
                Sendo 2 cremes
                <img src={acai2} alt="" className="w-10 h-10 object-cover rounded-full pointer-events-none" />
              </p>
              <SizeButtons group="duplo" productId={product.id} onSelect={onSelectProduct} />
            </div>

            {SECTIONS.map((s) => (
              <ChipSection
                key={s.cat}
                {...s}
                selected={sel[s.cat]}
                limit={limits[s.cat]}
                shaking={shakeCat === s.cat}
                onToggle={onToggle}
              />
            ))}

            {/* Cremes pagos */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-poppins font-semibold text-brand-purple flex items-center gap-2 text-sm sm:text-base">
                  <PlusCircle className="w-4 h-4 text-brand-chocolate" />
                  Cremes pagos
                </h4>
                <span className="text-xs text-brand-chocolate/50">Opcional</span>
              </div>
              <div className="space-y-2">
                {INGREDIENTS.paid.map((it) => {
                  const qty = sel.paid[it.id] || 0;
                  return (
                    <div
                      key={it.id}
                      className={`flex items-center justify-between bg-white rounded-2xl px-3 sm:px-4 py-3 border transition-colors ${
                        qty > 0 ? "border-brand-gold" : "border-brand-purple/10"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-brand-chocolate text-xs sm:text-sm truncate">{it.name}</p>
                        <p className="text-[10px] sm:text-xs text-brand-chocolate/60">+ {money(it.price)}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onChangePaid(it.id, -1)}
                          aria-label={`Remover ${it.name}`}
                          className="w-8 h-8 rounded-full border border-brand-purple/15 text-brand-purple font-bold leading-none hover:bg-brand-purple/5 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-poppins font-bold text-brand-purple">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onChangePaid(it.id, 1)}
                          aria-label={`Adicionar ${it.name}`}
                          className="w-8 h-8 rounded-full bg-brand-gold text-brand-purple font-bold leading-none hover:bg-brand-purple hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-brand-purple/10 px-4 sm:px-6 py-4 flex items-center justify-between gap-3 sm:gap-4 safe-bottom shrink-0">
            <div>
              <p className="text-xs text-brand-chocolate/60">Total do creme</p>
              <p className="font-poppins font-extrabold text-xl sm:text-2xl text-brand-purple">
                {money(total)}
              </p>
            </div>
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-2 bg-brand-purple text-white font-poppins font-semibold px-5 sm:px-6 py-3.5 rounded-full hover:bg-brand-chocolate transition-colors duration-300 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
