import { ImageResponse } from "next/og";

export const alt = "PelufoStudio — Software & IA para LATAM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#5E0ED7";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060606",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: `4px solid ${ACCENT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: ACCENT }} />
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#fff", letterSpacing: "4px", textTransform: "uppercase" }}>
            PelufoStudio
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "94px", fontWeight: 800, color: "#fff", lineHeight: 1.0, textTransform: "uppercase" }}>
            Construimos
          </div>
          <div style={{ fontSize: "94px", fontWeight: 800, color: ACCENT, lineHeight: 1.0, textTransform: "uppercase" }}>
            Ideas.
          </div>
        </div>

        {/* Bottom: meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
            Software &amp; IA para LATAM
          </div>
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
            Jasiel &amp; Javier · Buenos Aires
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
