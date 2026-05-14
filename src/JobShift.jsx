// ============================================================
// CLAUDE CODE INSTRUCTIONS — paste these 3 messages:
//
// 1. "Save JobShift.jsx into mtt-animations/src/"
//    (paste full file contents)
//
// 2. "Add JobShift to Root.tsx — import from ./JobShift,
//     id='JobShift', durationInFrames=270, fps=30,
//     width=1920, height=1080"
//
// 3. "Render the JobShift composition to out/JobShift.mp4"
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";

const COLORS = {
  bg: "#0a0a0f",
  loved: "#22c55e",
  lovedLight: "#4ade80",
  hated: "#ef4444",
  hatedDim: "#7f1d1d",
  ai: "#8b5cf6",
  aiGlow: "#a78bfa",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textDim: "#475569",
  barBg: "#1e293b",
};

export default function JobShift() {
  const frame = useCurrentFrame();
  const fps = 30;

  // === PHASE 1: "BEFORE" — single bar, mixed (frames 0–60) ===
  const phase1Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const beforeLabel = interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" });

  // === PHASE 2: Bar splits apart (frames 70–120) ===
  const splitProgress = interpolate(frame, [70, 110], [0, 1], {
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3), // ease out
  });

  // Loved bar moves up, hated moves down
  const lovedY = interpolate(splitProgress, [0, 1], [0, -120]);
  const hatedY = interpolate(splitProgress, [0, 1], [0, 120]);

  // === PHASE 3: AI absorbs hated chunk (frames 120–180) ===
  const aiAbsorb = interpolate(frame, [125, 175], [0, 1], { extrapolateRight: "clamp" });
  const hatedWidth = interpolate(aiAbsorb, [0, 1], [45, 0]);
  const aiLabelOpacity = interpolate(frame, [140, 160], [0, 1], { extrapolateRight: "clamp" });

  // === PHASE 4: Loved chunk expands (frames 180–230) ===
  const lovedExpand = interpolate(frame, [180, 225], [55, 92], { extrapolateRight: "clamp" });

  // === PHASE 5: "AFTER" label + superpowers text (frames 230+) ===
  const afterLabel = interpolate(frame, [230, 250], [0, 1], { extrapolateRight: "clamp" });
  const afterScale = spring({ frame: Math.max(0, frame - 235), fps, config: { damping: 10 } });

  // Which phase are we in for display logic
  const isSplit = frame >= 70;
  const isAbsorbing = frame >= 120;

  const barLeft = 260;
  const barTop = 440;
  const barHeight = 80;
  const totalWidth = 1400;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: phase1Opacity,
        }}
      >
        <span
          style={{
            fontSize: 28,
            color: COLORS.textDim,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {frame < 230 ? "YOUR JOB — BEFORE" : ""}
        </span>
      </div>

      {/* BEFORE label */}
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          textAlign: "center",
          opacity: beforeLabel,
        }}
      >
        <span style={{ fontSize: 48, fontWeight: 700, color: COLORS.textPrimary }}>
          {frame < 70 ? "Everything mixed together" : ""}
        </span>
      </div>

      {/* === THE BARS === */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 1920, height: 1080 }}>
        {!isSplit ? (
          /* PHASE 1: Single combined bar */
          <div
            style={{
              position: "absolute",
              left: barLeft,
              top: barTop,
              display: "flex",
              opacity: phase1Opacity,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: totalWidth * 0.55,
                height: barHeight,
                backgroundColor: COLORS.loved,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 600, color: "#052e16" }}>
                PARTS YOU LOVE — 55%
              </span>
            </div>
            <div
              style={{
                width: totalWidth * 0.45,
                height: barHeight,
                backgroundColor: COLORS.hated,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 600, color: "#450a0a" }}>
                PARTS YOU HATE — 45%
              </span>
            </div>
          </div>
        ) : (
          /* PHASES 2-5: Split bars */
          <>
            {/* LOVED BAR — moves up, then expands */}
            <div
              style={{
                position: "absolute",
                left: barLeft,
                top: barTop + lovedY,
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: totalWidth * (isAbsorbing ? lovedExpand : 55) / 100,
                  height: barHeight,
                  backgroundColor: COLORS.loved,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  boxShadow: frame >= 180 ? `0 0 40px ${COLORS.loved}33` : "none",
                }}
              >
                <span style={{ fontSize: 26, fontWeight: 600, color: "#052e16" }}>
                  {frame >= 225 ? "WHAT YOU LOVE — AMPLIFIED ✨" : "PARTS YOU LOVE"}
                </span>
              </div>
            </div>

            {/* HATED BAR — moves down, then shrinks to 0 */}
            {hatedWidth > 0.5 && (
              <div
                style={{
                  position: "absolute",
                  left: barLeft,
                  top: barTop + hatedY,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: totalWidth * hatedWidth / 100,
                    height: barHeight,
                    backgroundColor: isAbsorbing
                      ? interpolate(aiAbsorb, [0, 1], [0, 1]) > 0.5
                        ? COLORS.ai
                        : COLORS.hated
                      : COLORS.hated,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    opacity: interpolate(aiAbsorb, [0.8, 1], [1, 0], { extrapolateRight: "clamp" }),
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: "#fff",
                      opacity: 1 - aiAbsorb,
                    }}
                  >
                    PARTS YOU HATE
                  </span>
                </div>
              </div>
            )}

            {/* AI ABSORBED label */}
            <div
              style={{
                position: "absolute",
                left: barLeft,
                top: barTop + hatedY + barHeight + 20,
                opacity: aiLabelOpacity * (1 - afterLabel),
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28, color: COLORS.ai }}>⚡</span>
              <span style={{ fontSize: 26, color: COLORS.ai, fontWeight: 600 }}>
                AI handles this now
              </span>
            </div>
          </>
        )}
      </div>

      {/* AFTER LABEL */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          width: "100%",
          textAlign: "center",
          opacity: afterLabel,
          transform: `scale(${afterScale})`,
        }}
      >
        <div style={{ fontSize: 22, color: COLORS.textDim, letterSpacing: "0.15em", marginBottom: 12 }}>
          YOUR JOB — AFTER
        </div>
        <span style={{ fontSize: 48, fontWeight: 700, color: COLORS.lovedLight }}>
          More of what matters. Less of what didn't.
        </span>
      </div>
    </div>
  );
}
