// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { ToolOwnershipMap } from "./ToolOwnershipMap";
// 2. Register: <Composition id="ToolOwnershipMap" component={ToolOwnershipMap} durationInFrames={360} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render ToolOwnershipMap out/ToolOwnershipMap.mp4

// INSERT AT: Section 3, ~10:00 — "OpenAI has Codex. Anthropic has Claude Code. Musk wants Cursor."
// DURATION: 12 seconds (9s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const ToolOwnershipMap = () => {
  const frame = useCurrentFrame();

  const rows = [
    { owner: "OpenAI", tool: "Codex", delay: 30, ownerColor: "#4ecdc4" },
    { owner: "Anthropic", tool: "Claude Code", delay: 70, ownerColor: "#c084fc" },
    { owner: "Musk / xAI", tool: "Cursor", suffix: "($60B deal)", delay: 110, ownerColor: "#ffa94d" },
    { owner: "Microsoft", tool: "VS Code", suffix: "(open source?)", delay: 150, ownerColor: "#60a5fa" },
  ];

  // Bottom question
  const questionOpacity = interpolate(frame, [210, 235], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const questionY = interpolate(frame, [210, 235], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Arrow connector animation
  const arrowFrameOffset = 15;

  return (
    <div style={{
      width: 1920,
      height: 1080,
      backgroundColor: "#0a0a0f",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'SF Pro Display', 'Segoe UI', 'Helvetica Neue', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Header */}
      {(() => {
        const hOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div style={{
            opacity: hOpacity,
            fontSize: 24,
            fontWeight: 600,
            color: "#555",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 70,
          }}>
            WHO OWNS YOUR CODING TOOLS?
          </div>
        );
      })()}

      {/* Rows */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        width: 1000,
      }}>
        {rows.map((row, i) => {
          const ownerOpacity = interpolate(frame, [row.delay, row.delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const ownerX = interpolate(frame, [row.delay, row.delay + 12], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

          const arrowOpacity = interpolate(frame, [row.delay + arrowFrameOffset, row.delay + arrowFrameOffset + 10], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          const toolOpacity = interpolate(frame, [row.delay + arrowFrameOffset + 5, row.delay + arrowFrameOffset + 17], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const toolX = interpolate(frame, [row.delay + arrowFrameOffset + 5, row.delay + arrowFrameOffset + 17], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

          return (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              height: 70,
            }}>
              {/* Owner */}
              <div style={{
                opacity: ownerOpacity,
                transform: `translateX(${ownerX}px)`,
                width: 300,
                textAlign: "right",
                fontSize: 36,
                fontWeight: 600,
                color: row.ownerColor,
              }}>
                {row.owner}
              </div>

              {/* Arrow */}
              <div style={{
                opacity: arrowOpacity,
                width: 120,
                textAlign: "center",
                fontSize: 28,
                color: "#333",
              }}>
                ―――→
              </div>

              {/* Tool */}
              <div style={{
                opacity: toolOpacity,
                transform: `translateX(${toolX}px)`,
                display: "flex",
                alignItems: "baseline",
                gap: 14,
              }}>
                <div style={{
                  fontSize: 36,
                  fontWeight: 500,
                  color: "#e0e0e0",
                }}>
                  {row.tool}
                </div>
                {row.suffix && (
                  <div style={{
                    fontSize: 20,
                    fontWeight: 400,
                    color: "#666",
                  }}>
                    {row.suffix}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom question */}
      <div style={{
        opacity: questionOpacity,
        transform: `translateY(${questionY}px)`,
        marginTop: 70,
        fontSize: 32,
        fontWeight: 500,
        color: "#ccc",
        textAlign: "center",
      }}>
        The tools that gave you superpowers are being swallowed.
      </div>
    </div>
  );
};
