import { useEffect } from "react";

/**
 * Proteção leve contra cópia/inspeção (portada do site original).
 * Obs.: é só dissuasão — não impede ninguém de ver o código.
 * Para desligar, remova a chamada em App.jsx.
 */
export function useProtection() {
  useEffect(() => {
    const block = (e) => e.preventDefault();

    const onKeyDown = (e) => {
      const key = (e.key || "").toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      if (e.key === "F12") return e.preventDefault();
      if (mod && e.shiftKey && ["i", "j", "c", "k", "e"].includes(key))
        return e.preventDefault();
      if (mod && ["u", "s", "p"].includes(key)) return e.preventDefault();
    };

    const onDragStart = (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    };

    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("selectstart", block);

    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("selectstart", block);
    };
  }, []);
}
