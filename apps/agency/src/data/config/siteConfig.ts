// Branding & Personal Info
const socials = {
    github: "https://github.com/kangjessy",
    linkedin: "https://linkedin.com/in/kangjessy",
    instagram: "https://instagram.com/kangjessy",
    youtube: "https://youtube.com/@kangjessy",
    thread: "https://threads.net/@kangjessy",
    email: "hi.kangjessy@gmail.com",
    whatsapp: "6288218705236",
};

export const siteConfig = {
    name: "KangJessy",
    fullName: "Kang Jessy",
    tagline: "Solving business problems with code",

    // Hero Stats Targets
    heroStats: {
        projects: 10,
        bugfix: 1000,
        experience: 2,
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
        { name: "Thread", url: socials.thread, icon: "Hash" },
    ],
};
