// ============================================================
// CLAUDE CODE INSTRUCTIONS — paste these 3 messages:
//
// 1. "Save AIToolCards.jsx into mtt-animations/src/"
//    (paste full file contents)
//
// 2. "Add AIToolCards to Root.tsx — import from ./AIToolCards,
//     id='AIToolCards', durationInFrames=240, fps=30,
//     width=1920, height=1080"
//
// 3. "Render the AIToolCards composition to out/AIToolCards.mp4"
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
  purple: "#8b5cf6",
  amber: "#f59e0b",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textDim: "#475569",
  cardBg: "#111827",
  cardBorder: "#1e293b",
  arrowColor: "#4ade80",
};

const pairs = [
  {
    pain: "Dependency hell",
    painIcon: "📦",
    tool: "Opus 4.7 / GPT 5.5",
    toolIcon: "🧠",
    detail: "Full codebase context",
    color: "#ef4444",
  },
  {
    pain: "Useless meetings",
    painIcon: "📅",
    tool: "Fireflies / Grain",
    toolIcon: "🎙️",
    detail: "AI summary, role-filtered",
    color: "#f59e0b",
  },
  {
    pain: "Slow prototyping",
    painIcon: "🐌",
    tool: "Claude Code / Cursor",
    toolIcon: "⚡",
    detail: "Idea → working demo in minutes",
    color: "#f97316",
  },
  {
    pain: "Typing everything",
    painIcon: "⌨️",
    tool: "Whispr Flow",
    toolIcon: "🗣️",
    detail: "Talk, don't type",
    color: "#a855f7",
  },
];

export default function AIToolCards() {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const getRowAnim = (index) => {
    const delay = 25 + index * 40;
    // Pain card slides in from left
    const painSlide = interpolate(frame, [delay, delay + 18], [-300, 0], {
      extrapolateRight: "clamp",
    });
    const painOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
      extrapolateRight: "clamp",
    });
    // Arrow draws
    const arrowWidth = interpolate(frame, [delay + 14, delay + 26], [0, 100], {
      extrapolateRight: "clamp",
    });
    // Tool card slides in from right
    const toolSlide = interpolate(frame, [delay + 20, delay + 35], [300, 0], {
      extrapolateRight: "clamp",
    });
    const toolOpacity = interpolate(frame, [delay + 20, delay + 30], [0, 1], {
      extrapolateRight: "clamp",
    });
    // Checkmark pop
    const checkScale = spring({
      frame: Math.max(0, frame - (delay + 32)),
      fps,
      config: { damping: 8, stiffness: 150 },
    });

    return { painSlide, painOpacity, arrowWidth, toolSlide, toolOpacity, checkScale };
  };

  const rowHeight = 170;
  const startY = 200;

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
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 42, fontWeight: 700, color: COLORS.textPrimary, margin: 0 }}>
          Pain Point → AI Solution
        </h2>
        <p style={{ fontSize: 22, color: COLORS.textDim, marginTop: 8 }}>
          What used to drain you, now handled
        </p>
      </div>

      {/* Rows */}
      {pairs.map((pair, i) => {
        const anim = getRowAnim(i);
        const y = startY + i * rowHeight;

        return (
          <div key={i} style={{ position: "absolute", top: y, left: 0, width: 1920, height: rowHeight }}>
            {/* Pain card — left */}
            <div
              style={{
                position: "absolute",
                left: 180,
                top: 20,
                width: 440,
                height: 120,
                backgroundColor: COLORS.cardBg,
                borderRadius: 14,
                border: `1px solid ${pair.color}33`,
                borderLeft: `4px solid ${pair.color}`,
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 20,
                opacity: anim.painOpacity,
                transform: `translateX(${anim.painSlide}px)`,
                boxShadow: `0 0 30px ${pair.color}11`,
              }}
            >
              <span style={{ fontSize: 40 }}>{pair.painIcon}</span>
              <div>
                <div style={{ fontSize: 28, fontWeight: 600, color: pair.color }}>
                  {pair.pain}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                left: 660,
                top: 68,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: anim.arrowWidth * 2.2,
                  height: 3,
                  backgroundColor: COLORS.arrowColor,
                  borderRadius: 2,
                }}
              />
              {anim.arrowWidth > 90 && (
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: `14px solid ${COLORS.arrowColor}`,
                    marginLeft: -2,
                  }}
                />
              )}
            </div>

            {/* Tool card — right */}
            <div
              style={{
                position: "absolute",
                left: 920,
                top: 20,
                width: 540,
                height: 120,
                backgroundColor: COLORS.cardBg,
                borderRadius: 14,
                border: `1px solid ${COLORS.green}33`,
                borderLeft: `4px solid ${COLORS.green}`,
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 20,
                opacity: anim.toolOpacity,
                transform: `translateX(${anim.toolSlide}px)`,
                boxShadow: `0 0 30px ${COLORS.green}11`,
              }}
            >
              <span style={{ fontSize: 40 }}>{pair.toolIcon}</span>
              <div>
                <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.green }}>
                  {pair.tool}
                </div>
                <div style={{ fontSize: 19, color: COLORS.textSecondary, marginTop: 4 }}>
                  {pair.detail}
                </div>
              </div>
            </div>

            {/* Checkmark */}
            <div
              style={{
                position: "absolute",
                left: 1500,
                top: 55,
                transform: `scale(${anim.checkScale})`,
                fontSize: 36,
                opacity: anim.checkScale > 0.1 ? 1 : 0,
              }}
            >
              ✅
            </div>
          </div>
        );
      })}
    </div>
  );
}
