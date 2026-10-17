import { IceCream, MessageCircle, ShoppingBag, X } from "lucide-react";
import { usePresence } from "../hooks/usePresence";
import { money } from "../data";

function Detail({ label, children }) {
  return (
    <>
      <b>{label}:</b> {children}
      <br />
    </>
  );
}

export default function CartDrawer({ open, onClose, cart, total, onChangeQty, onRemove, onCheckout }) {
  const { mounted, shown } = usePresence(open, 300);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-label="Seu pedido">
      <div className="absolute inset-0 bg-brand-purple/60 backdrop-blur-sm" onClick={onClose} />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-brand-cream shadow-2xl flex flex-col transition-transform duration-300 ${
          shown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-white border-b border-brand-purple/10 shrink-0">
          <h3 className="font-poppins font-bold text-lg sm:text-xl text-brand-purple flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Seu pedido
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-brand-purple/5 hover:bg-brand-purple/10 flex items-center justify-center text-brand-purple transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto nice-scroll px-4 sm:px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-brand-purple/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <IceCream className="w-8 h-8 text-brand-purple/40" />
              </div>
              <p className="font-poppins font-semibold text-brand-purple">Seu carrinho está vazio</p>
              <p className="text-sm text-brand-chocolate/60 mt-1">Monte um creme delicioso para começar.</p>
            </div>
          ) : (
            cart.map((item) => {
              const hasDetails =
                item.fruits.length || item.toppings.length || item.syrups.length || item.paid.length;
              return (
                <div key={item.uid} className="bg-white rounded-2xl p-4 shadow-sm border border-brand-purple/5">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-poppins font-semibold text-brand-purple">{item.label}</p>
                      {hasDetails ? (
                        <p className="text-xs text-brand-chocolate/60 mt-1.5 leading-relaxed">
                          {item.fruits.length > 0 && <Detail label="Frutas">{item.fruits.join(", ")}</Detail>}
                          {item.toppings.length > 0 && <Detail label="Acomp.">{item.toppings.join(", ")}</Detail>}
                          {item.syrups.length > 0 && <Detail label="Caldas">{item.syrups.join(", ")}</Detail>}
                          {item.paid.length > 0 && (
                            <Detail label="Extras">
                              {item.paid.map((p) => `${p.qty}x ${p.name}`).join(", ")}
                            </Detail>
                          )}
                        </p>
                      ) : (
                        <p className="text-xs text-brand-chocolate/40 mt-1.5 italic">Sem adicionais</p>
                      )}
                    </div>
                    <p className="font-poppins font-bold text-brand-purple text-right shrink-0">
                      {money(item.unitPrice * item.qty)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-purple/5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onChangeQty(item.uid, -1)}
                        aria-label="Diminuir quantidade"
                        className="w-8 h-8 rounded-full border border-brand-purple/15 text-brand-purple font-bold leading-none hover:bg-brand-purple/5 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-poppins font-bold text-brand-purple">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChangeQty(item.uid, 1)}
                        aria-label="Aumentar quantidade"
                        className="w-8 h-8 rounded-full border border-brand-purple/15 text-brand-purple font-bold leading-none hover:bg-brand-purple/5 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(item.uid)}
                      className="text-xs font-medium text-brand-strawberry hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white border-t border-brand-purple/10 px-4 sm:px-6 py-5 space-y-4 safe-bottom shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-medium text-brand-chocolate/70">Total</span>
            <span className="font-poppins font-extrabold text-xl sm:text-2xl text-brand-purple">
              {money(total)}
            </span>
          </div>
          <button
            type="button"
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-purple font-poppins font-bold px-6 py-4 rounded-full hover:bg-brand-purple hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-gold disabled:hover:text-brand-purple"
          >
            <MessageCircle className="w-5 h-5" />
            Finalizar no WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}
