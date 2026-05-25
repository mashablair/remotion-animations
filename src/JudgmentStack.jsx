// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { JudgmentStack } from "./JudgmentStack";
// 2. Register: <Composition id="JudgmentStack" component={JudgmentStack} durationInFrames={360} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render JudgmentStack out/JudgmentStack.mp4

// INSERT AT: Section 5, ~13:30 — "Three things" (the actionable close)
// DURATION: 12 seconds (9s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const JudgmentStack = () => {
  const frame = useCurrentFrame();

  const items = [
    {
      number: "01",
      title: "Review Everything",
      detail: "If AI generated it, a human verifies it.",
      color: "#4ecdc4",
      delay: 30,
    },
    {
      number: "02",
      title: "Own Something",
      detail: "Domain expertise the platform can't absorb.",
      color: "#ffa94d",
      delay: 90,
    },
    {
      number: "03",
      title: "Watch Infrastructure",
      detail: "Where the $720B goes matters more than benchmarks.",
      color: "#c084fc",
      delay: 150,
    },
  ];

  // Bottom line
  const bottomOpacity = interpolate(frame, [220, 245], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bottomY = interpolate(frame, [220, 245], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Accent line connecting the stack
  const lineHeight = interpolate(frame, [50, 200], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

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
            WHAT YOU ACTUALLY DO WITH THIS
          </div>
        );
      })()}

      {/* Stack container with connecting line */}
      <div style={{ display: "flex", position: "relative" }}>
        {/* Vertical connecting line */}
        <div style={{
          position: "absolute",
          left: 58,
          top: 0,
          width: 2,
          height: `${lineHeight}%`,
          background: "linear-gradient(180deg, #4ecdc4, #ffa94d, #c084fc)",
          opacity: 0.3,
        }} />

        {/* Items */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}>
          {items.map((item, i) => {
            const rowOpacity = interpolate(frame, [item.delay, item.delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const rowX = interpolate(frame, [item.delay, item.delay + 20], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
            const detailOpacity = interpolate(frame, [item.delay + 20, item.delay + 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            // Dot on the line
            const dotScale = interpolate(frame, [item.delay, item.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });

            return (
              <div key={i} style={{
                opacity: rowOpacity,
                transform: `translateX(${rowX}px)`,
                display: "flex",
                alignItems: "flex-start",
                gap: 30,
              }}>
                {/* Number circle */}
                <div style={{
                  transform: `scale(${dotScale})`,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: `2px solid ${item.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: item.color,
                  backgroundColor: `rgba(0,0,0,0.5)`,
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}>
                  {item.number}
                </div>

                {/* Content */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  paddingTop: 6,
                }}>
                  <div style={{
                    fontSize: 44,
                    fontWeight: 600,
                    color: item.color,
                    lineHeight: 1.2,
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    opacity: detailOpacity,
                    fontSize: 26,
                    fontWeight: 400,
                    color: "#888",
                    lineHeight: 1.4,
                    maxWidth: 700,
                  }}>
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom line */}
      <div style={{
        opacity: bottomOpacity,
        transform: `translateY(${bottomY}px)`,
        marginTop: 70,
        fontSize: 32,
        fontWeight: 500,
        color: "#e0e0e0",
        textAlign: "center",
      }}>
        Everyone's moving fast. Be the one moving smart.
      </div>
    </div>
  );
};
