export const site = {
  name: "ZMS Business Management Consultancy",
  legalName: "ZMS Business Management Consultancy L.L.C – S.P.C",
  tagline: "Building Ideas. Driving Progress.",
  location: "Abu Dhabi, United Arab Emirates",
  licence: "CN-6757442",
  licenceAuthority: "Abu Dhabi Registration Authority (ADRA)",
  licenceLabel: "Abu Dhabi Economic Licence",
  email: "info@example.com",
  phone: "+971 00 000 0000",
  whatsapp: "971000000000",
  // Set NEXT_PUBLIC_SITE_URL per environment in Vercel; the placeholder is the fallback.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  isPlaceholder: true,
};

/** "Abu Dhabi Economic Licence CN-6757442" — for tight spaces such as the footer bar. */
export const licenceShort = `${site.licenceLabel} ${site.licence}`;

/** Full licence statement, used where space allows. */
export const licenceFull = `${licenceShort}, issued by the ${site.licenceAuthority}`;
