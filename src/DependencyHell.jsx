// ============================================================
// CLAUDE CODE INSTRUCTIONS — paste these 3 messages:
//
// 1. "Save DependencyHell.jsx into mtt-animations/src/"
//    (paste full file contents)
//
// 2. "Add DependencyHell to Root.tsx — import from ./DependencyHell,
//     id='DependencyHell', durationInFrames=210, fps=30,
//     width=1920, height=1080"
//
// 3. "Render the DependencyHell composition to out/DependencyHell.mp4"
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
} from "remotion";

const COLORS = {
  bg: "#0c0c14",
  red: "#ef4444",
  redDim: "#991b1b",
  amber: "#f59e0b",
  textPrimary: "#f1f5f9",
  textDim: "#64748b",
  terminal: "#1a1a2e",
  terminalBorder: "#2d2d44",
  green: "#22c55e",
};

const errors = [
  { pkg: "webpack", from: "5.88.2", to: "5.91.0", error: "BREAKING CHANGE: Module.hash" },
  { pkg: "react-scripts", from: "5.0.1", to: "5.1.0", error: "Cannot resolve 'webpack/lib/util'" },
  { pkg: "babel-loader", from: "9.1.2", to: "9.2.1", error: "Incompatible peer dependency" },
  { pkg: "postcss", from: "8.4.21", to: "8.4.35", error: "Plugin autoprefixer requires PostCSS 8" },
  { pkg: "eslint", from: "8.36.0", to: "9.0.0", error: "Flat config required — .eslintrc deprecated" },
  { pkg: "typescript", from: "4.9.5", to: "5.4.2", error: "Type 'X' is not assignable to type 'Y'" },
];

export default function DependencyHell() {
  const frame = useCurrentFrame();
  const fps = 30;

  // Progress bar animation - fills then resets twice
  const progressCycle = frame % 90;
  const progressWidth = interpolate(progressCycle, [0, 70, 75, 90], [0, 95, 95, 0], {
    extrapolateRight: "clamp",
  });
  const progressColor = progressCycle > 70 ? COLORS.red : COLORS.amber;

  // Error lines cascade in
  const getErrorEntry = (index) => {
    const delay = 15 + index * 22;
    const opacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateRight: "clamp" });
    const slideY = interpolate(frame, [delay, delay + 12], [20, 0], { extrapolateRight: "clamp" });
    // Shake on appear
    const shakeOffset = frame >= delay && frame < delay + 8
      ? Math.sin((frame - delay) * 8) * 3
      : 0;
    return { opacity, slideY, shakeOffset };
  };

  // Screen shake after all errors
  const allErrorsIn = 15 + errors.length * 22;
  const screenShake = frame > allErrorsIn && frame < allErrorsIn + 20
    ? Math.sin(frame * 12) * 4
    : 0;

  // Final "0 user impact" text
  const finalOpacity = interpolate(frame, [allErrorsIn + 10, allErrorsIn + 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', 'SF Mono', monospace",
        transform: `translateX(${screenShake}px)`,
        overflow: "hidden",
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          width: 1400,
          backgroundColor: COLORS.terminal,
          borderRadius: 16,
          border: `1px solid ${COLORS.terminalBorder}`,
          overflow: "hidden",
          boxShadow: `0 0 80px ${COLORS.red}15`,
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 20px",
            borderBottom: `1px solid ${COLORS.terminalBorder}`,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          <span style={{ color: COLORS.textDim, fontSize: 16, marginLeft: 12 }}>
            npm update — mtt-project
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "12px 24px" }}>
          <div
            style={{
              height: 6,
              backgroundColor: "#1e1e32",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressWidth}%`,
                backgroundColor: progressColor,
                borderRadius: 3,
                transition: "background-color 0.2s",
              }}
            />
          </div>
        </div>

        {/* Error lines */}
        <div style={{ padding: "8px 24px 24px" }}>
          {errors.map((err, i) => {
            const { opacity, slideY, shakeOffset } = getErrorEntry(i);
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${slideY}px) translateX(${shakeOffset}px)`,
                  marginBottom: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: COLORS.red, fontSize: 20 }}>✗</span>
                  <span style={{ color: COLORS.amber, fontSize: 20 }}>
                    {err.pkg}
                  </span>
                  <span style={{ color: COLORS.textDim, fontSize: 18 }}>
                    {err.from} → {err.to}
                  </span>
                </div>
                <span
                  style={{
                    color: COLORS.red,
                    fontSize: 17,
                    marginLeft: 34,
                    opacity: 0.85,
                  }}
                >
                  ERROR: {err.error}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom callout */}
      <div
        style={{
          marginTop: 50,
          opacity: finalOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: COLORS.textDim,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          2 days of work
        </span>
        <span
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.red,
            fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            textShadow: `0 0 40px ${COLORS.red}66`,
          }}
        >
          0 user impact
        </span>
      </div>
    </div>
  );
}
