import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

const C = {
  bg: "#0a0a12",
  cyan: "#00e5ff",
  cyanDim: "rgba(0,229,255,0.08)",
  red: "#ff3b30",
  white: "#f0f0f0",
  muted: "#6b7280",
  cardBg: "#111119",
  cardBorder: "rgba(0,229,255,0.15)",
  greenDim: "rgba(52,199,89,0.15)",
  green: "#34c759",
};

const FONT = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

const COMPANIES = [
  { name: "OpenAI", detail: "GPT / ChatGPT", color: "#10a37f" },
  { name: "Anthropic", detail: "Claude / Mythos", color: "#d4a574" },
  { name: "Google", detail: "Gemini / DeepMind", color: "#4285f4" },
  { name: "Meta", detail: "Llama models", color: "#0668e1" },
  { name: "Microsoft", detail: "Copilot / Azure AI", color: "#00a4ef" },
];

const STAKES = [
  { icon: "🏦", label: "Banks" },
  { icon: "⚡", label: "Utilities" },
  { icon: "🏥", label: "Healthcare" },
  { icon: "🛡️", label: "Defense" },
];

export const CompaniesAtStake = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phases ──
  const headerStart = 0;
  const cardsStart = 14;
  const cardGap = 10;
  const arrowStart = cardsStart + COMPANIES.length * cardGap + 10;
  const stakesStart = arrowStart + 15;
  const stakesGap = 8;
  const bottomStart = stakesStart + STAKES.length * stakesGap + 15;

  // ── Header ──
  const headerOpacity = interpolate(frame, [headerStart, headerStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Arrow / connector ──
  const arrowOpacity = interpolate(frame, [arrowStart, arrowStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowHeight = interpolate(frame, [arrowStart, arrowStart + 12], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Bottom label ──
  const bottomOpacity = interpolate(frame, [bottomStart, bottomStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT,
      }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${C.cyanDim} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          opacity: 0.4,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 60px",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            opacity: headerOpacity,
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.cyan,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            Companies That Would Be Affected
          </div>
          <div
            style={{
              fontSize: 14,
              color: C.muted,
            }}
          >
            Submit models to government for 90‑day review before public release
          </div>
        </div>

        {/* ── Company cards row ── */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 960,
          }}
        >
          {COMPANIES.map((co, i) => {
            const cardFrame = cardsStart + i * cardGap;
            const scale = spring({
              frame: frame - cardFrame,
              fps,
              config: { damping: 12, mass: 0.5 },
            });
            const opacity = interpolate(
              frame,
              [cardFrame, cardFrame + 6],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `scale(${Math.min(scale, 1)})`,
                  backgroundColor: C.cardBg,
                  border: `1px solid ${C.cardBorder}`,
                  borderRadius: 12,
                  padding: "20px 24px",
                  minWidth: 160,
                  textAlign: "center",
                }}
              >
                {/* Color accent dot */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: co.color,
                    margin: "0 auto 10px",
                    boxShadow: `0 0 10px ${co.color}66`,
                  }}
                />
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: 4,
                  }}
                >
                  {co.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.muted,
                  }}
                >
                  {co.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Arrow connector ── */}
        <div
          style={{
            opacity: arrowOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <div
            style={{
              width: 2,
              height: arrowHeight,
              background: `linear-gradient(180deg, ${C.cyan}88, ${C.cyan})`,
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: `10px solid ${C.cyan}`,
            }}
          />
        </div>

        {/* ── "Who's exposed?" label ── */}
        <div
          style={{
            opacity: arrowOpacity,
            fontSize: 14,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: C.red,
            fontWeight: 600,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Without review — who's exposed?
        </div>

        {/* ── Stakes row ── */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {STAKES.map((s, i) => {
            const sFrame = stakesStart + i * stakesGap;
            const sOpacity = interpolate(
              frame,
              [sFrame, sFrame + 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const sY = interpolate(
              frame,
              [sFrame, sFrame + 8],
              [15, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: sOpacity,
                  transform: `translateY(${sY}px)`,
                  textAlign: "center",
                  backgroundColor: C.cardBg,
                  border: `1px solid rgba(255,59,48,0.2)`,
                  borderRadius: 10,
                  padding: "16px 28px",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 6 }}>{s.icon}</div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: C.white,
                  }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom message ── */}
        <div
          style={{
            opacity: bottomOpacity,
            marginTop: 36,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: C.muted,
              fontStyle: "italic",
            }}
          >
            No government review. No safety net. Full speed ahead.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const companiesAtStakeMeta = {
  id: "CompaniesAtStake",
  component: CompaniesAtStake,
  durationInFrames: 150, // 5 seconds at 30fps
  defaultProps: {},
};
