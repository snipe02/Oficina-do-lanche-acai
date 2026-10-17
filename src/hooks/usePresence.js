import { useEffect, useState } from "react";

/**
 * Mantém o componente montado durante a animação de saída.
 * mounted → renderizar; shown → aplicar classes de "aberto".
 */
export function usePresence(open, ms = 300) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer;
    let raf1;
    let raf2;
    if (open) {
      setMounted(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShown(true));
      });
    } else {
      setShown(false);
      timer = setTimeout(() => setMounted(false), ms);
    }
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [open, ms]);

  return { mounted, shown };
}
