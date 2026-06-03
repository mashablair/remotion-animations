/*
 * MTT Animation 07 — AINotCheap
 * Point 1: AI is not as cheap as we thought. Compute costs are unsustainable.
 * AI companies will have to raise prices. The "replace expensive humans with cheap AI"
 * bet is not playing out.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { AINotCheap } from "./AINotCheap";
 * <Composition
 *   id="AINotCheap"
 *   component={AINotCheap}
 *   durationInFrames={270}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render AINotCheap out/AINotCheap.mp4
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const BG = "#0a0a12";
const CYAN = "#00e5ff";
const AMBER = "#ff9f0a";
const RED = "#ff3b30";
const FONT = "'Inter', 'Helvetica Neue', system-ui, sans-serif";

export const AINotCheap = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Point number label (0)
  const numIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // Main claim (20)
  const claimIn = spring({ frame: frame - 20, fps, config: { damping: 16 } });

  // Struck-out expectation (70)
  const strikeProgress = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strikeIn = interpolate(frame, [65, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "↑ Prices will rise" (110)
  const priceIn = spring({ frame: frame - 110, fps, config: { damping: 14, stiffness: 100 } });

  // Sub-line "It's just unsustainable" (155)
  const subIn = interpolate(frame, [155, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rising price arrow animation
  const arrowY = interpolate(frame, [110, 180], [0, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,59,48,0.12) 0%, rgba(10,10,18,0) 55%)",
        }}
      />

      {/* Point number */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 130 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
            color: CYAN,
            opacity: numIn,
            textTransform: "uppercase",
          }}
        >
          Point 1 of 2
        </div>
      </AbsoluteFill>

      {/* Main claim */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 200px" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              opacity: claimIn,
              transform: `translateY(${(1 - claimIn) * 30}px)`,
              lineHeight: 1.1,
            }}
          >
            AI is <span style={{ color: RED }}>not</span> as cheap
            <br />
            as we thought.
          </div>

          {/* Struck-out expectation */}
          <div
            style={{
              marginTop: 50,
              fontSize: 38,
              opacity: strikeIn * 0.8,
              position: "relative",
              display: "inline-block",
              color: AMBER,
            }}
          >
            Replace expensive humans with cheap AI
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                height: 4,
                width: `${strikeProgress * 100}%`,
                background: RED,
                borderRadius: 4,
              }}
            />
          </div>

          {/* Prices will rise */}
          <div
            style={{
              marginTop: 44,
              fontSize: 48,
              fontWeight: 700,
              color: RED,
              opacity: priceIn,
              transform: `translateY(${(1 - priceIn) * 30 + arrowY}px)`,
            }}
          >
            ↑ Prices will rise.
          </div>

          {/* Sub-line */}
          <div
            style={{
              marginTop: 22,
              fontSize: 32,
              opacity: 0.6 * subIn,
            }}
          >
            The compute costs are unsustainable.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
