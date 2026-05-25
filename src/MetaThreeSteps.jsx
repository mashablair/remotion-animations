// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { MetaThreeSteps } from "./MetaThreeSteps";
// 2. Register: <Composition id="MetaThreeSteps" component={MetaThreeSteps} durationInFrames={330} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render MetaThreeSteps out/MetaThreeSteps.mp4

// INSERT AT: Section 2, ~6:00 — "Step one, record. Step two, train. Step three, fire."
// DURATION: 11 seconds (8s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const MetaThreeSteps = () => {
  const frame = useCurrentFrame();

  const steps = [
    {
      number: "01",
      title: "Record",
      detail: "Keystrokes, clicks, screenshots",
      subDetail: '"Model Capability Initiative"',
      delay: 30,
    },
    {
      number: "02",
      title: "Train",
      detail: "AI learns your entire workflow",
      subDetail: '"Just do your daily work"',
      delay: 90,
    },
    {
      number: "03",
      title: "Fire",
      detail: "8,000 people. May 20th.",
      subDetail: "+ 6,000 open roles canceled",
      delay: 150,
    },
  ];

  // "Your labor is training data" bottom line
  const bottomOpacity = interpolate(frame, [210, 235], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bottomY = interpolate(frame, [210, 235], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

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
      {/* Scan lines effect — subtle surveillance feeling */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.01) 3px, rgba(255,255,255,0.01) 4px)",
        pointerEvents: "none",
      }} />

      {/* Steps */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        maxWidth: 900,
      }}>
        {steps.map((step, i) => {
          const rowOpacity = interpolate(frame, [step.delay, step.delay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const rowX = interpolate(frame, [step.delay, step.delay + 18], [-60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const detailOpacity = interpolate(frame, [step.delay + 20, step.delay + 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          const isLast = i === 2;
          const titleColor = isLast ? "#ff4444" : "#e0e0e0";
          const numberColor = isLast ? "#ff4444" : "#333";

          return (
            <div key={i} style={{
              opacity: rowOpacity,
              transform: `translateX(${rowX}px)`,
              display: "flex",
              alignItems: "flex-start",
              gap: 30,
            }}>
              {/* Step number */}
              <div style={{
                fontSize: 72,
                fontWeight: 800,
                color: numberColor,
                lineHeight: 1,
                minWidth: 120,
                fontVariantNumeric: "tabular-nums",
              }}>
                {step.number}
              </div>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <div style={{
                  fontSize: 48,
                  fontWeight: 600,
                  color: titleColor,
                  lineHeight: 1.2,
                }}>
                  {step.title}
                </div>
                <div style={{
                  opacity: detailOpacity,
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#888",
                  lineHeight: 1.4,
                }}>
                  {step.detail}
                </div>
                <div style={{
                  opacity: detailOpacity * 0.7,
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#555",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                }}>
                  {step.subDetail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom line */}
      <div style={{
        opacity: bottomOpacity,
        transform: `translateY(${bottomY}px)`,
        marginTop: 70,
        fontSize: 30,
        fontWeight: 500,
        color: "#ff6b6b",
        textAlign: "center",
        letterSpacing: 1,
      }}>
        Your labor is not just your job anymore. It is training data.
      </div>
    </div>
  );
};
