import { personalInfo } from "./data";

// Set SITE_URL to the primary production domain when moving domains.
export const siteUrl = new URL(
  process.env.SITE_URL || "https://shoron.vercel.app",
).origin;

export const profileStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Md. Harun Or Rashid (Shoron)",
      alternateName: "Shoron",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: "Md. Harun Or Rashid (Shoron) | Backend Software Engineer",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Md. Harun Or Rashid",
      alternateName: ["Shoron", "Md. Harun Or Rashid (Shoron)"],
      url: `${siteUrl}/`,
      jobTitle: personalInfo.title,
      description: personalInfo.summary,
      sameAs: Object.values(personalInfo.socials),
      worksFor: { "@type": "Organization", name: "Appinion BD LTD.", url: "https://appinionbd.com" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "North South University" },
    },
  ],
};
