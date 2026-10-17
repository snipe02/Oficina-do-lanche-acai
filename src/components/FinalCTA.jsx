import { IceCream } from "lucide-react";
import Reveal from "./Reveal";

export default function FinalCTA({ onOpenBuilder }) {
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-brand-purple relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-strawberry/10 rounded-full blur-3xl" />

      <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mb-5 sm:mb-6">
          Do seu jeito, <br />
          <span className="text-brand-gold">sempre delicioso!</span>
        </h2>
        <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-xl mx-auto">
          Monte agora o creme perfeito para você e finalize o pedido pelo
          WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => onOpenBuilder("s1-400")}
          className="inline-flex items-center gap-3 bg-brand-gold text-brand-purple font-poppins font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <IceCream className="w-5 h-5 sm:w-6 sm:h-6" />
          Montar meu creme
        </button>
      </Reveal>
    </section>
  );
}
