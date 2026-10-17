import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import logo from "../assets/logo.png";

const LINKS = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#ingredientes", label: "Ingredientes" },
  { href: "#como-funciona", label: "Como Funciona" },
];

export default function Navbar({ onOpenBuilder }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-lg shrink-0 ring-2 ring-brand-gold/70 bg-white">
              <img
                src={logo}
                alt="Oficina do Lanche"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <span className="font-poppins font-bold text-base sm:text-xl text-white tracking-tight truncate">
              Oficina do<span className="text-brand-gold"> Lanche</span>
            </span>
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-white font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA desktop */}
          <button
            type="button"
            onClick={() => onOpenBuilder("s1-400")}
            className="hidden md:inline-flex items-center gap-2 bg-brand-gold text-brand-purple font-poppins font-semibold px-6 py-2.5 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            Montar meu creme
          </button>

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-white p-2 shrink-0"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Dropdown mobile */}
      {menuOpen && (
        <div className="md:hidden bg-brand-purple/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenBuilder("s1-400");
              }}
              className="block w-full text-center mt-4 bg-brand-gold text-brand-purple font-poppins font-semibold px-6 py-3 rounded-full"
            >
              Montar meu creme
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
