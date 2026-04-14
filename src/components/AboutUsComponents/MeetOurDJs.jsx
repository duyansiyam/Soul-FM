import { useNavigate } from "react-router-dom";
import djWaxx from "../../assets/dj-pic1.webp";
import principalP from "../../assets/dj-pic2.png";
import fillerDj from "../../assets/dj-fillerpic.webp";

const djs = [
  {
    id: 1,
    photo: djWaxx,
    alias: "DJ Waxx",
    realName: "Jeremiah Tardy",
    show: "Morning Show — Bringing Back the Heartbeat of Soul",
    tag: "Morning Host",
    bio: `I have been involved in music since the age of sixteen. I started playing music at my high school during lunch time to keep myself and other students in a good mood. I loved it so much I was on a quest to learn how to blend and mix music with two tables. I had a great teacher in Al Perkins "The Mix Mechanic." He showed me the nuances of blending song, keeping beats per minute, and the showmanship for the crowd. I learned how to move the crowd with tight mixes and a flare for keeping people on the dance floor. That led me to start my own production crew to host house parties, clubs, dances, Fraternity parties and every type of entertainment involving a DJ. Maintaining a high level of entertainment, I got invited to DJ internationally in places like Australia, Japan, India, New Zealand — just to name a few. During that time, I appeared on KGGI 99.1, was a regular morning host on "Pump FM" for over a year and now the morning host on Soul FM.`,
    index: "01",
  },
  {
    id: 2,
    photo: principalP,
    alias: "Principal P The MC",
    realName: "Principal P",
    show: "Night School with Principal P The MC",
    tag: "Night Host",
    vibe: "Soulful R&B · Timeless Hip Hop · Live Mix Energy",
    bio: `Principal P The MC is more than a DJ — he's a curator of culture. As the host of Night School, he brings listeners a late-night curriculum of soulful hip-hop vibes and timeless R&B, blending classics with fresh gems that keep heads nodding and hearts full. From live mixes that move the crowd to deep storytelling segments like In the Studio, Principal P connects music history to the present, showing how hip-hop and R&B continue to shape our lives. His natural energy, love for the culture, and engaging personality create a space where listeners feel part of the conversation — not just tuned in.`,
    index: "02",
  },
];

