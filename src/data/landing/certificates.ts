export interface Certificate {
  id: number;
  platform: string;
  title: string;
  date: string;
  credentialId: string;
  url: string;
}

export const certificatesData: Certificate[] = [
  {
    id: 1,
    platform: "BuildWithAngga",
    title: "Full-Stack Web Developer: Nuxt.js & Fast-API",
    date: "Okt 2023",
    credentialId: "BWA-99281",
    url: "#"
  },
  {
    id: 2,
    platform: "BuildWithAngga",
    title: "Mastering Vue 3 & Composition API",
    date: "Des 2023",
    credentialId: "BWA-11203",
    url: "#"
  },
  {
    id: 3,
    platform: "Dicoding Indonesia",
    title: "Belajar Dasar Pemrograman JavaScript",
    date: "Jan 2024",
    credentialId: "DC-8812",
    url: "#"
  },
  {
    id: 4,
    platform: "Coursera / Meta",
    title: "Front-End Developer Professional Certificate",
    date: "Feb 2024",
    credentialId: "META-FE-9901",
    url: "#"
  },
  {
    id: 5,
    platform: "Udemy",
    title: "React Native: Advanced Mobile App Development",
    date: "Maret 2024",
    credentialId: "UC-44b2-a12",
    url: "#"
  },
  {
    id: 6,
    platform: "Google Cloud",
    title: "Associate Cloud Engineer (Preparation)",
    date: "Mei 2024",
    credentialId: "GCP-ACE-2024",
    url: "#"
  }
];
