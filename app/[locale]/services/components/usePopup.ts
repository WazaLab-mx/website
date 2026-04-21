import { useCallback, useEffect, useState } from "react";

export function usePopup() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const openPopup = useCallback((id: string) => {
    setActivePopup(id);
  }, []);

  const closePopup = useCallback(() => {
    setActivePopup(null);
  }, []);

  useEffect(() => {
    if (!activePopup) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activePopup, closePopup]);

  return { activePopup, openPopup, closePopup };
}
