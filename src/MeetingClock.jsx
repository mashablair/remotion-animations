// ============================================================
// CLAUDE CODE INSTRUCTIONS — paste these 3 messages:
//
// 1. "Save MeetingClock.jsx into mtt-animations/src/"
//    (paste full file contents)
//
// 2. "Add MeetingClock to Root.tsx — import from ./MeetingClock,
//     id='MeetingClock', durationInFrames=210, fps=30,
//     width=1920, height=1080"
//
// 3. "Render the MeetingClock composition to out/MeetingClock.mp4"
// ============================================================

import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";

const COLORS = {
  bg: "#0a0a0f",
  relevant: "#22c55e",
  irrelevant: "#1e293b",
  irrelevantStroke: "#334155",
  red: "#ef4444",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textDim: "#475569",
};

export default function MeetingClock() {
  const frame = useCurrentFrame();
  const fps = 30;

  const cx = 960;
  const cy = 480;
  const radius = 280;

  // Phase 1: Clock face draws in (0-30)
  const clockOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Full circle fills gray (30-60)
  const grayFill = interpolate(frame, [30, 60], [0, 360], { extrapolateRight: "clamp" });

  // Phase 3: 10% slice turns green (60-90)
  const greenSlice = interpolate(frame, [65, 90], [0, 36], { extrapolateRight: "clamp" });

  // Phase 4: Labels appear (90-120)
  const labelOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateRight: "clamp" });

  // Phase 5: "IRRELEVANT" stamp (130+)
  const stampScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 8, stiffness: 120 } });
  const stampOpacity = interpolate(frame, [130, 135], [0, 1], { extrapolateRight: "clamp" });

  // Helper: create SVG arc path
  const arcPath = (startAngle, endAngle, r) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  // Time markers around the clock
  const timeMarks = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const outerR = radius + 8;
    const innerR = radius - 15;
    timeMarks.push({
      x1: cx + outerR * Math.cos(angle),
      y1: cy + outerR * Math.sin(angle),
      x2: cx + innerR * Math.cos(angle),
      y2: cy + innerR * Math.sin(angle),
    });
  }

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 38,
          color: COLORS.textSecondary,
          fontWeight: 400,
          letterSpacing: "0.08em",
          marginBottom: 40,
          opacity: clockOpacity,
        }}
      >
        YOUR 90-MINUTE MEETING
      </h2>

      <svg width={1920} height={700} style={{ opacity: clockOpacity }}>
        {/* Gray fill — irrelevant portion */}
        {grayFill > 0 && (
          <path
            d={arcPath(0, Math.min(grayFill, 360), radius)}
            fill={COLORS.irrelevant}
            stroke={COLORS.irrelevantStroke}
            strokeWidth={1}
          />
        )}

        {/* Green slice — relevant 10% */}
        {greenSlice > 0 && (
          <path
            d={arcPath(0, greenSlice, radius)}
            fill={COLORS.relevant}
            opacity={0.85}
          />
        )}

        {/* Clock border */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={COLORS.irrelevantStroke}
          strokeWidth={3}
        />

        {/* Time tick marks */}
        {timeMarks.map((mark, i) => (
          <line
            key={i}
            x1={mark.x1}
            y1={mark.y1}
            x2={mark.x2}
            y2={mark.y2}
            stroke={COLORS.textDim}
            strokeWidth={2}
          />
        ))}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={6} fill={COLORS.textPrimary} />

        {/* Labels with lines */}
        {/* Green label — "Relevant to you" */}
        <g opacity={labelOpacity}>
          <line
            x1={cx + 60}
            y1={cy - 200}
            x2={cx + 250}
            y2={cy - 280}
            stroke={COLORS.relevant}
            strokeWidth={2}
          />
          <text
            x={cx + 260}
            y={cy - 285}
            fill={COLORS.relevant}
            fontSize={32}
            fontWeight={700}
          >
            10% RELEVANT
          </text>
          <text
            x={cx + 260}
            y={cy - 250}
            fill={COLORS.textSecondary}
            fontSize={22}
          >
            ~9 minutes that matter
          </text>
        </g>

        {/* Gray label — "Irrelevant" */}
        <g opacity={labelOpacity}>
          <line
            x1={cx - 100}
            y1={cy + 180}
            x2={cx - 280}
            y2={cy + 280}
            stroke={COLORS.textDim}
            strokeWidth={2}
          />
          <text
            x={cx - 520}
            y={cy + 275}
            fill={COLORS.textDim}
            fontSize={32}
            fontWeight={700}
          >
            90% IRRELEVANT
          </text>
          <text
            x={cx - 520}
            y={cy + 310}
            fill={COLORS.textDim}
            fontSize={22}
          >
            81 minutes you won't get back
          </text>
        </g>

        {/* STAMP */}
        <g
          opacity={stampOpacity}
          transform={`translate(${cx}, ${cy}) scale(${stampScale}) translate(${-cx}, ${-cy})`}
        >
          <rect
            x={cx - 200}
            y={cy - 55}
            width={400}
            height={110}
            rx={8}
            fill="none"
            stroke={COLORS.red}
            strokeWidth={5}
            transform={`rotate(-12, ${cx}, ${cy})`}
          />
          <text
            x={cx}
            y={cy + 18}
            fill={COLORS.red}
            fontSize={64}
            fontWeight={900}
            textAnchor="middle"
            letterSpacing="0.12em"
            transform={`rotate(-12, ${cx}, ${cy})`}
          >
            KILLING ME
          </text>
        </g>
      </svg>
    </div>
  );
}
