// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { ProcessFailure } from "./ProcessFailure";
// 2. Register: <Composition id="ProcessFailure" component={ProcessFailure} durationInFrames={360} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render ProcessFailure out/ProcessFailure.mp4

// INSERT AT: Section 1, ~4:30 — "AI didn't fail. The PROCESS failed."
// DURATION: 12 seconds (9s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const ProcessFailure = () => {
  const frame = useCurrentFrame();

  // Step boxes
  const steps = [
    { label: "AI Generates", icon: "⚡", delay: 20, color: "#4ecdc4" },
    { label: "AI Tests", icon: "✓", delay: 60, color: "#4ecdc4" },
    { label: "Human Reviews", icon: "👁", delay: 100, color: "#ff4444", isMissing: true },
    { label: "Ship It", icon: "🚀", delay: 160, color: "#4ecdc4" },
  ];

  // "SKIPPED" stamp over the review step
  const stampOpacity = interpolate(frame, [130, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampRotation = interpolate(frame, [130, 140], [-15, -8], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  const stampScale = interpolate(frame, [130, 140], [2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });

  // Explosion after shipping
  const explosionOpacity = interpolate(frame, [200, 210, 250, 270], [0, 1, 1, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const explosionScale = interpolate(frame, [200, 230], [0.5, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Bottom text
  const bottomOpacity = interpolate(frame, [240, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Arrow connector
  const renderArrow = (delay) => {
    const arrowOpacity = interpolate(frame, [delay + 20, delay + 30], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{
        opacity: arrowOpacity,
        fontSize: 36,
        color: "#333",
        margin: "0 8px",
        alignSelf: "center",
      }}>
        →
      </div>
    );
  };

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
            marginBottom: 80,
          }}>
            THE PROCESS
          </div>
        );
      })()}

      {/* Steps row */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 0,
        position: "relative",
      }}>
        {steps.map((step, i) => {
          const boxOpacity = interpolate(frame, [step.delay, step.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const boxY = interpolate(frame, [step.delay, step.delay + 15], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

          const borderColor = step.isMissing ? "rgba(255,68,68,0.3)" : "rgba(78,205,196,0.2)";
          const bgColor = step.isMissing ? "rgba(255,68,68,0.05)" : "rgba(78,205,196,0.05)";

          // Strikethrough line for the missing step
          const strikeWidth = step.isMissing
            ? interpolate(frame, [135, 150], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            : 0;

          return (
            <React.Fragment key={i}>
              <div style={{
                opacity: boxOpacity,
                transform: `translateY(${boxY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 260,
                padding: "40px 24px",
                border: `1px solid ${borderColor}`,
                borderRadius: 16,
                backgroundColor: bgColor,
                position: "relative",
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{step.icon}</div>
                <div style={{
                  fontSize: 26,
                  fontWeight: 500,
                  color: step.isMissing ? "#ff4444" : "#ccc",
                  textAlign: "center",
                  position: "relative",
                }}>
                  {step.label}
                  {step.isMissing && (
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      width: `${strikeWidth}%`,
                      height: 3,
                      backgroundColor: "#ff4444",
                      transform: "translateY(-50%)",
                    }} />
                  )}
                </div>

                {/* SKIPPED stamp */}
                {step.isMissing && (
                  <div style={{
                    position: "absolute",
                    top: -15,
                    right: -15,
                    opacity: stampOpacity,
                    transform: `rotate(${stampRotation}deg) scale(${stampScale})`,
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#ff4444",
                    border: "2px solid #ff4444",
                    borderRadius: 4,
                    padding: "4px 12px",
                    backgroundColor: "rgba(255,68,68,0.15)",
                    letterSpacing: 3,
                  }}>
                    SKIPPED
                  </div>
                )}
              </div>
              {i < steps.length - 1 && renderArrow(step.delay)}
            </React.Fragment>
          );
        })}
      </div>

      {/* Explosion / failure indicator */}
      <div style={{
        opacity: explosionOpacity,
        transform: `scale(${explosionScale})`,
        marginTop: 50,
        fontSize: 64,
        fontWeight: 700,
        color: "#ff4444",
        textAlign: "center",
        textShadow: "0 0 40px rgba(255,68,68,0.4)",
      }}>
        💥 OUTAGE
      </div>

      {/* Bottom text */}
      <div style={{
        opacity: bottomOpacity,
        marginTop: 30,
        fontSize: 28,
        fontWeight: 400,
        color: "#888",
        textAlign: "center",
      }}>
        AI didn't fail. The process failed.
      </div>
    </div>
  );
};
