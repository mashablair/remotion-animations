// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { TwoWorlds } from "./TwoWorlds";
// 2. Register: <Composition id="TwoWorlds" component={TwoWorlds} durationInFrames={360} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render TwoWorlds out/TwoWorlds.mp4

// INSERT AT: Section 4, ~12:00 — "Two parallel AI ecosystems"
// DURATION: 12 seconds (9s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const TwoWorlds = () => {
  const frame = useCurrentFrame();

  // Initially one unified bar, then it splits
  const splitProgress = interpolate(frame, [60, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  // Left side (US/NVIDIA) slides left
  const leftX = interpolate(splitProgress, [0, 1], [0, -80]);
  // Right side (China/Huawei) slides right
  const rightX = interpolate(splitProgress, [0, 1], [0, 80]);

  // Divider line grows
  const dividerOpacity = interpolate(frame, [100, 130], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dividerHeight = interpolate(frame, [100, 150], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Header
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // "Before" label
  const beforeOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beforeFade = interpolate(frame, [50, 70], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Stack items appear after split
  const usItems = [
    { text: "NVIDIA chips", delay: 130 },
    { text: "US supply chains", delay: 145 },
    { text: "OpenAI · Anthropic · Google", delay: 160 },
  ];

  const chinaItems = [
    { text: "Huawei Ascend chips", delay: 135 },
    { text: "Chinese supply chains", delay: 150 },
    { text: "DeepSeek · Baidu · Tencent", delay: 165 },
  ];

  // Bottom line
  const bottomOpacity = interpolate(frame, [210, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bottomY = interpolate(frame, [210, 240], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Analogy line
  const analogyOpacity = interpolate(frame, [245, 265], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      <div style={{
        opacity: headerOpacity,
        fontSize: 24,
        fontWeight: 600,
        color: "#555",
        letterSpacing: 6,
        textTransform: "uppercase",
        marginBottom: 60,
        position: "absolute",
        top: 80,
      }}>
        THE AI ECOSYSTEM SPLIT
      </div>

      {/* "One ecosystem" label that fades */}
      <div style={{
        opacity: beforeOpacity * beforeFade,
        position: "absolute",
        top: 180,
        fontSize: 22,
        color: "#666",
      }}>
        One global AI ecosystem → splitting into two
      </div>

      {/* Main split container */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 0,
        position: "relative",
        marginTop: 20,
      }}>
        {/* LEFT: US / NVIDIA */}
        <div style={{
          transform: `translateX(${leftX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 500,
          padding: "40px 30px",
          border: `1px solid rgba(96,165,250,${0.1 + splitProgress * 0.2})`,
          borderRadius: 16,
          backgroundColor: `rgba(96,165,250,${splitProgress * 0.03})`,
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#60a5fa",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(splitProgress, [0.3, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            🇺🇸 U.S. ECOSYSTEM
          </div>
          {usItems.map((item, i) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                opacity: itemOpacity,
                fontSize: 24,
                color: "#aaa",
                marginBottom: 14,
                textAlign: "center",
              }}>
                {item.text}
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{
          opacity: dividerOpacity,
          width: 2,
          height: `${dividerHeight}%`,
          backgroundColor: "#333",
          margin: "0 40px",
          alignSelf: "center",
          minHeight: 200,
        }} />

        {/* RIGHT: China / Huawei */}
        <div style={{
          transform: `translateX(${rightX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 500,
          padding: "40px 30px",
          border: `1px solid rgba(255,107,107,${0.1 + splitProgress * 0.2})`,
          borderRadius: 16,
          backgroundColor: `rgba(255,107,107,${splitProgress * 0.03})`,
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#ff6b6b",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: interpolate(splitProgress, [0.3, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            🇨🇳 CHINA ECOSYSTEM
          </div>
          {chinaItems.map((item, i) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                opacity: itemOpacity,
                fontSize: 24,
                color: "#aaa",
                marginBottom: 14,
                textAlign: "center",
              }}>
                {item.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom lines */}
      <div style={{
        position: "absolute",
        bottom: 130,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}>
        <div style={{
          opacity: bottomOpacity,
          transform: `translateY(${bottomY}px)`,
          fontSize: 30,
          fontWeight: 500,
          color: "#ccc",
        }}>
          Different chips. Different supply chains. Different products.
        </div>
        <div style={{
          opacity: analogyOpacity,
          fontSize: 22,
          fontWeight: 400,
          color: "#666",
        }}>
          Not "iPhone vs Android." More like separate versions of electricity.
        </div>
      </div>
    </div>
  );
};
