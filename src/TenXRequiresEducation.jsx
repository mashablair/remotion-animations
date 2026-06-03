/*
 * MTT Animation 08 — TenXRequiresEducation
 * Point 2: 10x productivity IS possible — but only if you deeply understand
 * tokens, context windows, and tools like Claude Code.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { TenXRequiresEducation } from "./TenXRequiresEducation";
 * <Composition
 *   id="TenXRequiresEducation"
 *   component={TenXRequiresEducation}
 *   durationInFrames={300}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render TenXRequiresEducation out/TenXRequiresEducation.mp4
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
const FONT = "'Inter', 'Helvetica Neue', system-ui, sans-serif";

const Pill = ({ label, delay, frame, fps }) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 16 } });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${(1 - s) * 24}px) scale(${0.85 + s * 0.15})`,
        padding: "20px 40px",
        borderRadius: 999,
        border: `2px solid ${CYAN}`,
        background: "rgba(0,229,255,0.07)",
        fontSize: 34,
        fontWeight: 600,
        color: CYAN,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

export const TenXRequiresEducation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Point label (0)
  const numIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // "10x output IS possible" headline (20)
  const headIn = spring({ frame: frame - 20, fps, config: { damping: 16 } });

  // "BUT" pivot (75)
  const butIn = spring({ frame: frame - 75, fps, config: { damping: 12, stiffness: 130 } });

  // Three requirement pills stagger (115, 145, 175)
  // "Super important trick" label (105)
  const trickIn = interpolate(frame, [105, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(0,229,255,0.13) 0%, rgba(10,10,18,0) 55%)",
        }}
      />

      {/* Point label */}
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
          Point 2 of 2
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 0,
          padding: "0 180px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.15,
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 30}px)`,
          }}
        >
          <span style={{ color: CYAN }}>10x</span> productivity{" "}
          <span style={{ color: AMBER }}>IS</span> possible.
        </div>

        {/* BUT */}
        <div
          style={{
            marginTop: 36,
            fontSize: 56,
            fontWeight: 800,
            color: AMBER,
            opacity: butIn,
            transform: `scale(${0.7 + butIn * 0.3})`,
          }}
        >
          BUT —
        </div>

        {/* The trick label */}
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            opacity: 0.7 * trickIn,
            marginBottom: 32,
          }}
        >
          The super important trick: you have to understand
        </div>

        {/* Three pills */}
        <div style={{ display: "flex", flexDirection: "row", gap: 30, flexWrap: "wrap", justifyContent: "center" }}>
          <Pill label="🪙 Tokens" delay={115} frame={frame} fps={fps} />
          <Pill label="📋 Context windows" delay={145} frame={frame} fps={fps} />
          <Pill label="⚡ Claude Code" delay={175} frame={frame} fps={fps} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
