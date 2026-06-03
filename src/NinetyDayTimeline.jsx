import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

const C = {
  bg: "#0a0a12",
  cyan: "#00e5ff",
  cyanDim: "rgba(0,229,255,0.08)",
  red: "#ff3b30",
  redDim: "rgba(255,59,48,0.15)",
  white: "#f0f0f0",
  muted: "#6b7280",
  darkPanel: "#14141f",
  border: "rgba(255,255,255,0.06)",
};

const FONT = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

const MILESTONES = [
  { day: 0, label: "Model Submitted", icon: "📄" },
  { day: 30, label: "Initial Review", icon: "🔍" },
  { day: 60, label: "Vulnerability Scan", icon: "🛡️" },
  { day: 90, label: "Public Release", icon: "🚀" },
];

export const NinetyDayTimeline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phases ──
  const headerIn = 0;
  const barStart = 15;
  const barFillDuration = 60;
  const cancelStamp = 85;
  const cancelShake = 85;

  // ── Header ──
  const headerOpacity = interpolate(frame, [headerIn, headerIn + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Progress bar fill ──
  const fillProgress = interpolate(frame, [barStart, barStart + barFillDuration], [0, 0.65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Cancel stamp ──
  const stampScale = spring({
    frame: frame - cancelStamp,
    fps,
    config: { damping: 8, mass: 0.5, stiffness: 200 },
  });
  const stampOpacity = interpolate(frame, [cancelStamp, cancelStamp + 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Screen shake on stamp ──
  const shakeX =
    frame >= cancelShake && frame < cancelShake + 8
      ? Math.sin(frame * 12) * 6 * (1 - (frame - cancelShake) / 8)
      : 0;
  const shakeY =
    frame >= cancelShake && frame < cancelShake + 8
      ? Math.cos(frame * 15) * 4 * (1 - (frame - cancelShake) / 8)
      : 0;

  // ── Bar turns red after cancel ──
  const barColor =
    frame >= cancelStamp
      ? interpolate(frame, [cancelStamp, cancelStamp + 10], [0, 1], {
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* ── Background glow ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.cyanDim}, transparent 70%)`,
          transform: "translateX(-50%)",
          opacity: frame < cancelStamp ? 0.6 : 0.2,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 100px",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            opacity: headerOpacity,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.cyan,
              marginBottom: 10,
            }}
          >
            Proposed Review Period
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: C.white,
            }}
          >
            90 Days
          </div>
          <div style={{ fontSize: 18, color: C.muted, marginTop: 8 }}>
            Government testing before any AI model reaches the public
          </div>
        </div>

        {/* ── Timeline container ── */}
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            position: "relative",
          }}
        >
          {/* Track background */}
          <div
            style={{
              width: "100%",
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Fill bar */}
            <div
              style={{
                width: `${fillProgress * 100}%`,
                height: "100%",
                borderRadius: 4,
                background:
                  barColor > 0
                    ? `linear-gradient(90deg, ${C.red}, ${C.red})`
                    : `linear-gradient(90deg, ${C.cyan}, ${C.cyan}cc)`,
                boxShadow:
                  barColor > 0
                    ? `0 0 20px ${C.red}66`
                    : `0 0 20px ${C.cyan}44`,
                transition: "background 0.3s",
              }}
            />
          </div>

          {/* ── Milestone markers ── */}
          <div style={{ position: "relative", marginTop: 30, height: 80 }}>
            {MILESTONES.map((m, i) => {
              const xPercent = (m.day / 90) * 100;
              const milestoneFrame = barStart + (barFillDuration * (m.day / 90)) * 1.1;
              const mOpacity = interpolate(
                frame,
                [milestoneFrame - 5, milestoneFrame + 5],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const mY = interpolate(
                frame,
                [milestoneFrame - 5, milestoneFrame + 5],
                [15, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${xPercent}%`,
                    transform: `translateX(-50%) translateY(${mY}px)`,
                    opacity: mOpacity,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.white,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      marginTop: 2,
                    }}
                  >
                    Day {m.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CANCELLED stamp ── */}
        {frame >= cancelStamp && (
          <div
            style={{
              position: "absolute",
              transform: `scale(${stampScale}) rotate(-12deg)`,
              opacity: stampOpacity,
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: C.red,
                border: `6px solid ${C.red}`,
                borderRadius: 12,
                padding: "8px 40px",
                letterSpacing: 8,
                textShadow: `0 0 40px ${C.red}88`,
                boxShadow: `0 0 60px ${C.red}33`,
              }}
            >
              CANCELLED
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ninetyDayTimelineMeta = {
  id: "NinetyDayTimeline",
  component: NinetyDayTimeline,
  durationInFrames: 120, // 4 seconds at 30fps
  defaultProps: {},
};
