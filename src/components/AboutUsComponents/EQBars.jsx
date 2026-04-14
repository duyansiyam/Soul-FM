// ─── EQ Bars ──────────────────────────────────────
export default function EQBars() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28 }}>
      {[0, 180, 360, 120, 280, 60, 220].map((delay, i) => (
        <div
          key={i}
          style={{
            width: 2,
            background: "var(--color-soul-accent)",
            borderRadius: 2,
            animation: `soulfm-eq 1.4s ${delay}ms infinite ease-in-out`,
          }}
        />
      ))}
      <style>{`
        @keyframes soulfm-eq {
          0%,100% { height: 4px; }
          25%      { height: 20px; }
          50%      { height: 10px; }
          75%      { height: 26px; }
        }
      `}</style>
    </div>
  );
}
