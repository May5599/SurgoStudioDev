import { NextResponse } from "next/server";

const CF = "https://d1y0fmcrb9qnj1.cloudfront.net";

const portfolioVideos = [
  {
    title: "NGY Yachting",
    description: "Cinematic brand film for NGY Yachting by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/poster.jpg`,
    contentUrl: `${CF}/FINAL_12_01_2026.mp4`,
  },
  {
    title: "Branch AV Music Video",
    description: "Music video production for Branch AV by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/projector-poster.jpg`,
    contentUrl: `${CF}/projector.mp4`,
  },
  {
    title: "Kevin Pearce",
    description: "Brand storytelling film for Kevin Pearce by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/EP003_poster.jpg`,
    contentUrl: `${CF}/hero.mp4`,
  },
  {
    title: "Branch AV Trailer",
    description: "Brand trailer for Branch AV produced by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/BranchOfficeTrailerv3_f5ejqb_poster.jpg`,
    contentUrl: `${CF}/BranchOfficeTrailerv3_f5ejqb_compressed.mp4`,
  },
  {
    title: "Vertical Energy",
    description: "Short-form social media reel by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/reel1_ghfwq2_poster.jpg`,
    contentUrl: `${CF}/reel1_ghfwq2_compressed.mp4`,
  },
  {
    title: "Immersive Frames",
    description: "Cinematic brand content by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/website01_bwovoe_poster.jpg`,
    contentUrl: `${CF}/website01_bwovoe_compressed.mp4`,
  },
  {
    title: "Event Showcase",
    description: "Corporate event highlight reel by Surgo Studios Ottawa.",
    thumbnailUrl: `${CF}/cut_v1s354_poster.jpg`,
    contentUrl: `${CF}/cut_v1s354_compressed.mp4`,
  },
];

const homepageVideos = [
  {
    title: "Client Testimonial – Ben Azadi",
    description: "Video testimonial for Surgo Studios Ottawa from Ben Azadi.",
    thumbnailUrl: `${CF}/poster.jpg`,
    contentUrl: `${CF}/ben.mp4`,
  },
  {
    title: "Client Testimonial – Hina Khan",
    description: "Video testimonial for Surgo Studios Ottawa from Hina Khan.",
    thumbnailUrl: `${CF}/poster.jpg`,
    contentUrl: `${CF}/hina.mp4`,
  },
  {
    title: "Client Testimonial – Majeed",
    description: "Video testimonial for Surgo Studios Ottawa from Majeed.",
    thumbnailUrl: `${CF}/poster.jpg`,
    contentUrl: `${CF}/majeed.mp4`,
  },
  {
    title: "Client Testimonial – Neha",
    description: "Video testimonial for Surgo Studios Ottawa from Neha.",
    thumbnailUrl: `${CF}/poster.jpg`,
    contentUrl: `${CF}/neha.mp4`,
  },
];

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function videoEntry(pageUrl: string, video: (typeof portfolioVideos)[0]) {
  return `
  <url>
    <loc>${pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(video.contentUrl)}</video:content_loc>
    </video:video>
  </url>`;
}

export async function GET() {
  const portfolioPage = "https://surgostudios.com/portfolio";
  const homePage = "https://surgostudios.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${portfolioVideos.map((v) => videoEntry(portfolioPage, v)).join("")}
${homepageVideos.map((v) => videoEntry(homePage, v)).join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
