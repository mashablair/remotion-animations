/*
 * MTT Animation 04 — UberBudgetBurn
 * Uber burned its entire 2026 AI budget in 4 months; heaviest users $500–$2k/mo;
 * now capped at $1,500/engineer/month.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { UberBudgetBurn } from "./UberBudgetBurn";
 * <Composition
 *   id="UberBudgetBurn"
 *   component={UberBudgetBurn}
 *   durationInFrames={300}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render UberBudgetBurn out/UberBudgetBurn.mp4
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

export const UberBudgetBurn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // Budget bar drains from full to empty (drain over frames 30-90)
  const drain = interpolate(frame, [30, 95], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const burnFlash = 0.7 + 0.3 * Math.sin(Math.max(0, frame - 30) / 3);

  // "4 months" stamp (95)
  const stampIn = spring({ frame: frame - 95, fps, config: { damping: 12, stiffness: 120 } });

  // Heaviest-user range (140)
  const rangeIn = interpolate(frame, [140, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // New cap (190)
  const capIn = spring({ frame: frame - 190, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,159,10,0.12) 0%, rgba(10,10,18,0) 55%)",
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", paddingTop: 120 }}>
        <div style={{ fontSize: 60, fontWeight: 800, opacity: titleIn }}>UBER</div>
        <div style={{ fontSize: 34, opacity: 0.65 * titleIn, marginTop: 10 }}>
          Entire 2026 AI budget
        </div>
      </AbsoluteFill>

      {/* Draining budget bar */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1000,
            height: 70,
            borderRadius: 16,
            border: "2px solid rgba(255,255,255,0.2)",
            overflow: "hidden",
            position: "relative",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${drain * 100}%`,
              background: `linear-gradient(90deg, ${AMBER}, ${RED})`,
              opacity: burnFlash,
            }}
          />
        </div>

        {/* "gone in 4 months" stamp */}
        <div
          style={{
            marginTop: 60,
            opacity: stampIn,
            transform: `scale(${0.7 + stampIn * 0.3}) rotate(-4deg)`,
            fontSize: 64,
            fontWeight: 800,
            color: RED,
            border: `4px solid ${RED}`,
            padding: "14px 40px",
            borderRadius: 14,
          }}
        >
          GONE IN 4 MONTHS
        </div>

        {/* heaviest users */}
        <div style={{ marginTop: 50, fontSize: 36, opacity: rangeIn }}>
          Heaviest users: <span style={{ color: AMBER }}>$500–$2,000 / month each</span>
        </div>
      </AbsoluteFill>

      {/* New cap */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 110 }}>
        <div
          style={{
            opacity: capIn,
            transform: `translateY(${(1 - capIn) * 30}px)`,
            fontSize: 40,
            fontWeight: 600,
            padding: "18px 44px",
            borderRadius: 999,
            background: "rgba(0,229,255,0.08)",
            border: `1px solid ${CYAN}`,
          }}
        >
          The fix → new cap: <span style={{ color: CYAN }}>$1,500 / engineer / month</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
