// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { DarkCodeDefinition } from "./DarkCodeDefinition";
// 2. Register: <Composition id="DarkCodeDefinition" component={DarkCodeDefinition} durationInFrames={270} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render DarkCodeDefinition out/DarkCodeDefinition.mp4

// INSERT AT: Section 1, ~2:45 — right when Maria says "dark code"
// DURATION: 9 seconds (6s animation + 3s hold)

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const DarkCodeDefinition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const holdStart = 180; // 6 seconds of animation, then hold

  // Background pulse — subtle dark code feeling
  const bgPulse = frame < holdStart
    ? interpolate(frame, [0, 90, 180], [0.03, 0.06, 0.03], { extrapolateRight: "clamp" })
    : 0.03;

  // Title: "DARK CODE" — appears first
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [15, 35], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Line 1: "Code that works."
  const line1Opacity = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1X = interpolate(frame, [50, 65], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Line 2: "Until it doesn't."
  const line2Opacity = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2X = interpolate(frame, [85, 100], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Line 3: "That no human in the organization actually understands."
  const line3Opacity = interpolate(frame, [120, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line3X = interpolate(frame, [120, 140], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Red warning bar appears under the definition
  const barWidth = interpolate(frame, [155, 180], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Floating code fragments in background
  const codeLines = [
    { text: "await deploy()", x: 120, y: 150, delay: 0 },
    { text: "if (result) ship();", x: 1400, y: 250, delay: 15 },
    { text: "// TODO: review", x: 300, y: 800, delay: 30 },
    { text: "return unknown;", x: 1200, y: 700, delay: 45 },
    { text: "catch(e) { /* ? */ }", x: 800, y: 900, delay: 10 },
    { text: "rm -rf node_modules", x: 150, y: 450, delay: 55 },
    { text: "git push --force", x: 1500, y: 550, delay: 25 },
  ];

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
      {/* Floating code fragments in background */}
      {codeLines.map((line, i) => {
        const codeOpacity = interpolate(
          frame,
          [line.delay, line.delay + 20, holdStart - 20, holdStart],
          [0, 0.08 + bgPulse, 0.08, 0.05],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        return (
          <div key={i} style={{
            position: "absolute",
            left: line.x,
            top: line.y,
            color: "#ff3333",
            opacity: codeOpacity,
            fontSize: 22,
            fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            letterSpacing: 1,
          }}>
            {line.text}
          </div>
        );
      })}

      {/* Title */}
      <div style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        fontSize: 28,
        fontWeight: 600,
        color: "#ff4444",
        letterSpacing: 8,
        textTransform: "uppercase",
        marginBottom: 50,
      }}>
        DARK CODE
      </div>

      {/* Definition lines */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 24,
        maxWidth: 1100,
      }}>
        <div style={{
          opacity: line1Opacity,
          transform: `translateX(${line1X}px)`,
          fontSize: 64,
          fontWeight: 300,
          color: "#e0e0e0",
          lineHeight: 1.3,
        }}>
          Code that works.
        </div>

        <div style={{
          opacity: line2Opacity,
          transform: `translateX(${line2X}px)`,
          fontSize: 64,
          fontWeight: 300,
          color: "#999999",
          lineHeight: 1.3,
        }}>
          Until it doesn't.
        </div>

        <div style={{
          opacity: line3Opacity,
          transform: `translateX(${line3X}px)`,
          fontSize: 52,
          fontWeight: 300,
          color: "#666666",
          lineHeight: 1.4,
          marginTop: 10,
        }}>
          That no human in the organization
          <br />actually understands.
        </div>
      </div>

      {/* Red warning bar */}
      <div style={{
        position: "absolute",
        bottom: 180,
        left: "50%",
        transform: "translateX(-50%)",
        width: `${barWidth}%`,
        maxWidth: 1100,
        height: 3,
        backgroundColor: "#ff4444",
        borderRadius: 2,
      }} />
    </div>
  );
};
