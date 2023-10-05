import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
  ],

  sidebarNav: [
    {
      title: "User",
      items: [
        {
          title: "Login",
          href: "/login",
          items: [],
        },
        {
          title: "Register",
          href: "/register",
          items: [],
        },
        {
          title: "Logout",
          href: "/logout",
          items: [],
        },
      ],
    },
  ],
};
