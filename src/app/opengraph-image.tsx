import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} logo`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Ivory background with the original ZMS logo, unaltered.
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/zms-logo-original.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  // Source is 845 × 935; keep its proportions.
  const height = 520;
  const width = Math.round((845 / 935) * height);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF6EA",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={width} height={height} alt="" />
      </div>
    ),
    size,
  );
}
