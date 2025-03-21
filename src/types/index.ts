/* eslint-disable @typescript-eslint/no-explicit-any */

import { JSX } from "react";

export interface IBlog {
    _id: string;
    title: string;
    brief: string;
    cover: string;
    slug: string;
    content: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    featuredImage: string;
    isPublished: boolean;
    author: string;
}

export interface IProject {
    coverImage: string;
    liveLink: string;
    _id: string;
    title: string;
    slug: string;
    brief: string;
    cover: string;
    type: string;
    frontend: {
        technologies: string[];
        deploymentLink: string;
        github: string;
    };
    backend: {
        technologies: string[];
        deploymentLink: string;
        github: string;
    };
    clientCodeLink: string;
    serverCodeLink: string;
    underDevelopment: boolean;
    features: string[];
    usedTechnologies: string[];
    serial: string;
    projectType: string;
    description: string;

}
// types.d.ts

export type Session = {
    user?: {
        name: string;
        email: string;
        image?: string;
    };
};

export type Blog = {
    _id: string;
    title: string;
    content: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    featuredImage: string;
    isPublished: boolean;
    category: {
        _id: string;
        name: string;
    };
};
export type Category = {
    _id: string;
    name: string;
}
export type Skill = {
    _id: string;
    title: string;
    image: string;
    description: string;
    type: string;
}


export type IBanner = {
    id: string;
    title: string;
    subtitle: string;
    bannerImage: string;
    designations: string[];
    designationPretext: string;
};

export type IAbout = {
    id: string;
    title: string;
    content: string;
};

export type ISocial = {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    github: string;
    medium: string;
    youtube: string;
    dribbble: string;
    behance: string;
    reddit: string;
    stackoverflow: string;
    resume: string;
};

export interface IEducation {
    id: string;
    degree: string;
    institution: string;
    specialization: string;
    startYear: string;
    endYear: string;
}

export type IExperience = {
    id: string;
    company: string;
    position: string;
    duration: { from: string; to: string };
    location: string;
    description: string;
    achievements: string[];
    [key: string]: any;
};
export type ICategory = {
    _id: string;
    map(arg0: (cat: any) => JSX.Element): import("react").ReactNode;
    name: string;
    description?: string;
    image: string;
    slug: string;
};
