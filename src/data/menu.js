export const top = [
    {
        id: -1,
        name: "Admin",
        to: "/admin",
        condition: localStorage.getItem('user') === "token_admin"
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
            localStorage.setItem('user', null);
            localStorage.setItem('logged', null);
            window.location.reload()
        },
        to: "/logout",
        condition: true,
    },
];
