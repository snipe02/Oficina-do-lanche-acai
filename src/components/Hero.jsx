import { Star, Utensils } from "lucide-react";
import Reveal from "./Reveal";
import fot1 from "../assets/fot1.jpeg";

export default function Hero({ onOpenBuilder }) {
  return (
    <section className="relative pt-20 pb-10 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-strawberry/5 to-transparent rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="hero-grid">
          {/* Texto */}
          <Reveal className="text-left">
            <span className="inline-block bg-brand-strawberry/10 text-brand-strawberry font-poppins font-semibold text-[9px] sm:text-sm px-2 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-6">
              🍓 Qualidade que dá gosto!
            </span>
            <h1 className="font-poppins font-extrabold text-xl sm:text-4xl lg:text-6xl xl:text-7xl leading-[1.1] text-brand-purple mb-2 sm:mb-6">
              Monte seu <br />
              <span className="text-gradient">Creme</span> perfeito
            </h1>
            <p className="text-[10px] sm:text-base lg:text-xl text-brand-chocolate/80 max-w-lg mb-3 sm:mb-8 leading-snug sm:leading-relaxed">
              Do seu jeito, do tamanho da sua fome! Escolha suas frutas,
              acompanhamentos e caldas favoritas. Uma experiência única e
              deliciosa.
            </p>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => onOpenBuilder("s1-400")}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-brand-purple text-white font-poppins font-semibold text-[10px] sm:text-base px-2.5 sm:px-8 py-2 sm:py-4 rounded-full hover:bg-brand-chocolate transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <Utensils className="w-3 h-3 sm:w-5 sm:h-5" />
                Montar meu creme
              </button>
              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-white text-brand-purple font-poppins font-semibold text-[10px] sm:text-base px-2.5 sm:px-8 py-2 sm:py-4 rounded-full border-2 border-brand-purple/10 hover:border-brand-purple/30 transition-all duration-300"
              >
                Ver Cardápio
              </a>
            </div>
          </Reveal>

          {/* Imagem */}
          <Reveal className="relative">
            <div className="relative w-full mx-auto">
              <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={fot1}
                  alt="Creme delicioso com frutas"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="absolute -bottom-3 -left-2 sm:-bottom-6 sm:-left-6 bg-white p-1.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-1.5 sm:gap-3 animate-bounce">
                <div className="w-6 h-6 sm:w-12 sm:h-12 bg-brand-gold/20 rounded-full flex items-center justify-center shrink-0">
                  <Star className="w-3 h-3 sm:w-6 sm:h-6 text-brand-gold fill-brand-gold" />
                </div>
                <div className="min-w-0">
                  <p className="font-poppins font-bold text-brand-purple text-[8px] sm:text-sm leading-none">
                    4.9/5.0
                  </p>
                  <p className="text-[7px] sm:text-xs text-brand-chocolate/60 leading-tight mt-0.5">
                    +798 avaliações
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
