import Reveal from "./Reveal";

const STEPS = [
  { n: 1, title: "Escolha o Tamanho", text: "Copo de 300ml, 400ml ou 500ml. Você decide o tamanho da sua fome.", circle: "bg-brand-purple text-white" },
  { n: 2, title: "Personalize", text: "Escolha suas frutas, acompanhamentos crocantes e caldas favoritas.", circle: "bg-brand-gold text-brand-purple" },
  { n: 3, title: "Aproveite", text: "Receba seu creme montado na hora e aproveite cada colherada.", circle: "bg-brand-strawberry text-white" },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="inline-block bg-brand-purple/10 text-brand-purple font-poppins font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full mb-4">
            Processo
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-purple mb-4">
            Como funciona
          </h2>
          <p className="text-base sm:text-lg text-brand-chocolate/70">
            Monte seu creme em 3 passos simples e deliciosos.
          </p>
        </Reveal>

        <div className="grid grid-cols-3 gap-3 sm:gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-brand-purple/10 -z-10" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="text-center">
              <div
                className={`w-14 h-14 sm:w-20 sm:h-20 ${s.circle} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg relative z-10`}
              >
                <span className="font-poppins font-bold text-lg sm:text-2xl">{s.n}</span>
              </div>
              <h3 className="font-poppins font-bold text-sm sm:text-xl text-brand-purple mb-2 sm:mb-3">
                {s.title}
              </h3>
              <p className="text-xs sm:text-base text-brand-chocolate/70 leading-snug">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
