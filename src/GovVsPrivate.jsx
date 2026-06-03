import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

const C = {
  bg: "#0a0a12",
  cyan: "#00e5ff",
  cyanGlow: "rgba(0,229,255,0.2)",
  red: "#ff3b30",
  amber: "#ff9f0a",
  white: "#f0f0f0",
  muted: "#6b7280",
  darkPanel: "#111119",
  govGray: "#3a3a4a",
};

const FONT = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

const GOV_ITEMS = [
  { label: "Paperwork", delay: 0 },
  { label: "Committee Review", delay: 8 },
  { label: "Approval Chain", delay: 16 },
  { label: "Compliance Audit", delay: 24 },
  { label: "Final Sign-off", delay: 32 },
];

const PRIVATE_ITEMS = [
  { label: "Build", delay: 0 },
  { label: "Ship", delay: 6 },
  { label: "Iterate", delay: 12 },
];

export const GovVsPrivate = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerStart = 0;
  const splitStart = 16;
  const govBarStart = 30;
  const privateBarStart = 30;
  const insightStart = 100;

  // ── Header ──
  const headerOpacity = interpolate(frame, [headerStart, headerStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Divider line ──
  const dividerHeight = interpolate(frame, [splitStart, splitStart + 20], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Government progress (slow) ──
  const govProgress = interpolate(frame, [govBarStart, govBarStart + 90], [0, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Private sector progress (fast) ──
  const privateProgress = interpolate(frame, [privateBarStart, privateBarStart + 40], [0, 95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Insight text ──
  const insightOpacity = interpolate(frame, [insightStart, insightStart + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const insightY = interpolate(frame, [insightStart, insightStart + 12], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Speed pulse on private bar ──
  const pulseOpacity =
    frame > privateBarStart + 40
      ? 0.3 + 0.2 * Math.sin(frame * 0.15)
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: C.cyan,
            fontWeight: 500,
          }}
        >
          Speed of Operation
        </div>
      </div>

      {/* ── Two‑column layout ── */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          padding: "120px 60px 80px",
        }}
      >
        {/* ── LEFT: Government ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 30px",
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: C.muted,
              marginBottom: 10,
              opacity: headerOpacity,
            }}
          >
            Government
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: C.amber,
              marginBottom: 30,
              opacity: headerOpacity,
            }}
          >
            🏛️
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: 12,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.06)",
              marginBottom: 40,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${govProgress}%`,
                height: "100%",
                borderRadius: 6,
                backgroundColor: C.amber,
                boxShadow: `0 0 12px ${C.amber}44`,
              }}
            />
          </div>

          {/* Steps list */}
          {GOV_ITEMS.map((item, i) => {
            const itemFrame = govBarStart + item.delay;
            const opacity = interpolate(
              frame,
              [itemFrame, itemFrame + 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const x = interpolate(
              frame,
              [itemFrame, itemFrame + 10],
              [-20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: C.amber,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 18, color: C.muted, fontWeight: 400 }}>
                  {item.label}
                </div>
              </div>
            );
          })}

          <div
            style={{
              fontSize: 14,
              color: C.muted,
              marginTop: 10,
              opacity: frame > govBarStart + 50 ? 1 : 0,
              fontStyle: "italic",
            }}
          >
            {govProgress.toFixed(0)}% after 90 days…
          </div>
        </div>

        {/* ── Center divider ── */}
        <div
          style={{
            width: 1,
            height: `${dividerHeight}%`,
            background: `linear-gradient(180deg, transparent, ${C.cyan}44, transparent)`,
            alignSelf: "center",
          }}
        />

        {/* ── RIGHT: Private Sector ── */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 30px",
          }}
        >
          <div
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: C.muted,
              marginBottom: 10,
              opacity: headerOpacity,
            }}
          >
            Private Sector
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: C.cyan,
              marginBottom: 30,
              opacity: headerOpacity,
            }}
          >
            🚀
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              height: 12,
              borderRadius: 6,
              backgroundColor: "rgba(255,255,255,0.06)",
              marginBottom: 40,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${privateProgress}%`,
                height: "100%",
                borderRadius: 6,
                background: `linear-gradient(90deg, ${C.cyan}, ${C.cyan}cc)`,
                boxShadow: `0 0 20px ${C.cyan}66`,
              }}
            />
            {/* Pulse glow */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: -4,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: C.cyan,
                opacity: pulseOpacity,
                filter: "blur(6px)",
              }}
            />
          </div>

          {/* Steps list */}
          {PRIVATE_ITEMS.map((item, i) => {
            const itemFrame = privateBarStart + item.delay;
            const opacity = interpolate(
              frame,
              [itemFrame, itemFrame + 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const x = interpolate(
              frame,
              [itemFrame, itemFrame + 8],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: C.cyan,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: 18, color: C.white, fontWeight: 500 }}>
                  {item.label}
                </div>
              </div>
            );
          })}

          <div
            style={{
              fontSize: 14,
              color: C.cyan,
              marginTop: 10,
              opacity: frame > privateBarStart + 30 ? 1 : 0,
              fontWeight: 600,
            }}
          >
            Done. Shipped. Next.
          </div>
        </div>
      </AbsoluteFill>

      {/* ── Bottom insight ── */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: insightOpacity,
          transform: `translateY(${insightY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: C.muted,
            fontStyle: "italic",
          }}
        >
          "This is not good, this is not bad — this is just a fact."
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const govVsPrivateMeta = {
  id: "GovVsPrivate",
  component: GovVsPrivate,
  durationInFrames: 150, // 5 seconds at 30fps
  defaultProps: {},
};
