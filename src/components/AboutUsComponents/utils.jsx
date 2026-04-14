import { useEffect, useRef, useState } from "react";

// ─── Scroll-reveal hook ───────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reveal wrapper ───────────────────────────────
export function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Thin rule ────────────────────────────────────
export function Rule({ color = "var(--color-soul-border)" }) {
  return <div style={{ width: "100%", height: 1, background: color, margin: "0" }} />;
}

// ─── Section eyebrow label ────────────────────────
export function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 300,
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--color-soul-accent)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: "1.25rem",
      }}
    >
      <span
        style={{
          display: "block",
          width: 24,
          height: 1,
          background: "var(--color-soul-accent)",
        }}
      />
      {children}
    </div>
  );
}
