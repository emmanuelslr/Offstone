import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0b0c",
          color: "#fff",
          fontSize: 64,
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: -1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          <div style={{ opacity: 0.9, fontSize: 28, marginBottom: 16 }}>Offstone</div>
          <div>Nos réalisations</div>
          <div style={{ fontSize: 24, opacity: 0.8, marginTop: 10 }}>
            Sélection d’opérations passées — descriptif factuel.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
