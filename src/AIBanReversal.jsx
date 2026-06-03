/*
 * MTT Animation 01 — AIBanReversal
 * The hook: companies hired cheap AI to replace expensive humans... now they're banning it.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { AIBanReversal } from "./AIBanReversal";
 * <Composition
 *   id="AIBanReversal"
 *   component={AIBanReversal}
 *   durationInFrames={240}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render AIBanReversal out/AIBanReversal.mp4
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const BG = "#0a0a12";
const CYAN = "#00e5ff"; // AI
const AMBER = "#ff9f0a"; // human
const RED = "#ff3b30"; // danger / cancellation
const FONT = "'Inter', 'Helvetica Neue', system-ui, sans-serif";

const Backdrop = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 240], [0.15, 0.3]);
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(0,229,255,${glow}) 0%, rgba(10,10,18,0) 60%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const AIBanReversal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: the premise (0-55)
  const premiseIn = spring({ frame, fps, config: { damping: 200 } });
  const premiseOut = interpolate(frame, [55, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase B: the reveal title (75+)
  const titleSpring = spring({
    frame: frame - 78,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const titleOpacity = interpolate(frame, [78, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "BANNING" red flash
  const banPulse =
    0.85 + 0.15 * Math.sin(Math.max(0, frame - 95) / 4);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: "#fff" }}>
      <Backdrop />

      {/* Phase A */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: premiseIn * premiseOut,
          padding: "0 220px",
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 500, textAlign: "center", lineHeight: 1.3 }}>
          Replace your <span style={{ color: AMBER }}>slow, expensive workers</span>
          <br />
          with <span style={{ color: CYAN }}>fast, cheap AI.</span>
        </div>
        <div style={{ marginTop: 50, fontSize: 40, opacity: 0.7 }}>
          That was the plan.
        </div>
      </AbsoluteFill>

      {/* Phase B */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: titleOpacity,
          transform: `scale(${0.9 + titleSpring * 0.1})`,
          padding: "0 180px",
        }}
      >
        <div style={{ fontSize: 46, fontWeight: 500, opacity: 0.75, marginBottom: 30 }}>
          AI got so expensive that
        </div>
        <div style={{ fontSize: 92, fontWeight: 800, textAlign: "center", lineHeight: 1.1 }}>
          companies are{" "}
          <span style={{ color: RED, opacity: banPulse }}>BANNING</span> it
        </div>
        <div style={{ fontSize: 40, opacity: 0.6, marginTop: 40 }}>
          Just ask Microsoft.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
