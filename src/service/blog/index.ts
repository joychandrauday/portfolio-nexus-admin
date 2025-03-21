/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// Adding a blog
export const addBlog = async (blogData: any): Promise<any> => {
    const session = await getServerSession(authOptions);

    try {
        const res = await fetch(`${process.env.SERVER_URL}/blogs`, {
            method: "POST",
            body: JSON.stringify(blogData),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${session?.user?.accessToken}`,
            },
            cache: "no-store", // ✅ Prevent caching
        });
        revalidatePath(`/user/dashboard`);
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

// Fetching all blogs with optional limit and query
export const getAllBlogs = async (limit?: string, query?: string) => {
    try {
        const res = await fetch(
            `${process.env.SERVER_URL}/blogs?limit=${limit}&${query}`,
            { cache: "no-store" } // ✅ Prevent caching
        );
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
};

// Fetching a single blog by its ID
export const getSingleBlog = async (id: string) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/blogs/${id}`, { cache: "no-store" });
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
};

// Fetching blogs by the author's ID
export const getBlogsByAuthorId = async (authorId: string) => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/blogs/user/${authorId}`, { cache: "no-store" });
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
};

// Deleting a blog by its ID
export const deleteBlog = async (id: string): Promise<any> => {
    const session = await getServerSession(authOptions);

    try {
        const res = await fetch(`${process.env.SERVER_URL}/blogs/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${session?.user?.accessToken}`,
            },
            cache: "no-store", // ✅ Prevent caching
        });

        if (!res.ok) {
            throw new Error('Failed to delete blog');
        }
        revalidatePath(`/user/dashboard`);
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
};

// Updating a blog by its ID
export const updateBlog = async (id: string, updatedData: any): Promise<any> => {
    const session = await getServerSession(authOptions);

    try {
        const res = await fetch(`${process.env.SERVER_URL}/blogs/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.accessToken}`,
            },
            cache: "no-store", // ✅ Prevent caching
        });

        if (!res.ok) {
            throw new Error('Failed to update blog');
        }

        revalidatePath(`/user/dashboard`);
        return res.json();
    } catch (error: any) {
        return Error(error.message);
    }
};
