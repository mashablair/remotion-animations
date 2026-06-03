/*
 * MTT Animation 03 — NvidiaComputeCost
 * Nvidia VP of applied deep learning: compute now costs far more than the people on the team.
 *
 * NOTE ON ACCURACY: This animation deliberately shows ONLY the verified directional claim
 * (compute > employees). The "salary ~$300K, tokens 3X that" line in the draft does NOT match
 * the reporting — see editorial flags. The verified anchor is Jensen Huang's framing that a
 * $500K engineer should consume ~$250K in tokens (about HALF the salary), shown as an optional
 * footnote bar. Do not burn a "3X" figure into this file.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { NvidiaComputeCost } from "./NvidiaComputeCost";
 * <Composition
 *   id="NvidiaComputeCost"
 *   component={NvidiaComputeCost}
 *   durationInFrames={270}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render NvidiaComputeCost out/NvidiaComputeCost.mp4
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const BG = "#0a0a12";
const CYAN = "#00e5ff"; // compute / AI
const AMBER = "#ff9f0a"; // human
const FONT = "'Inter', 'Helvetica Neue', system-ui, sans-serif";

const Bar = ({ label, sublabel, color, targetH, delay, frame, fps }) => {
  const grow = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 70 } });
  const h = targetH * grow;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 300 }}>
      <div style={{ fontSize: 30, marginBottom: 18, opacity: grow, color }}>{sublabel}</div>
      <div
        style={{
          width: 200,
          height: h,
          borderRadius: "12px 12px 0 0",
          background: `linear-gradient(180deg, ${color} 0%, ${color}55 100%)`,
          boxShadow: `0 0 40px ${color}55`,
        }}
      />
      <div style={{ fontSize: 34, fontWeight: 700, marginTop: 22 }}>{label}</div>
    </div>
  );
};

export const NvidiaComputeCost = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const captionIn = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(0,229,255,0.12) 0%, rgba(10,10,18,0) 55%)",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 110 }}>
        <div style={{ fontSize: 60, fontWeight: 800, opacity: titleIn }}>NVIDIA</div>
        <div style={{ fontSize: 34, opacity: 0.65 * titleIn, marginTop: 10, textAlign: "center" }}>
          On one team, compute already costs <span style={{ color: CYAN }}>more than the people</span>
        </div>
      </AbsoluteFill>

      {/* Bars */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 120,
          paddingBottom: 230,
        }}
      >
        <Bar
          label="Employees"
          sublabel="human cost"
          color={AMBER}
          targetH={200}
          delay={30}
          frame={frame}
          fps={fps}
        />
        <Bar
          label="Compute"
          sublabel="token / AI cost"
          color={CYAN}
          targetH={460}
          delay={55}
          frame={frame}
          fps={fps}
        />
      </AbsoluteFill>

      {/* Caption */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 120 }}>
        <div style={{ fontSize: 30, opacity: 0.6 * captionIn, textAlign: "center", maxWidth: 1100 }}>
          The CEO's own benchmark: a $500K engineer should burn ~$250K in tokens — about half their salary.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
