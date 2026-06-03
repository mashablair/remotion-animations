/*
 * MTT Animation 05 — CostOptimizationTakeaway
 * The close: the next battle isn't the smartest AI, it's the cheapest. Winners use AI
 * effectively AND economically. One person can be 10x more productive — IF they understand
 * tokens, context, and the tools.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { CostOptimizationTakeaway } from "./CostOptimizationTakeaway";
 * <Composition
 *   id="CostOptimizationTakeaway"
 *   component={CostOptimizationTakeaway}
 *   durationInFrames={310}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render CostOptimizationTakeaway out/CostOptimizationTakeaway.mp4
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

export const CostOptimizationTakeaway = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1 (10): the reframe
  const l1 = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  const l1Out = interpolate(frame, [70, 85], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2 (85): effective AND economical
  const l2 = spring({ frame: frame - 85, fps, config: { damping: 16 } });
  const l2Out = interpolate(frame, [150, 165], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 3 (165): the human takeaway
  const l3 = spring({ frame: frame - 165, fps, config: { damping: 16 } });
  const ifIn = interpolate(frame, [200, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(0,229,255,0.13) 0%, rgba(10,10,18,0) 60%)",
        }}
      />

      {/* Line 1 */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 200px" }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.25,
            opacity: l1 * l1Out,
            transform: `translateY(${(1 - l1) * 30}px)`,
            position: "absolute",
          }}
        >
          The next battle isn't the <span style={{ color: CYAN }}>smartest</span> AI.
          <br />
          It's the AI people can <span style={{ color: AMBER }}>actually afford</span>.
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.3,
            opacity: l2 * l2Out,
            transform: `translateY(${(1 - l2) * 30}px)`,
            position: "absolute",
          }}
        >
          Winners won't be whoever has the most powerful AI —
          <br />
          but whoever uses it{" "}
          <span style={{ color: CYAN }}>effectively</span> AND{" "}
          <span style={{ color: AMBER }}>economically</span>.
        </div>

        {/* Line 3 */}
        <div
          style={{
            textAlign: "center",
            opacity: l3,
            transform: `translateY(${(1 - l3) * 30}px)`,
            position: "absolute",
          }}
        >
          <div style={{ fontSize: 70, fontWeight: 800 }}>
            One person, <span style={{ color: CYAN }}>10x</span> the output.
          </div>
          <div
            style={{
              fontSize: 38,
              opacity: 0.85 * ifIn,
              marginTop: 36,
              transform: `translateY(${(1 - ifIn) * 20}px)`,
            }}
          >
            IF they understand tokens, context, and the tools.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
