import { Banknote, Instagram, MessageCircle, QrCode, Wallet } from "lucide-react";
import logo from "../assets/logo.png";
import { WHATSAPP_NUMBER } from "../data";

const PAYMENTS = [
  { label: "Dinheiro", Icon: Banknote },
  { label: "PIX", Icon: QrCode },
  { label: "Débito", Icon: Wallet },
];

const socialClass =
  "text-brand-chocolate/60 hover:text-brand-purple transition-colors";

export default function Footer() {
  return (
    <footer className="bg-brand-cream py-10 sm:py-12 border-t border-brand-purple/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-purple/20 bg-white">
              <img
                src={logo}
                alt="Monte Seu Creme"
                loading="lazy"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <span className="font-poppins font-bold text-lg text-brand-purple">
              Monte Seu Creme
            </span>
          </div>

          <p className="text-xs sm:text-sm text-brand-chocolate/60">
            &copy; {new Date().getFullYear()} OFICINA DO LANCHE. Todos os
            direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/oficinadolanche_projeto"
              target="_blank"
              rel="noreferrer"
              className={socialClass}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className={socialClass}
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 sm:pt-8 border-t border-brand-purple/10">
          <p className="text-center font-poppins font-semibold text-brand-purple text-sm sm:text-base mb-4 sm:mb-5">
            Formas de pagamento
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {PAYMENTS.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-brand-purple/10"
              >
                <Icon className="w-4 h-4 text-brand-purple" />
                <span className="font-poppins font-semibold text-xs sm:text-sm text-brand-purple">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
