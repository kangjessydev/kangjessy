// Branding & Personal Info
const socials = {
    github: "https://github.com/kangjessydev",
    linkedin: "https://linkedin.com/in/kangjessydev",
    instagram: "https://instagram.com/kangjessydev",
    youtube: "https://youtube.com/@kangjessydev",
    thread: "https://threads.net/@kangjessydev",
    email: "hi.kangjessy@gmail.com",
    whatsapp: "088218705236",
    // whatsapp: "0881023762866",
};

export const siteConfig = {
    name: "KangJessy",
    fullName: "Kang Jessy",
    firstName: "Jessy",
    location: "Bandung",
    tagline: "Untuk bisnis yang mau tumbuh tanpa tambah pusing",

    // Hero Stats Targets
    heroStats: {
        projects: 10,
        support: 100, // Replacing bugfix with "Support" percentage or count
        experience: 4,
    },

    whatsapp: {
        number: socials.whatsapp,
        defaultMessage:
            "Halo KangJessy, saya ingin konsultasi mengenai project saya...",
    },

    // Socials map for direct access
    socials,

    // Social links list for iterations (Navbar, Footer, e.t.c)
    socialLinks: [
        { name: "Youtube", url: socials.youtube, icon: "Youtube" },
        { name: "Github", url: socials.github, icon: "Github" },
        { name: "Instagram", url: socials.instagram, icon: "Instagram" },
        { name: "Linkedin", url: socials.linkedin, icon: "Linkedin" },
        { name: "Thread", url: socials.thread, icon: "Thread" },
    ],
};
