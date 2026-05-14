// ============================================================
// CLAUDE CODE INSTRUCTIONS — paste these 3 messages:
//
// 1. "Save ThenVsNow.jsx into mtt-animations/src/"
//    (paste full file contents)
//
// 2. "Add ThenVsNow to Root.tsx — import from ./ThenVsNow,
//     id='ThenVsNow', durationInFrames=240, fps=30,
//     width=1920, height=1080"
//
// 3. "Render the ThenVsNow composition to out/ThenVsNow.mp4"
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";

const COLORS = {
  bg: "#0a0a0f",
  red: "#ef4444",
  green: "#22c55e",
  greenGlow: "#4ade80",
  purple: "#8b5cf6",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textDim: "#475569",
  barBg: "#1e293b",
  cardBg: "#111827",
};

export default function ThenVsNow() {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // === TOP ROW: THEN (slow) ===
  const thenLabelOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });

  // Idea node appears
  const thenIdeaOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateRight: "clamp" });
  // Long bar grows slowly
  const thenBarWidth = interpolate(frame, [35, 120], [0, 900], { extrapolateRight: "clamp" });
  // Day labels appear along the bar
  const thenDay1 = interpolate(frame, [50, 55], [0, 1], { extrapolateRight: "clamp" });
  const thenDay2 = interpolate(frame, [70, 75], [0, 1], { extrapolateRight: "clamp" });
  const thenDay3 = interpolate(frame, [90, 95], [0, 1], { extrapolateRight: "clamp" });
  const thenDay4 = interpolate(frame, [105, 110], [0, 1], { extrapolateRight: "clamp" });
  // Prototype node
  const thenProtoOpacity = interpolate(frame, [118, 128], [0, 1], { extrapolateRight: "clamp" });

  // === BOTTOM ROW: NOW (fast) ===
  const nowLabelOpacity = interpolate(frame, [130, 145], [0, 1], { extrapolateRight: "clamp" });
  const nowIdeaOpacity = interpolate(frame, [140, 150], [0, 1], { extrapolateRight: "clamp" });

  // Short bar grows fast with a glow
  const nowBarWidth = interpolate(frame, [150, 175], [0, 220], { extrapolateRight: "clamp" });

  // AI assist icon in the middle
  const aiIconOpacity = interpolate(frame, [158, 168], [0, 1], { extrapolateRight: "clamp" });
  const aiPulse = interpolate(frame % 40, [0, 20, 40], [0.6, 1, 0.6]);

  // Prototype appears with a pop
  const nowProtoScale = spring({
    frame: Math.max(0, frame - 172),
    fps,
    config: { damping: 8, stiffness: 120 },
  });
  const nowProtoOpacity = interpolate(frame, [172, 178], [0, 1], { extrapolateRight: "clamp" });

  // === COMPARISON TEXT (190+) ===
  const compOpacity = interpolate(frame, [195, 215], [0, 1], { extrapolateRight: "clamp" });

  const leftX = 260;
  const thenY = 320;
  const nowY = 620;
  const nodeSize = 64;

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
      <div style={{ position: "absolute", top: 60, width: "100%", textAlign: "center", opacity: titleOpacity }}>
        <h2 style={{ fontSize: 42, fontWeight: 700, color: COLORS.textPrimary, margin: 0 }}>
          Idea → Prototype
        </h2>
      </div>

      {/* === THEN row === */}
      {/* Label */}
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: thenY - 80,
          opacity: thenLabelOpacity,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.red, letterSpacing: "0.05em" }}>
          THEN
        </span>
        <span style={{ fontSize: 22, color: COLORS.textDim, marginLeft: 16 }}>
          days of manual work
        </span>
      </div>

      {/* Idea node */}
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: thenY,
          width: nodeSize,
          height: nodeSize,
          borderRadius: 14,
          backgroundColor: COLORS.cardBg,
          border: `2px solid ${COLORS.textDim}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          opacity: thenIdeaOpacity,
        }}
      >
        💡
      </div>

      {/* Long bar */}
      <div
        style={{
          position: "absolute",
          left: leftX + nodeSize + 16,
          top: thenY + 22,
          width: thenBarWidth,
          height: 20,
          backgroundColor: COLORS.red,
          borderRadius: 10,
          opacity: 0.7,
        }}
      />

      {/* Day markers along the bar */}
      {[
        { label: "Day 1", x: 200, opacity: thenDay1 },
        { label: "Day 2", x: 430, opacity: thenDay2 },
        { label: "Day 3", x: 650, opacity: thenDay3 },
        { label: "Day 4+", x: 830, opacity: thenDay4 },
      ].map((day, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: leftX + nodeSize + 16 + day.x,
            top: thenY + 50,
            opacity: day.opacity,
            textAlign: "center",
          }}
        >
          <div style={{ width: 2, height: 12, backgroundColor: COLORS.textDim, margin: "0 auto" }} />
          <span style={{ fontSize: 18, color: COLORS.textDim }}>{day.label}</span>
        </div>
      ))}

      {/* Prototype node (then) */}
      <div
        style={{
          position: "absolute",
          left: leftX + nodeSize + 16 + 920,
          top: thenY,
          width: nodeSize,
          height: nodeSize,
          borderRadius: 14,
          backgroundColor: COLORS.cardBg,
          border: `2px solid ${COLORS.textDim}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          opacity: thenProtoOpacity,
        }}
      >
        🖥️
      </div>

      {/* === NOW row === */}
      {/* Label */}
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: nowY - 80,
          opacity: nowLabelOpacity,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.green, letterSpacing: "0.05em" }}>
          NOW
        </span>
        <span style={{ fontSize: 22, color: COLORS.textDim, marginLeft: 16 }}>
          minutes with AI assist
        </span>
      </div>

      {/* Idea node */}
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: nowY,
          width: nodeSize,
          height: nodeSize,
          borderRadius: 14,
          backgroundColor: COLORS.cardBg,
          border: `2px solid ${COLORS.green}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          opacity: nowIdeaOpacity,
          boxShadow: `0 0 20px ${COLORS.green}22`,
        }}
      >
        💡
      </div>

      {/* Short bar — fast! */}
      <div
        style={{
          position: "absolute",
          left: leftX + nodeSize + 16,
          top: nowY + 22,
          width: nowBarWidth,
          height: 20,
          background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.purple})`,
          borderRadius: 10,
          boxShadow: `0 0 24px ${COLORS.green}44`,
        }}
      />

      {/* AI icon in the bar */}
      <div
        style={{
          position: "absolute",
          left: leftX + nodeSize + 16 + 90,
          top: nowY - 10,
          opacity: aiIconOpacity,
          transform: `scale(${aiPulse})`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: COLORS.purple,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            boxShadow: `0 0 20px ${COLORS.purple}66`,
          }}
        >
          ⚡
        </div>
      </div>

      {/* Prototype node (now) — pops in */}
      <div
        style={{
          position: "absolute",
          left: leftX + nodeSize + 16 + 240,
          top: nowY,
          width: nodeSize,
          height: nodeSize,
          borderRadius: 14,
          backgroundColor: COLORS.cardBg,
          border: `2px solid ${COLORS.green}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          opacity: nowProtoOpacity,
          transform: `scale(${nowProtoScale})`,
          boxShadow: `0 0 30px ${COLORS.green}33`,
        }}
      >
        🖥️
      </div>

      {/* === COMPARISON === */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: compOpacity,
        }}
      >
        <span style={{ fontSize: 44, fontWeight: 700, color: COLORS.greenGlow }}>
          That "rebel engineer" now has superpowers ⚡
        </span>
      </div>
    </div>
  );
}
