import { Apple, Cookie, Droplet, PlusCircle } from "lucide-react";
import Reveal from "./Reveal";
import { INGREDIENTS, money } from "../data";

const CARDS = [
  { cat: "fruits", title: "Frutas", Icon: Apple, bg: "bg-brand-strawberry/10", text: "text-brand-strawberry", dot: "bg-brand-strawberry", list: "space-y-3" },
  { cat: "toppings", title: "Acompanhamentos", Icon: Cookie, bg: "bg-brand-gold/10", text: "text-brand-gold", dot: "bg-brand-gold", list: "space-y-2.5 text-sm" },
  { cat: "syrups", title: "Caldas", Icon: Droplet, bg: "bg-brand-purple/10", text: "text-brand-purple", dot: "bg-brand-purple", list: "space-y-3" },
  { cat: "paid", title: "Cremes Pagos", Icon: PlusCircle, bg: "bg-brand-chocolate/10", text: "text-brand-chocolate", dot: "bg-brand-chocolate", list: "space-y-3 text-sm" },
];

export default function Ingredients() {
  return (
    <section id="ingredientes" className="py-14 sm:py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block bg-brand-gold/20 text-brand-gold font-poppins font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4">
            Personalize
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-purple mb-4">
            Escolha seus ingredientes
          </h2>
          <p className="text-base sm:text-lg text-brand-chocolate/70">
            Frutas frescas, acompanhamentos crocantes e caldas irresistíveis.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CARDS.map(({ cat, title, Icon, bg, text, dot, list }, i) => (
            <Reveal
              key={cat}
              delay={i * 100}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${bg} rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${text}`} />
              </div>
              <h3 className="font-poppins font-bold text-lg sm:text-xl text-brand-purple mb-4">
                {title}
              </h3>
              <ul className={`${list} text-brand-chocolate/80`}>
                {INGREDIENTS[cat].map((it) => (
                  <li
                    key={it.id}
                    className={`flex items-center gap-2 ${it.price ? "justify-between" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 ${dot} rounded-full`} />
                      {it.name}
                    </span>
                    {it.price && (
                      <span className="font-poppins font-bold text-brand-purple whitespace-nowrap">
                        {money(it.price)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
