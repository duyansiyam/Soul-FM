const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@200;300;400&display=swap');

  .sfm-contact * { box-sizing: border-box; }

  .sfm-contact {
    background: #0a0a0a;
    color: #f0f0f0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    padding-top: 64px;
  }

  .sfm-contact::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  }

  .sfm-bg-glow {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(ellipse 70% 55% at 15% 10%, rgba(160, 40, 25, 0.18) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 85% 80%, rgba(130, 28, 18, 0.13) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 50% 50%, rgba(100, 20, 12, 0.07) 0%, transparent 70%);
  }

  .sfm-header,
  .sfm-body {
    position: relative;
    z-index: 1;
  }

  @keyframes sfm-fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .sfm-anim-0 { animation: sfm-fadeUp 0.6s 0.10s ease both; }
  .sfm-anim-1 { animation: sfm-fadeUp 0.6s 0.20s ease both; }
  .sfm-anim-2 { animation: sfm-fadeUp 0.6s 0.30s ease both; }
  .sfm-anim-3 { animation: sfm-fadeUp 0.6s 0.40s ease both; }
  .sfm-anim-4 { animation: sfm-fadeUp 0.6s 0.50s ease both; }

  .sfm-header {
    padding: 3rem 3rem 2rem;
    border-bottom: 1px solid #1e1e1e;
  }

  .sfm-eyebrow {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #c0392b;
    margin: 0 0 0.75rem;
  }

  .sfm-title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 300;
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 0 0 0.5rem;
  }

  .sfm-title em {
    font-style: italic;
    color: #c0392b;
  }

  .sfm-subtitle {
    font-size: 13px;
    font-weight: 300;
    color: #666;
    margin: 0;
  }

  .sfm-body {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
  }

  .sfm-info {
    padding: 3rem;
    border-right: 1px solid #1e1e1e;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .sfm-info-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #4a4a4a;
    margin: 0 0 0.6rem;
  }

  .sfm-info-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
    color: #d0d0d0;
  }

  .sfm-info-value a {
    color: #d0d0d0;
    text-decoration: none;
    border-bottom: 1px solid #2e2e2e;
    transition: border-color 0.2s, color 0.2s;
  }

  .sfm-info-value a:hover {
    color: #f0f0f0;
    border-color: #c0392b;
  }

  .sfm-hours {
    font-size: 12px;
    font-weight: 300;
    color: #666;
    margin: 0.3rem 0 0;
  }

  .sfm-divider {
    width: 24px;
    height: 1px;
    background: #c0392b;
    opacity: 0.6;
  }

  .sfm-form-wrap {
    padding: 3rem;
  }

  .sfm-field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .sfm-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
  }

  .sfm-label {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d0d0d0;
  }

  .sfm-label span {
    color: #c0392b;
    margin-left: 1px;
  }

  .sfm-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #1e1e1e;
    color: #f7f7f7;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    padding: 0.75rem 0;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  .sfm-input::placeholder { color: #8f8f8f; }
  .sfm-input:focus { border-color: #c0392b; }

  .sfm-input.error {
    border-color: #c0392b !important;
    animation: sfm-shake 0.3s ease;
  }

  select.sfm-input {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 2rem;
    color: #f7f7f7;
    background-color: transparent;
    background-image:
      linear-gradient(45deg, transparent 50%, #c0392b 50%),
      linear-gradient(135deg, #c0392b 50%, transparent 50%);
    background-position:
      calc(100% - 14px) calc(50% - 2px),
      calc(100% - 8px) calc(50% - 2px);
    background-size: 6px 6px, 6px 6px;
    background-repeat: no-repeat;
  }

  select.sfm-input option {
    background: #111111;
    color: #f0f0f0;
  }

  select.sfm-input option:checked {
    background: #c0392b;
    color: #ffffff;
  }

  @keyframes sfm-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  textarea.sfm-input {
    resize: none;
    line-height: 1.6;
  }

  .sfm-selected-email {
    margin-top: -0.4rem;
    margin-bottom: 1rem;
    font-size: 12px;
    color: #8f8f8f;
  }

  .sfm-selected-email strong {
    color: #c0392b;
    font-weight: 400;
  }

  .sfm-btn {
    margin-top: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: transparent;
    border: 1px solid #2e2e2e;
    color: #f0f0f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 1rem 2rem;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.1s;
    cursor: pointer;
  }

  .sfm-btn::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    background: #c0392b;
    transition: width 0.3s ease;
    z-index: 0;
  }

  .sfm-btn:hover::before { width: 100%; }
  .sfm-btn:hover { border-color: #c0392b; }
  .sfm-btn:active { transform: scale(0.98); }

  .sfm-btn-text,
  .sfm-btn-arrow {
    position: relative;
    z-index: 1;
    transition: transform 0.2s;
  }

  .sfm-btn:hover .sfm-btn-arrow { transform: translateX(4px); }

  .sfm-success {
    margin-top: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.1rem;
    color: #c0392b;
    animation: sfm-fadeUp 0.5s ease both;
  }

  @media (max-width: 700px) {
    .sfm-body { grid-template-columns: 1fr; }
    .sfm-info { border-right: none; border-bottom: 1px solid #1e1e1e; padding: 2rem; }
    .sfm-form-wrap { padding: 2rem; }
    .sfm-header { padding: 2rem 2rem 1.5rem; }
    .sfm-field-row { grid-template-columns: 1fr; }
  }
`;

export default styles;
