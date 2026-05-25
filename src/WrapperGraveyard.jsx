// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { WrapperGraveyard } from "./WrapperGraveyard";
// 2. Register: <Composition id="WrapperGraveyard" component={WrapperGraveyard} durationInFrames={330} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render WrapperGraveyard out/WrapperGraveyard.mp4

// INSERT AT: Section 3, ~9:30 — Tome example, wrappers dying
// DURATION: 11 seconds (8s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const WrapperGraveyard = () => {
  const frame = useCurrentFrame();

  // Tome's stats cascade — building up then collapsing
  const stats = [
    { label: "Users", value: "20M", delay: 20 },
    { label: "Raised", value: "$81M", delay: 50 },
    { label: "Valuation", value: "$300M", delay: 80 },
    { label: "Revenue", value: "$0", delay: 110, isRed: true },
  ];

  // "Then the platforms caught up" — the kill line
  const killOpacity = interpolate(frame, [145, 165], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const killY = interpolate(frame, [145, 165], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Platforms that killed it
  const killers = [
    { name: "Microsoft Copilot", delay: 170 },
    { name: "Canva AI", delay: 185 },
    { name: "Google Gemini", delay: 200 },
  ];

  // Result
  const resultOpacity = interpolate(frame, [220, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
            marginBottom: 60,
          }}>
            CASE STUDY: TOME — AI PRESENTATIONS
          </div>
        );
      })()}

      {/* Stats row */}
      <div style={{
        display: "flex",
        gap: 60,
        marginBottom: 50,
      }}>
        {stats.map((stat, i) => {
          const sOpacity = interpolate(frame, [stat.delay, stat.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const sScale = interpolate(frame, [stat.delay, stat.delay + 15], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

          // Fade stats when platforms arrive
          const fadeFactor = interpolate(frame, [170, 200], [1, stat.isRed ? 1 : 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              opacity: sOpacity * fadeFactor,
              transform: `scale(${sScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              minWidth: 180,
            }}>
              <div style={{
                fontSize: 56,
                fontWeight: 700,
                color: stat.isRed ? "#ff4444" : "#e0e0e0",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 20,
                fontWeight: 400,
                color: "#666",
              }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Kill line */}
      <div style={{
        opacity: killOpacity,
        transform: `translateY(${killY}px)`,
        fontSize: 28,
        fontWeight: 400,
        color: "#888",
        marginBottom: 30,
      }}>
        Then the platforms caught up:
      </div>

      {/* Killers */}
      <div style={{
        display: "flex",
        gap: 40,
        marginBottom: 50,
      }}>
        {killers.map((k, i) => {
          const kOpacity = interpolate(frame, [k.delay, k.delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const kX = interpolate(frame, [k.delay, k.delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <div key={i} style={{
              opacity: kOpacity,
              transform: `translateX(${kX}px)`,
              fontSize: 26,
              fontWeight: 500,
              color: "#60a5fa",
              padding: "12px 28px",
              border: "1px solid rgba(96,165,250,0.3)",
              borderRadius: 8,
              backgroundColor: "rgba(96,165,250,0.05)",
            }}>
              {k.name}
            </div>
          );
        })}
      </div>

      {/* Result */}
      <div style={{
        opacity: resultOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          fontSize: 36,
          fontWeight: 600,
          color: "#ff6b6b",
        }}>
          Tome pivoted entirely. Left presentations.
        </div>
        <div style={{
          fontSize: 22,
          fontWeight: 400,
          color: "#666",
          fontStyle: "italic",
        }}>
          "Wrappers have their check engine light on." — Google VP of Startups
        </div>
      </div>
    </div>
  );
};
