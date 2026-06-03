import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

// ── MTT Brand Tokens ──
const C = {
  bg: "#0a0a12",
  cyan: "#00e5ff",
  cyanDim: "rgba(0,229,255,0.12)",
  red: "#ff3b30",
  white: "#f0f0f0",
  muted: "#6b7280",
  darkPanel: "#111119",
};

const FONT = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

// ── Small utility: random‑ish offsets for the glitch slices ──
const SLICES = [
  { top: "12%", height: "6%", dx: 8 },
  { top: "34%", height: "4%", dx: -12 },
  { top: "55%", height: "5%", dx: 15 },
  { top: "78%", height: "3%", dx: -10 },
];

export const TitleCard = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ── Phase timing (frames) ──
  const glitchStart = 0;
  const glitchEnd = 18;
  const revealStart = 12;
  const subtitleStart = 30;
  const tagStart = 44;

  // ── Glitch intensity ──
  const glitchIntensity = interpolate(frame, [glitchStart, glitchEnd], [1, 0], {
    extrapolateRight: "clamp",
  });

  // ── Main title spring ──
  const titleScale = spring({ frame: frame - revealStart, fps, config: { damping: 14, mass: 0.6 } });
  const titleOpacity = interpolate(frame, [revealStart, revealStart + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Subtitle slide‑up ──
  const subY = interpolate(frame, [subtitleStart, subtitleStart + 14], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(frame, [subtitleStart, subtitleStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Tag line ──
  const tagOpacity = interpolate(frame, [tagStart, tagStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Scanline crawl ──
  const scanY = (frame * 3) % height;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* ── Background grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${C.cyanDim} 1px, transparent 1px),
            linear-gradient(90deg, ${C.cyanDim} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.3,
        }}
      />

      {/* ── Scanline ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: 2,
          top: scanY,
          background: `linear-gradient(90deg, transparent, ${C.cyan}44, transparent)`,
        }}
      />

      {/* ── Glitch slices ── */}
      {glitchIntensity > 0 &&
        SLICES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              top: s.top,
              height: s.height,
              background: i % 2 === 0 ? C.cyan : C.red,
              opacity: glitchIntensity * 0.15,
              transform: `translateX(${s.dx * glitchIntensity * (Math.sin(frame * 1.5 + i) > 0 ? 1 : -1)}px)`,
            }}
          />
        ))}

      {/* ── Center content ── */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: C.cyan,
              marginBottom: 20,
            }}
          >
            Executive Order
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.05,
              textShadow: glitchIntensity > 0
                ? `${4 * glitchIntensity}px 0 ${C.red}, ${-4 * glitchIntensity}px 0 ${C.cyan}`
                : "none",
            }}
          >
            CANCELLED
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            marginTop: 36,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: C.muted,
              lineHeight: 1.5,
            }}
          >
            Trump pulled the AI safety order hours before signing.
          </div>
        </div>

        {/* Tag */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            opacity: tagOpacity,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: C.cyan,
            }}
          />
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: C.cyan,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Maria Talks Tech
          </div>
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: C.cyan,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Remotion metadata
export const titleCardMeta = {
  id: "TitleCard",
  component: TitleCard,
  durationInFrames: 90, // 3 seconds at 30fps
  defaultProps: {},
};
