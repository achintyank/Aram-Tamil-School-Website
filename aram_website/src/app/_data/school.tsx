// Everything the landing page says about the school lives here.
// Values marked TODO are placeholders until real info is confirmed.

export const school = {
  nameEn: "Aram Tamil School",
  nameTa: "அறம் தமிழ்ப் பள்ளி",
  wordmarkTa: "அறம்",
  parent: "International Tamil Academy",
  parentFormerly: "California Tamil Academy",
  location: "Mountain House High School",
  region: "Mountain House, California",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mountain+House+High+School+Mountain+House+CA",
  established: 2010,
  grades: "TK – 12",
  ages: "5 – 18",
  students: "200+",
  enrollUrl: "#", // TODO: real registration link
  email: "info@aramtamilschool.org", // TODO: confirm
};

export const timings = [
  { label: "HSCP", value: "Sundays · 10 AM – 2 PM" },
  { label: "Non-HSCP", value: "Sundays · 10 – 11:30 AM" },
];

// TODO: real names and emails
export const contacts = [
  { role: "Principal", roleTa: "தலைமை ஆசிரியர்", name: "Principal Name", email: "principal@aram.school" },
  { role: "Vice Principal", roleTa: "துணைத் தலைமை ஆசிரியர்", name: "VP Name", email: "vp@aram.school" },
];

export const photos = [
  { src: "/landing_page/hscp4_co25_onstage_after_performance.jpeg", caption: "HSCP Class of 2025, after their performance", w: 1600, h: 900 },
  { src: "/landing_page/surya_violin.jpeg", caption: "Violin performance", w: 4032, h: 3024 },
  { src: "/landing_page/second_paatu_ppl.jpeg", caption: "Paattu on stage", w: 5712, h: 4284 },
  { src: "/landing_page/hscp4_co25.jpeg", caption: "HSCP Class of 2025", w: 2000, h: 934 },
];

// --- Program structure --------------------------------------------------------

export const programStats = [
  { value: "TK – 8", label: "Regular grade levels" },
  { value: "4", label: "Levels of HSCP Tamil" },
  { value: "40+", label: "Years taught at UC Berkeley" },
  { value: "All", label: "US universities accept it" },
];

export const heritage = [
  { tag: "Heritage", body: <>Tamil is one of the world&apos;s most ancient languages — its literature dates back to <strong>300 BC</strong>. It is spoken across India, Sri Lanka, Singapore and Malaysia, and by communities in England, Canada and the United States.</> },
  { tag: "Academia", body: <>Tamil has been taught at <strong>UC Berkeley</strong> for over 40 years, with departments at the University of Chicago, University of Pennsylvania and UT Austin.</> },
  { tag: "ITA today", body: <><strong>International Tamil Academy</strong> (formerly California Tamil Academy) runs two parallel programs — grade-level classes for young children and HSCP for high schoolers.</> },
];

export const regularFeatures = [
  { title: "Reading & Writing", body: "Letters, words, sentences — children build literacy from the ground up in age-appropriate steps." },
  { title: "Speaking & Listening", body: "Songs, conversations, stories — practical fluency through everyday use, not just textbook recall." },
  { title: "Culture & Tradition", body: "Festivals, stories, values — Tamil isn't just a language, it's a cultural inheritance." },
  { title: "Bridge to HSCP", body: "Graduates of the regular program can enroll directly in HSCP Tamil 2 — no placement test needed." },
];

export const hscpFeatures = [
  { title: "World Language Credit", body: "Approved as a world language course (like French or Spanish) by Bay Area school districts." },
  { title: "On Your Transcript", body: "Like any other course at regular school, Tamil is recorded on the school transcript and counts toward GPA." },
  { title: "Meets University Requirements", body: "Satisfies the minimum world-language credit requirement for US university applications." },
  { title: "Choose Tamil", body: "Students can choose to study Tamil in place of another world language at school." },
];

/**
 * One card per class. `file` is the syllabus PDF name under /public/syllabus.
 * Flip SYLLABUS_READY once the PDFs are uploaded.
 */
export const SYLLABUS_READY = false;

export const regularLevels = [
  { label: "TK", group: "Early foundations", file: "tk" },
  { label: "K", group: "Early foundations", file: "k" },
  { label: "Grade 1", group: "Elementary literacy", file: "grade-1" },
  { label: "Grade 2", group: "Elementary literacy", file: "grade-2" },
  { label: "Grade 3", group: "Elementary literacy", file: "grade-3" },
  { label: "Grade 4", group: "Elementary literacy", file: "grade-4" },
  { label: "Grade 5", group: "Elementary literacy", file: "grade-5" },
  { label: "Grade 6", group: "Middle-school fluency", file: "grade-6" },
  { label: "Grade 7", group: "Middle-school fluency", file: "grade-7" },
  { label: "Grade 8", group: "Middle-school fluency", file: "grade-8" },
];

export const hscpLevels = [
  { n: 1, sub: "Entry level · 7th grade+", file: "hscp-1" },
  { n: 2, sub: "After Tamil 1 or placement evaluation", file: "hscp-2" },
  { n: 3, sub: "Continuing", file: "hscp-3" },
  { n: 4, sub: "Final level → Graduate", file: "hscp-4" },
];

// --- Navigation -----------------------------------------------------------------

export const navLinks = [
  { href: "#top", label: "Home", ta: "முகப்பு" },
  { href: "#announcements", label: "Announcements", ta: "அறிவிப்புகள்" },
  { href: "#calendar", label: "Calendar", ta: "நாட்காட்டி" },
  { href: "#structure", label: "Classes", ta: "வகுப்புகள்" },
  { href: "#enroll", label: "Enroll", ta: "சேர்க்கை" },
  { href: "#contact", label: "Contact", ta: "தொடர்பு" },
];

export const socials = [
  { href: "#", label: "WhatsApp" }, // TODO
  { href: "#", label: "Instagram" }, // TODO
  { href: "#", label: "YouTube" }, // TODO
];
