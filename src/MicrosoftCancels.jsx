/*
 * MTT Animation 02 — MicrosoftCancels
 * Microsoft cancels most Claude Code licenses for its Experiences + Devices division
 * (Windows, M365, Outlook, Teams, Surface), moving engineers to GitHub Copilot CLI by June 30.
 *
 * --- CLAUDE CODE: REGISTER IN src/Root.tsx ---
 * import { MicrosoftCancels } from "./MicrosoftCancels";
 * <Composition
 *   id="MicrosoftCancels"
 *   component={MicrosoftCancels}
 *   durationInFrames={270}
 *   fps={30}
 *   width={1920}
 *   height={1080}
 * />
 *
 * --- CLAUDE CODE: RENDER ---
 * npx remotion render MicrosoftCancels out/MicrosoftCancels.mp4
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
const RED = "#ff3b30";
const FONT = "'Inter', 'Helvetica Neue', system-ui, sans-serif";

export const MicrosoftCancels = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelIn = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // Claude Code card appears (20), then gets struck out in red (60)
  const ccIn = spring({ frame: frame - 20, fps, config: { damping: 16 } });
  const strike = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ccDim = interpolate(frame, [80, 95], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow + Copilot CLI slides in (100)
  const arrowIn = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const copilotIn = spring({ frame: frame - 110, fps, config: { damping: 16 } });

  // Deadline tag (150)
  const tagIn = spring({ frame: frame - 150, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: FONT, color: "#fff" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,59,48,0.12) 0%, rgba(10,10,18,0) 55%)",
        }}
      />

      {/* Top label */}
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 150 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: 1,
            opacity: labelIn,
            transform: `translateY(${(1 - labelIn) * -20}px)`,
          }}
        >
          MICROSOFT
        </div>
        <div style={{ fontSize: 32, opacity: 0.6 * labelIn, marginTop: 12 }}>
          Experiences + Devices division
        </div>
      </AbsoluteFill>

      {/* Center row: Claude Code  →  Copilot CLI */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 70,
          marginTop: 60,
        }}
      >
        {/* Claude Code card (cancelled) */}
        <div
          style={{
            position: "relative",
            padding: "46px 60px",
            borderRadius: 20,
            border: `2px solid ${RED}`,
            background: "rgba(255,59,48,0.06)",
            opacity: ccIn * ccDim,
            transform: `scale(${0.8 + ccIn * 0.2})`,
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Claude Code
          {/* red strike */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "8%",
              height: 6,
              width: `${strike * 84}%`,
              background: RED,
              borderRadius: 4,
            }}
          />
        </div>

        {/* Arrow */}
        <div style={{ fontSize: 70, color: CYAN, opacity: arrowIn }}>→</div>

        {/* Copilot CLI card */}
        <div
          style={{
            padding: "46px 60px",
            borderRadius: 20,
            border: `2px solid ${CYAN}`,
            background: "rgba(0,229,255,0.07)",
            opacity: copilotIn,
            transform: `translateX(${(1 - copilotIn) * 60}px)`,
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          GitHub Copilot CLI
        </div>
      </AbsoluteFill>

      {/* Deadline tag */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 150 }}>
        <div
          style={{
            opacity: tagIn,
            transform: `scale(${0.85 + tagIn * 0.15})`,
            fontSize: 40,
            fontWeight: 600,
            padding: "18px 40px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Deadline: <span style={{ color: RED }}>June 30</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
