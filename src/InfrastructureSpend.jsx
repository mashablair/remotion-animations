// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { InfrastructureSpend } from "./InfrastructureSpend";
// 2. Register: <Composition id="InfrastructureSpend" component={InfrastructureSpend} durationInFrames={330} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render InfrastructureSpend out/InfrastructureSpend.mp4

// INSERT AT: Section 4, ~11:15 — "$720 billion... not on models. On RUNNING them."
// DURATION: 11 seconds (8s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const InfrastructureSpend = () => {
  const frame = useCurrentFrame();

  // Giant number reveal
  const numOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numScale = interpolate(frame, [15, 45], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });

  // "Combined AI CapEx — 2026"
  const subOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Split bar: 75% infrastructure / 25% other
  const barOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const infraWidth = interpolate(frame, [85, 130], [0, 75], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const otherWidth = interpolate(frame, [120, 150], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Labels
  const infraLabelOpacity = interpolate(frame, [135, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const otherLabelOpacity = interpolate(frame, [155, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "More than the last 3 years combined"
  const contextOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Bottom line
  const bottomOpacity = interpolate(frame, [210, 235], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bottomY = interpolate(frame, [210, 235], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Company names
  const companies = "Amazon · Google · Microsoft · Meta · Oracle";
  const compOpacity = interpolate(frame, [55, 70], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      {/* Giant number */}
      <div style={{
        opacity: numOpacity,
        transform: `scale(${numScale})`,
        fontSize: 140,
        fontWeight: 800,
        color: "#ffa94d",
        lineHeight: 1,
        letterSpacing: -3,
      }}>
        $720B
      </div>

      {/* Subtitle */}
      <div style={{
        opacity: subOpacity,
        fontSize: 28,
        fontWeight: 400,
        color: "#999",
        marginTop: 12,
        marginBottom: 10,
      }}>
        Combined AI Capital Expenditure — 2026
      </div>

      {/* Companies */}
      <div style={{
        opacity: compOpacity,
        fontSize: 18,
        fontWeight: 400,
        color: "#444",
        letterSpacing: 3,
        marginBottom: 50,
      }}>
        {companies}
      </div>

      {/* Split bar */}
      <div style={{
        opacity: barOpacity,
        width: 1000,
        display: "flex",
        gap: 4,
        height: 60,
        borderRadius: 8,
        overflow: "hidden",
      }}>
        {/* Infrastructure portion */}
        <div style={{
          width: `${infraWidth}%`,
          height: "100%",
          backgroundColor: "#ffa94d",
          borderRadius: "8px 0 0 8px",
          transition: "width 0.1s",
        }} />
        {/* Other portion */}
        <div style={{
          width: `${otherWidth}%`,
          height: "100%",
          backgroundColor: "rgba(255,169,77,0.2)",
          borderRadius: "0 8px 8px 0",
        }} />
      </div>

      {/* Bar labels */}
      <div style={{
        width: 1000,
        display: "flex",
        justifyContent: "space-between",
        marginTop: 16,
      }}>
        <div style={{
          opacity: infraLabelOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#ffa94d" }}>75%</div>
          <div style={{ fontSize: 20, fontWeight: 400, color: "#888" }}>AI Infrastructure (running models)</div>
        </div>
        <div style={{
          opacity: otherLabelOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "rgba(255,169,77,0.5)" }}>25%</div>
          <div style={{ fontSize: 20, fontWeight: 400, color: "#666" }}>Other</div>
        </div>
      </div>

      {/* Context line */}
      <div style={{
        opacity: contextOpacity,
        marginTop: 35,
        fontSize: 22,
        fontWeight: 400,
        color: "#666",
        fontStyle: "italic",
      }}>
        More than the last 3 years combined
      </div>

      {/* Bottom line */}
      <div style={{
        opacity: bottomOpacity,
        transform: `translateY(${bottomY}px)`,
        marginTop: 25,
        fontSize: 30,
        fontWeight: 500,
        color: "#ccc",
      }}>
        Not on building better models. On running them.
      </div>
    </div>
  );
};
