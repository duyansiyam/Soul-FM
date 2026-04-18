import { useEffect, useState } from "react";
import { Headphones } from "lucide-react";

function NowPlaying() {
  const [track, setTrack] = useState({
    title: "Soul FM Live",
    artist: "Currently streaming",
  });
  const [loading, setLoading] = useState(true);

  const STATION_ID = "s11c8688d4";
  const API_URL = `https://public.radio.co/stations/${STATION_ID}/status`;
  const STREAM_URL = `https://s4.radio.co/${STATION_ID}/listen`;

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch now playing data");
        }

        const data = await res.json();
        const currentTrack = data?.current_track || {};

        let title =
          currentTrack?.title ||
          currentTrack?.name ||
          "Soul FM Live";

        let artist =
          currentTrack?.artist ||
          currentTrack?.presenter ||
          "Currently streaming";

        if (
          (!artist || artist === "Currently streaming") &&
          typeof currentTrack?.title === "string" &&
          currentTrack.title.includes(" - ")
        ) {
          const parts = currentTrack.title.split(" - ");
          artist = parts[0]?.trim() || artist;
          title = parts.slice(1).join(" - ").trim() || title;
        }

        setTrack({
          title,
          artist,
        });
      } catch (error) {
        console.error("Error fetching now playing:", error);
        setTrack({
          title: "Soul FM Live",
          artist: "Currently streaming",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 8000);

    return () => clearInterval(interval);
  }, [API_URL]);

  return (
    <section
      style={{ fontFamily: "var(--font-body)" }}
      className="relative min-h-screen overflow-hidden bg-(--color-soul-black) text-(--color-soul-white)"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,57,43,0.22),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(139,26,18,0.18),transparent_30%),linear-gradient(135deg,#0a0a0a_0%,#120909_28%,#1b0c0b_58%,#0a0a0a_100%)]" />

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[34px_34px]" />

      {/* Rusty glow blobs */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-(--color-soul-accent)/15 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-(--color-soul-accent-dim)/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-52 w-52 -translate-x-1/2 rounded-full bg-(--color-soul-accent)/8 blur-3xl" />

      {/* Decorative lines */}
      <div className="absolute left-10 top-24 h-24 w-24 rounded-full border border-white/10" />
      <div className="absolute bottom-24 left-20 h-2 w-20 rounded-full bg-linear-to-r from-(--color-soul-accent-dim) to-transparent" />

      {/* Main wrapper with navbar spacing */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28">
        <div className="mx-auto w-full max-w-5xl rounded-[28px] border border-(--color-soul-border) bg-white/3 px-6 py-10 shadow-[0_0_60px_rgba(192,57,43,0.06)] backdrop-blur-md md:px-10">
          {/* Header */}
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-(--color-soul-border) bg-(--color-soul-card) shadow-[0_0_20px_rgba(192,57,43,0.06)]">
                <Headphones
                  className="h-7 w-7 text-(--color-soul-white) md:h-8 md:w-8"
                  strokeWidth={2.1}
                />
              </div>

              <h1
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.04em] text-(--color-soul-white)"
              >
                Now Playing
              </h1>
            </div>

            <p className="mx-auto max-w-2xl text-[clamp(0.9rem,1.3vw,1.05rem)] font-light text-(--color-soul-muted)">
              Feel the rhythm. Stay connected with SOULFM.
            </p>
          </div>

          {/* Main Content */}
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[260px_1fr]">
            {/* Vinyl */}
            <div className="flex justify-center">
              <div className="relative h-55 w-55 md:h-65 md:w-65">
                <div className="absolute inset-0 rounded-full bg-(--color-soul-accent)/15 blur-3xl" />

                <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-white/10 bg-[radial-gradient(circle,#1d1d1d_0%,#0b0b0b_35%,#050505_70%,#000000_100%)] shadow-[0_0_45px_rgba(192,57,43,0.12)]">
                  <div className="absolute inset-3.5 rounded-full border border-white/5" />
                  <div className="absolute inset-7 rounded-full border border-white/5" />
                  <div className="absolute inset-10.5 rounded-full border border-white/5" />
                  <div className="absolute inset-14 rounded-full border border-white/5" />
                  <div className="absolute inset-17.5 rounded-full border border-white/5" />

                  <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-(--color-soul-border) bg-linear-to-br from-(--color-soul-accent) via-(--color-soul-accent-dim) to-[#2a0c08] shadow-inner">
                    <span className="text-[10px] font-semibold tracking-[0.24em] text-(--color-soul-white)/90">
                      SOULFM
                    </span>
                  </div>

                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black" />
                </div>
              </div>
            </div>

            {/* Text + Player */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {loading ? (
                <p className="text-lg font-light text-(--color-soul-muted) md:text-xl">
                  Loading current track...
                </p>
              ) : (
                <>
                  <div className="mb-5 flex items-center gap-3 rounded-full border border-(--color-soul-border) bg-(--color-soul-card) px-4 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-(--color-soul-accent) animate-pulse" />
                    <span className="text-[10px] font-light uppercase tracking-[0.35em] text-(--color-soul-white)/70">
                      Live Now
                    </span>
                  </div>

                  <h2
                    style={{ fontFamily: "var(--font-heading)" }}
                    className="max-w-3xl text-[clamp(1.6rem,3vw,2.8rem)] font-normal leading-[1.05] tracking-[-0.03em] text-(--color-soul-white)"
                  >
                    {track.title}
                  </h2>

                  <p className="mt-3 text-[clamp(0.95rem,1.6vw,1.35rem)] font-light text-(--color-soul-muted)">
                    {track.artist}
                  </p>

                  <div className="mt-8 w-full max-w-2xl rounded-[20px] border border-(--color-soul-border) bg-(--color-soul-card)/60 p-4 backdrop-blur-sm">
                    <audio controls autoPlay className="w-full">
                      <source src={STREAM_URL} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                 <a
  href="https://apps.apple.com/us/app/soul-fm/id6737055669"
  target="_blank"
  rel="noreferrer"
  className="mt-6 inline-flex items-center justify-center rounded-full border border-(--color-soul-accent-dim) bg-(--color-soul-accent)/10 px-6 py-3 text-[11px] font-light uppercase tracking-[0.2em] text-(--color-soul-white) transition duration-300 hover:border-(--color-soul-accent) hover:bg-(--color-soul-accent)/20"
>
  Download App Now
</a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NowPlaying;