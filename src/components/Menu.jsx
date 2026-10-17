import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { PRODUCTS } from "../data";
import acai from "../assets/acai.png";
import acai2 from "../assets/acai2.jpeg";

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function MenuCard({ product, index, onOpenBuilder }) {
  const duplo = product.group === "duplo";
  const { fruits, toppings, syrups } = product.limits;

  return (
    <Reveal
      delay={index * 100}
      onClick={() => onOpenBuilder(product.id)}
      className={`group cursor-pointer bg-brand-cream rounded-2xl sm:rounded-3xl p-2 sm:p-6 border border-brand-purple/5 hover:shadow-2xl transition-all duration-500 flex flex-col ${
        duplo ? "hover:border-brand-strawberry/30" : "hover:border-brand-gold/30"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenBuilder(product.id);
        }
      }}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-6">
        <img
          src={duplo ? acai2 : acai}
          alt={`${product.label}`}
          loading="lazy"
          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
        />
        <span
          className={`absolute top-1.5 left-1.5 sm:top-4 sm:left-4 font-poppins font-bold text-[10px] sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full shadow-sm ${
            duplo
              ? "bg-brand-strawberry text-white"
              : "bg-white/90 backdrop-blur-sm text-brand-purple"
          }`}
        >
          {duplo ? `2x ${product.size}` : product.size}
        </span>
      </div>
      <h4 className="font-poppins font-bold text-xs sm:text-xl text-brand-purple mb-1 sm:mb-2 leading-tight">
        {duplo ? `Duplo ${product.size}` : product.label}
      </h4>
      <p className="text-[10px] sm:text-sm text-brand-chocolate/70 mb-2 sm:mb-4 leading-tight flex-1">
        {plural(fruits, "Fruta", "Frutas")} • {toppings} Acomp. •{" "}
        {plural(syrups, "Calda", "Caldas")}
      </p>
      <div className="flex items-center justify-between gap-1">
        <span className="font-poppins font-extrabold text-xs sm:text-2xl text-brand-purple">
          R$ {product.price}
          <span className="hidden sm:inline">,00</span>
        </span>
        <span className="w-6 h-6 sm:w-10 sm:h-10 bg-brand-gold text-brand-purple rounded-full flex items-center justify-center group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300 shrink-0">
          <Plus className="w-3 h-3 sm:w-5 sm:h-5" />
        </span>
      </div>
    </Reveal>
  );
}

function Group({ title, badge, badgeClass, group, onOpenBuilder }) {
  return (
    <div className={group === "single" ? "mb-12 sm:mb-16" : ""}>
      <h3 className="font-poppins font-semibold text-lg sm:text-2xl text-brand-purple mb-5 sm:mb-8 flex items-center gap-2 sm:gap-3">
        <span
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 ${badgeClass}`}
        >
          {badge}
        </span>
        {title}
      </h3>
      <div className="menu-grid">
        {PRODUCTS.filter((p) => p.group === group).map((p, i) => (
          <MenuCard key={p.id} product={p} index={i} onOpenBuilder={onOpenBuilder} />
        ))}
      </div>
    </div>
  );
}

export default function Menu({ onOpenBuilder }) {
  return (
    <section id="cardapio" className="py-14 sm:py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block bg-brand-purple/10 text-brand-purple font-poppins font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4">
            Cardápio
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-purple mb-4">
            Escolha seu tamanho
          </h2>
          <p className="text-base sm:text-lg text-brand-chocolate/70 px-2">
            Cada copo é montado na hora com ingredientes frescos e de alta
            qualidade. Toque em um copo para personalizar.
          </p>
        </Reveal>

        <Group
          title="Sendo só 1 creme"
          badge="1"
          badgeClass="bg-brand-gold"
          group="single"
          onOpenBuilder={onOpenBuilder}
        />
        <Group
          title="Sendo 2 cremes"
          badge="2"
          badgeClass="bg-brand-strawberry text-white"
          group="duplo"
          onOpenBuilder={onOpenBuilder}
        />
      </div>
    </section>
  );
}
