export const top = [
    {
        id: -1,
        name: "Admin",
        to: "/admin",
    },
    {
        id: 0,
        name: "Kursy",
        to: "/courses",
    },
    {
        id: 2,
        name: "Home",
        to: "/home",
    },
    {
        id: 3,
        name: "Logout",
        action: () => {
            console.log("logout");
        },
        to: "/logout",
        condition: true,
    },
    {
        id: 4,
        name: "Login",
        to: "/login",
        condition: true,
    },
];
