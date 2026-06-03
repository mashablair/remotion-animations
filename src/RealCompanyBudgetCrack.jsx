/*
 * MTT Animation 06 — RealCompanyBudgetCrack
 * The "regular company" story: managers enforcing strict AI limits after everyone blew
 * past acceptable spend in record time. From hype → re-evaluation.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { RealCompanyBudgetCrack } from "./RealCompanyBudgetCrack";
 * <Composition
 *   id="RealCompanyBudgetCrack"
 *   component={RealCompanyBudgetCrack}
 *   durationInFrames={270}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render RealCompanyBudgetCrack out/RealCompanyBudgetCrack.mp4
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

export const RealCompanyBudgetCrack = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: "Not just Big Tech" label (0-40)
  const labelIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const labelOut = interpolate(frame, [50, 65], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase B: the arc — two states side by side (70+)
  const arcIn = spring({ frame: frame - 70, fps, config: { damping: 16 } });

  // Arrow between states (110)
  const arrowIn = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right state: Re-evaluating (130)
  const rightIn = spring({ frame: frame - 130, fps, config: { damping: 16 } });

  // Bottom line (175)
  const bottomIn = spring({ frame: frame - 175, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,159,10,0.1) 0%, rgba(10,10,18,0) 55%)",
        }}
      />

      {/* Phase A label */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          paddingTop: 140,
          opacity: labelIn * labelOut,
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700, textAlign: "center" }}>
          This isn't just Microsoft or Nvidia.
        </div>
        <div style={{ fontSize: 36, opacity: 0.65, marginTop: 20 }}>
          It's happening at regular companies too.
        </div>
      </AbsoluteFill>

      {/* Phase B: the two-state arc */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
          opacity: arcIn,
        }}
      >
        {/* Left: the hype phase */}
        <div
          style={{
            padding: "50px 60px",
            borderRadius: 24,
            border: `2px solid ${CYAN}`,
            background: "rgba(0,229,255,0.06)",
            textAlign: "center",
            width: 420,
            transform: `scale(${0.85 + arcIn * 0.15})`,
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 18 }}>🚀</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: CYAN }}>Use AI!</div>
          <div style={{ fontSize: 26, opacity: 0.7, marginTop: 14, lineHeight: 1.4 }}>
            Push the limits.
            <br />
            Embrace the hype.
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 64,
            color: RED,
            opacity: arrowIn,
            transform: `translateX(${(1 - arrowIn) * -20}px)`,
          }}
        >
          →
        </div>

        {/* Right: re-evaluation */}
        <div
          style={{
            padding: "50px 60px",
            borderRadius: 24,
            border: `2px solid ${RED}`,
            background: "rgba(255,59,48,0.06)",
            textAlign: "center",
            width: 420,
            opacity: rightIn,
            transform: `scale(${0.85 + rightIn * 0.15})`,
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 18 }}>🛑</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: RED }}>Strict limits.</div>
          <div style={{ fontSize: 26, opacity: 0.7, marginTop: 14, lineHeight: 1.4 }}>
            Everyone blew the budget
            <br />
            in record time.
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom line */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 120 }}>
        <div
          style={{
            opacity: bottomIn,
            transform: `translateY(${(1 - bottomIn) * 24}px)`,
            fontSize: 38,
            fontWeight: 600,
            color: AMBER,
          }}
        >
          They are re-evaluating.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
