// CLAUDE CODE INSTRUCTIONS:
// 1. Add to Root.tsx: import { GoldmanJobImpact } from "./GoldmanJobImpact";
// 2. Register: <Composition id="GoldmanJobImpact" component={GoldmanJobImpact} durationInFrames={360} fps={30} width={1920} height={1080} />
// 3. Render: npx remotion render GoldmanJobImpact out/GoldmanJobImpact.mp4

// INSERT AT: Section 2, ~7:15 — Goldman Sachs payroll data
// DURATION: 12 seconds (9s animation + 3s hold)

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const GoldmanJobImpact = () => {
  const frame = useCurrentFrame();

  // Bar widths (proportional: 25K max, 9K = 36% of max)
  const destroyedWidth = interpolate(frame, [40, 90], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const createdWidth = interpolate(frame, [80, 130], [0, 36], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Labels
  const destroyedLabelOpacity = interpolate(frame, [90, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const createdLabelOpacity = interpolate(frame, [130, 145], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // NET result
  const netOpacity = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const netScale = interpolate(frame, [170, 195], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });

  // Bottom line
  const bottomOpacity = interpolate(frame, [220, 245], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Source label
  const sourceOpacity = interpolate(frame, [20, 35], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
      {/* Source */}
      <div style={{
        position: "absolute",
        top: 60,
        right: 80,
        opacity: sourceOpacity,
        fontSize: 18,
        color: "#444",
        letterSpacing: 2,
        textTransform: "uppercase",
      }}>
        Goldman Sachs — U.S. Payroll Data
      </div>

      {/* Header */}
      {(() => {
        const hOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
            AI IMPACT ON U.S. JOBS — MONTHLY
          </div>
        );
      })()}

      {/* Bars container */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 50,
        width: 1200,
      }}>
        {/* Destroyed bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{
            opacity: destroyedLabelOpacity,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}>
            <div style={{ fontSize: 22, color: "#999", fontWeight: 400 }}>
              Substitution (AI replacing humans)
            </div>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#ff4444" }}>
              −25,000
            </div>
          </div>
          <div style={{
            width: "100%",
            height: 48,
            backgroundColor: "rgba(255,68,68,0.08)",
            borderRadius: 6,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${destroyedWidth}%`,
              height: "100%",
              backgroundColor: "#ff4444",
              borderRadius: 6,
            }} />
          </div>
        </div>

        {/* Created bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{
            opacity: createdLabelOpacity,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}>
            <div style={{ fontSize: 22, color: "#999", fontWeight: 400 }}>
              Augmentation (humans using AI to do more)
            </div>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#4ecdc4" }}>
              +9,000
            </div>
          </div>
          <div style={{
            width: "100%",
            height: 48,
            backgroundColor: "rgba(78,205,196,0.08)",
            borderRadius: 6,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${createdWidth}%`,
              height: "100%",
              backgroundColor: "#4ecdc4",
              borderRadius: 6,
            }} />
          </div>
        </div>
      </div>

      {/* NET number */}
      <div style={{
        opacity: netOpacity,
        transform: `scale(${netScale})`,
        marginTop: 60,
        display: "flex",
        alignItems: "baseline",
        gap: 20,
      }}>
        <div style={{ fontSize: 28, color: "#666", fontWeight: 400 }}>NET</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: "#ff6b6b" }}>−16,000</div>
        <div style={{ fontSize: 28, color: "#666", fontWeight: 400 }}>jobs / month</div>
      </div>

      {/* Bottom line */}
      <div style={{
        opacity: bottomOpacity,
        marginTop: 40,
        fontSize: 26,
        fontWeight: 400,
        color: "#777",
        textAlign: "center",
      }}>
        Same technology. Two opposite effects. Happening at the same time.
      </div>
    </div>
  );
};
