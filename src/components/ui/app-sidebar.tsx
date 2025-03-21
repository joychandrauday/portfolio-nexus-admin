'use client'
import { Home, FileText, FileStack, Blocks, Folder, Plus, Cog, ImageDown, Link, GraduationCap, Award } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useTheme } from "next-themes";
import { useState } from "react";
import { NavUser } from "../module/sidebar/nav-user";
import { FcAbout } from "react-icons/fc";

// Sidebar items with sub-links
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Manage Blog",
        icon: FileText,
        subLinks: [
            {
                title: "Add Blog",
                url: "/dashboard/blog/add",
                icon: Plus
            },
            {
                title: "Manage Blogs",
                url: "/dashboard/blog/manage",
                icon: Cog
            },
        ],
    },
    {
        title: "Manage Project",
        icon: FileStack,
        subLinks: [
            {
                title: "Add Project",
                url: "/dashboard/project/add",
                icon: Plus
            },
            {
                title: "Manage Projects",
                url: "/dashboard/project/manage",
                icon: Cog
            },
        ],
    },
    {
        title: "Manage Skill",
        url: "#",
        icon: Blocks,
        subLinks: [
            {
                title: "Add Skill",
                url: "/dashboard/skill/add",
                icon: Plus
            },
            {
                title: "Manage Skill",
                url: "/dashboard/skill/manage",
                icon: Cog
            },
        ],
    },
    {
        title: "Manage Credentials",
        url: "#",
        icon: Folder,
        subLinks: [
            {
                title: "Banner",
                url: "/dashboard/credentials/banner",
                icon: ImageDown
            },
            {
                title: "About",
                url: "/dashboard/credentials/about",
                icon: FcAbout
            },
            {
                title: "Social",
                url: "/dashboard/credentials/social",
                icon: Link
            },
            {
                title: "Education",
                url: "/dashboard/credentials/education",
                icon: GraduationCap
            },
            {
                title: "Experience",
                url: "/dashboard/credentials/experience",
                icon: Award
            },
        ],
    },
]

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track which dropdown is open

    // Toggle function for dropdowns
    const toggleDropdown = (itemTitle: string) => {
        setOpenDropdown(openDropdown === itemTitle ? null : itemTitle); // Close if it's already open, else open it
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center justify-between">
                            <Image
                                src="/favicon.png"
                                alt="Logo"
                                width={40}
                                height={40}
                            />

                            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-lg">
                                {theme === "dark" ? "☀️" : "🌙"}
                            </button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {/* Main item link */}
                                    <SidebarMenuButton onClick={() => toggleDropdown(item.title)} asChild>
                                        <a href={item.url || '#'}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>

                                    {/* Dropdown for Manage Blog and Manage Project */}
                                    {
                                        item.subLinks && openDropdown === item.title && (
                                            <div className="pl-4">
                                                {item.subLinks.map((subItem) => (
                                                    <SidebarMenuItem key={subItem.title}>
                                                        <SidebarMenuButton asChild>
                                                            <a href={subItem.url}>
                                                                <subItem.icon />
                                                                <span>{subItem.title}</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </div>
                                        )
                                    }
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar >
    );
}