export default function MeetOurDJs() {
  const navigate = useNavigate();

  return (
    <section style={styles.section}>
      <div style={styles.grain} aria-hidden="true" />

      {/* ── Section Header ── */}
      <header style={styles.header}>
        <p style={styles.eyebrow}>Soul FM · San Bernardino</p>
        <h2 style={styles.heading}>
          Get to Know Our<br />
          <em style={styles.headingItalic}>Talented DJs</em>
        </h2>
        <div style={styles.headerRule} />
        <p style={styles.subheading}>
          Meet Our Dynamic DJs — voices that carry the heartbeat of soul.
        </p>
      </header>

      {/* ── DJ Cards ── */}
      <div style={styles.grid}>
        {djs.map((dj, i) => (
          <article
            key={dj.id}
            style={{ ...styles.card, animationDelay: `${i * 0.15}s` }}
            className="dj-card"
          >
            <div style={styles.photoWrap}>
              <div style={styles.photoFrame}>
                <img src={dj.photo} alt={dj.alias} style={styles.photo} loading="lazy" />
                <div style={styles.photoOverlay} />
              </div>
              <span style={styles.indexBadge}>{dj.index}</span>
              <span style={styles.tagBadge}>{dj.tag}</span>
            </div>

            <div style={styles.content}>
              <div style={styles.contentInner}>
                <p style={styles.showLabel}>{dj.show}</p>
                {dj.vibe && <p style={styles.vibe}>{dj.vibe}</p>}
                <h3 style={styles.alias}>{dj.alias}</h3>
                <p style={styles.realName}>{dj.realName}</p>
                <div style={styles.divider} />
                <p style={styles.bio}>{dj.bio}</p>
                <button
                  style={styles.cta}
                  className="dj-cta"
                  onClick={() => navigate("/now-playing")}
                >
                  <span style={styles.ctaLine} />
                  Tune In Now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── More Voices Coming Soon ── */}
      <div style={styles.comingSoonWrap}>
        <div style={styles.comingSoonInner}>
          <div style={styles.csImageWrap}>
            <img src={fillerDj} alt="" aria-hidden="true" style={styles.csImage} />
            <div style={styles.csImageVeil} />
          </div>
          <div style={styles.csText}>
            <p style={styles.csEyebrow}>The Lineup Is Growing</p>
            <h3 style={styles.csHeading}>
              More Voices.<br />
              <em style={styles.csItalic}>More Soul.</em>
            </h3>
            <div style={styles.csDivider} />
            <p style={styles.csBio}>
              Our roster is expanding. Stay tuned as we bring new DJs to the airwaves — each one a passionate curator with their own sound, style, and story to tell.
            </p>
            <ul style={styles.csList}>
              {[
                "Passionate music curators with extensive R&B knowledge",
                "Engaging personalities that keep you entertained",
                "Live mixes that showcase the best of R&B",
                "Interactive segments with listener participation",
              ].map((item) => (
                <li key={item} style={styles.csListItem}>
                  <span style={styles.csDot} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        .dj-card { animation: fadeSlideUp 0.7s ease both; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .dj-card:nth-child(even) { flex-direction: row-reverse; }

        .dj-cta:hover {
          background: #c8a96e !important;
          color: #0d0d0d !important;
          letter-spacing: 0.2em !important;
        }
        .dj-cta:hover span { width: 0 !important; }

        @media (max-width: 900px) {
          .dj-card, .dj-card:nth-child(even) { flex-direction: column !important; }
          .cs-inner { flex-direction: column !important; }
          .cs-image-wrap { width: 100% !important; min-height: 200px !important; }
          .cs-text { padding: 2rem !important; }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    background: "#0d0d0d",
    color: "#f0ebe3",
    padding: "7rem 2rem 6rem",
    fontFamily: "'DM Sans', sans-serif",
    overflow: "hidden",
  },
  grain: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
    backgroundSize: "128px 128px",
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.5,
  },
  header: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    maxWidth: "720px",
    margin: "0 auto 5rem",
  },
  eyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: "1.2rem",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.4rem, 5vw, 4rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    color: "#f0ebe3",
    margin: "0 0 1.5rem",
    letterSpacing: "-0.01em",
  },
  headingItalic: {
    fontStyle: "italic",
    color: "#c8a96e",
    fontWeight: 400,
  },
  headerRule: {
    width: "48px",
    height: "1px",
    background: "#c8a96e",
    margin: "0 auto 1.5rem",
  },
  subheading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.15rem",
    fontWeight: 300,
    color: "#a89880",
    letterSpacing: "0.02em",
    lineHeight: 1.7,
  },
  grid: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "5rem",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    gap: "3.5rem",
    alignItems: "flex-start",
    borderTop: "1px solid rgba(200,169,110,0.15)",
    paddingTop: "4rem",
  },
  photoWrap: {
    position: "relative",
    flexShrink: 0,
    width: "clamp(220px, 28vw, 340px)",
  },
  photoFrame: {
    position: "relative",
    borderRadius: "120px 2px 2px 2px",
    overflow: "hidden",
    aspectRatio: "3/4",
    background: "#1a1a1a",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
    filter: "sepia(15%) contrast(1.05)",
  },
  photoOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 55%, rgba(13,13,13,0.7) 100%)",
    pointerEvents: "none",
  },
  indexBadge: {
    position: "absolute",
    top: "-1rem",
    left: "-1rem",
    fontFamily: "'Playfair Display', serif",
    fontSize: "4.5rem",
    fontWeight: 700,
    color: "rgba(200,169,110,0.12)",
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",
  },
  tagBadge: {
    position: "absolute",
    bottom: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(13,13,13,0.85)",
    border: "1px solid rgba(200,169,110,0.4)",
    color: "#c8a96e",
    fontSize: "0.6rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    padding: "0.35rem 1rem",
    borderRadius: "999px",
    whiteSpace: "nowrap",
    backdropFilter: "blur(4px)",
  },
  content: { flex: 1, paddingTop: "0.5rem" },
  contentInner: { maxWidth: "580px" },
  showLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: "0.5rem",
  },
  vibe: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.85rem",
    fontStyle: "italic",
    color: "#7a6e62",
    marginBottom: "0.6rem",
    letterSpacing: "0.05em",
  },
  alias: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
    fontWeight: 700,
    color: "#f0ebe3",
    margin: "0 0 0.2rem",
    letterSpacing: "-0.01em",
    lineHeight: 1.1,
  },
  realName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    fontStyle: "italic",
    color: "#6e6258",
    fontWeight: 300,
    marginBottom: "1.5rem",
  },
  divider: {
    width: "36px",
    height: "1px",
    background: "#c8a96e",
    marginBottom: "1.5rem",
    opacity: 0.6,
  },
  bio: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    lineHeight: 1.85,
    color: "#a89880",
    fontWeight: 300,
    marginBottom: "2rem",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "1rem",
    background: "transparent",
    border: "1px solid rgba(200,169,110,0.5)",
    color: "#c8a96e",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "0.75rem 1.6rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "0",
  },
  ctaLine: {
    display: "inline-block",
    width: "24px",
    height: "1px",
    background: "#c8a96e",
    transition: "width 0.3s ease",
    flexShrink: 0,
  },

  /* ── Coming Soon Banner ── */
  comingSoonWrap: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1100px",
    margin: "5rem auto 0",
    borderTop: "1px solid rgba(200,169,110,0.15)",
    paddingTop: "4rem",
  },
  comingSoonInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(200,169,110,0.1)",
    borderRadius: "4px",
    overflow: "hidden",
  },
  csImageWrap: {
    position: "relative",
    flexShrink: 0,
    width: "clamp(160px, 20vw, 260px)",
    minHeight: "280px",
  },
  csImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    filter: "grayscale(85%) sepia(20%) brightness(0.35)",
  },
  csImageVeil: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, transparent 30%, #111 100%)",
  },
  csText: {
    flex: 1,
    padding: "2.5rem 2.5rem 2.5rem 2rem",
  },
  csEyebrow: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: "0.75rem",
    opacity: 0.7,
  },
  csHeading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
    fontWeight: 700,
    color: "#f0ebe3",
    margin: "0 0 1rem",
    lineHeight: 1.15,
    opacity: 0.6,
  },
  csItalic: {
    fontStyle: "italic",
    color: "#c8a96e",
    fontWeight: 400,
  },
  csDivider: {
    width: "30px",
    height: "1px",
    background: "#c8a96e",
    marginBottom: "1rem",
    opacity: 0.3,
  },
  csBio: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "0.95rem",
    lineHeight: 1.8,
    color: "#5a5048",
    fontWeight: 300,
    marginBottom: "1.2rem",
  },
  csList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },
  csListItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    color: "#3e3830",
    letterSpacing: "0.04em",
  },
  csDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#c8a96e",
    flexShrink: 0,
    opacity: 0.4,
  },
};