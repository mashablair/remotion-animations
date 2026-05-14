// ============================================================
// CLAUDE CODE INSTRUCTIONS — paste these 3 messages:
//
// 1. "Save FlowVsDrain.jsx into mtt-animations/src/"
//    (paste full file contents)
//
// 2. "Add FlowVsDrain to Root.tsx — import from ./FlowVsDrain,
//     id='FlowVsDrain', durationInFrames=240, fps=30,
//     width=1920, height=1080"
//
// 3. "Render the FlowVsDrain composition to out/FlowVsDrain.mp4"
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const COLORS = {
  bg: "#0a0a0f",
  loved: "#22c55e",
  lovedGlow: "#4ade80",
  lovedBg: "rgba(34, 197, 94, 0.08)",
  hated: "#ef4444",
  hatedGlow: "#f87171",
  hatedBg: "rgba(239, 68, 68, 0.06)",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  divider: "#1e293b",
};

const lovedItems = [
  { icon: "✨", label: "Building new features" },
  { icon: "🧠", label: "Thinking like the user" },
  { icon: "🎨", label: "Pixel-perfect craft" },
  { icon: "⚡", label: "Rebel prototyping" },
  { icon: "📚", label: "Learning & applying fast" },
];

const hatedItems = [
  { icon: "📦", label: "Dependency updates" },
  { icon: "🪳", label: "Bugs from others' code" },
  { icon: "📅", label: "Irrelevant meetings" },
  { icon: "🔧", label: "Invisible maintenance" },
  { icon: "⏳", label: "Hours → zero user impact" },
];

export default function FlowVsDrain() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Headers slide in (0-30)
  const headerLeft = spring({ frame, fps, from: -400, to: 0, config: { damping: 14 } });
  const headerRight = spring({ frame, fps, from: 400, to: 0, config: { damping: 14 } });

  // Divider draws down
  const dividerHeight = interpolate(frame, [15, 50], [0, 100], { extrapolateRight: "clamp" });

  // Items stagger in
  const getItemOpacity = (index, side) => {
    const baseDelay = side === "left" ? 35 : 40;
    const delay = baseDelay + index * 12;
    return interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
  };

  const getItemSlide = (index, side) => {
    const baseDelay = side === "left" ? 35 : 40;
    const delay = baseDelay + index * 12;
    const dir = side === "left" ? -30 : 30;
    return interpolate(frame, [delay, delay + 15], [dir, 0], { extrapolateRight: "clamp" });
  };

  // Glow pulse on loved side (after items appear)
  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3],
    { extrapolateRight: "clamp" }
  );

  // Dim pulse on hated side
  const dimPulse = interpolate(
    frame % 80,
    [0, 40, 80],
    [0.05, 0.12, 0.05],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        display: "flex",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left side — LOVED */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle green glow background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.loved}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />

        <h2
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.loved,
            marginBottom: 50,
            letterSpacing: "-0.02em",
            transform: `translateX(${headerLeft}px)`,
            textShadow: `0 0 30px ${COLORS.loved}44`,
          }}
        >
          FLOW STATE ✨
        </h2>

        {lovedItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 28,
              opacity: getItemOpacity(i, "left"),
              transform: `translateX(${getItemSlide(i, "left")}px)`,
              backgroundColor: COLORS.lovedBg,
              padding: "16px 32px",
              borderRadius: 12,
              borderLeft: `3px solid ${COLORS.loved}`,
              width: 520,
            }}
          >
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span
              style={{
                fontSize: 30,
                color: COLORS.textPrimary,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Center divider */}
      <div
        style={{
          width: 2,
          background: `linear-gradient(to bottom, transparent, ${COLORS.divider}, transparent)`,
          alignSelf: "center",
          height: `${dividerHeight}%`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: COLORS.bg,
            border: `2px solid ${COLORS.divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: COLORS.textSecondary,
            opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          VS
        </div>
      </div>

      {/* Right side — HATED */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle red glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.hated}${Math.round(dimPulse * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />

        <h2
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.hated,
            marginBottom: 50,
            letterSpacing: "-0.02em",
            transform: `translateX(${headerRight}px)`,
            textShadow: `0 0 30px ${COLORS.hated}44`,
          }}
        >
          DRAIN STATE 😤
        </h2>

        {hatedItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 28,
              opacity: getItemOpacity(i, "right"),
              transform: `translateX(${getItemSlide(i, "right")}px)`,
              backgroundColor: COLORS.hatedBg,
              padding: "16px 32px",
              borderRadius: 12,
              borderLeft: `3px solid ${COLORS.hated}`,
              width: 520,
            }}
          >
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span
              style={{
                fontSize: 30,
                color: COLORS.textPrimary,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
