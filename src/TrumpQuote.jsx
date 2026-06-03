import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

const C = {
  bg: "#0a0a12",
  cyan: "#00e5ff",
  cyanDim: "rgba(0,229,255,0.06)",
  red: "#ff3b30",
  white: "#f0f0f0",
  muted: "#6b7280",
  quoteMark: "rgba(0,229,255,0.12)",
};

const FONT = `"SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif`;

// Split quote into words for staggered reveal
const QUOTE_LINE_1 = "We're leading China,";
const QUOTE_LINE_2 = "we're leading everybody,";
const QUOTE_LINE_3 = "and I don't want to do anything";
const QUOTE_LINE_4 = "that's going to get in the way of that lead.";

const LINES = [QUOTE_LINE_1, QUOTE_LINE_2, QUOTE_LINE_3, QUOTE_LINE_4];

export const TrumpQuote = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phases ──
  const quoteMarkStart = 0;
  const lineStart = 10;
  const lineGap = 18; // frames between each line
  const attributionStart = lineStart + LINES.length * lineGap + 10;
  const questionStart = attributionStart + 25;

  // ── Quote mark ──
  const quoteMarkScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // ── Vertical accent line ──
  const accentHeight = interpolate(frame, [5, 25], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Attribution ──
  const attrOpacity = interpolate(frame, [attributionStart, attributionStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Big question ──
  const questionScale = spring({
    frame: frame - questionStart,
    fps,
    config: { damping: 14, mass: 0.6 },
  });
  const questionOpacity = interpolate(frame, [questionStart, questionStart + 8], [0, 1], {
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
      {/* ── Background radial ── */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.cyanDim}, transparent 60%)`,
          transform: "translateX(-50%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 100px",
        }}
      >
        <div style={{ maxWidth: 900, position: "relative" }}>
          {/* ── Giant quote mark ── */}
          <div
            style={{
              position: "absolute",
              top: -80,
              left: -40,
              fontSize: 200,
              fontWeight: 900,
              color: C.quoteMark,
              lineHeight: 1,
              transform: `scale(${quoteMarkScale})`,
              userSelect: "none",
            }}
          >
            "
          </div>

          {/* ── Accent bar ── */}
          <div
            style={{
              position: "absolute",
              left: -24,
              top: 0,
              width: 3,
              height: `${accentHeight}%`,
              backgroundColor: C.cyan,
              borderRadius: 2,
            }}
          />

          {/* ── Quote lines ── */}
          {LINES.map((line, i) => {
            const thisLineStart = lineStart + i * lineGap;
            const opacity = interpolate(
              frame,
              [thisLineStart, thisLineStart + 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const y = interpolate(
              frame,
              [thisLineStart, thisLineStart + 10],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Highlight key words
            const isEmphasis = i === 0 || i === 3;

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  fontSize: 42,
                  fontWeight: isEmphasis ? 700 : 400,
                  color: isEmphasis ? C.white : C.muted,
                  lineHeight: 1.5,
                  marginBottom: 4,
                }}
              >
                {line}
              </div>
            );
          })}

          {/* ── Attribution ── */}
          <div
            style={{
              opacity: attrOpacity,
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 30,
                height: 2,
                backgroundColor: C.muted,
              }}
            />
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: C.muted,
                letterSpacing: 1,
              }}
            >
              President Trump, May 21, 2026
            </div>
          </div>
        </div>

        {/* ── Big question overlay ── */}
        {frame >= questionStart && (
          <div
            style={{
              position: "absolute",
              bottom: 70,
              textAlign: "center",
              opacity: questionOpacity,
              transform: `scale(${questionScale})`,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: C.cyan,
                letterSpacing: 2,
              }}
            >
              Winning the race — or protecting the public?
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const trumpQuoteMeta = {
  id: "TrumpQuote",
  component: TrumpQuote,
  durationInFrames: 150, // 5 seconds at 30fps
  defaultProps: {},
};
