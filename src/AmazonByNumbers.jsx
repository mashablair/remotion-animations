// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { AmazonByNumbers } from "./AmazonByNumbers";
// 2. Register: <Composition id="AmazonByNumbers" component={AmazonByNumbers} durationInFrames={330} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render AmazonByNumbers out/AmazonByNumbers.mp4

// INSERT AT: Section 1, ~3:15 — after Maria describes the Amazon outages
// DURATION: 11 seconds (8s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const AmazonByNumbers = () => {
  const frame = useCurrentFrame();

  const stats = [
    { number: "16,000", label: "fewer engineers", color: "#ff6b6b", delay: 20 },
    { number: "13 hrs", label: "AWS outage (December)", color: "#ffa94d", delay: 70 },
    { number: "6 hrs", label: "main site down (March)", color: "#ffa94d", delay: 120 },
    { number: "6.3M", label: "orders lost", color: "#ff4444", delay: 170 },
  ];

  // Bottom line: "More code. Fewer humans. More failures."
  const bottomOpacity = interpolate(frame, [220, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bottomY = interpolate(frame, [220, 240], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

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
      {/* Subtle grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,68,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,68,68,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

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
            AMAZON — AI CODING MANDATE
          </div>
        );
      })()}

      {/* Stats grid */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 50,
        maxWidth: 1400,
      }}>
        {stats.map((stat, i) => {
          const numOpacity = interpolate(frame, [stat.delay, stat.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const numScale = interpolate(frame, [stat.delay, stat.delay + 20], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
          const labelOpacity = interpolate(frame, [stat.delay + 15, stat.delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 320,
              padding: "40px 20px",
            }}>
              <div style={{
                opacity: numOpacity,
                transform: `scale(${numScale})`,
                fontSize: 82,
                fontWeight: 700,
                color: stat.color,
                lineHeight: 1,
                marginBottom: 16,
              }}>
                {stat.number}
              </div>
              <div style={{
                opacity: labelOpacity,
                fontSize: 22,
                fontWeight: 400,
                color: "#888",
                textAlign: "center",
                lineHeight: 1.4,
              }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom line */}
      <div style={{
        opacity: bottomOpacity,
        transform: `translateY(${bottomY}px)`,
        marginTop: 60,
        fontSize: 32,
        fontWeight: 400,
        color: "#ccc",
        letterSpacing: 2,
      }}>
        More code. Fewer humans. More failures.
      </div>
    </div>
  );
};
