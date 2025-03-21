/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// Adding a project
export const addProject = async (projectData: any): Promise<any> => {
    const session = await getServerSession(authOptions);

    try {
        // Send the data as JSON in the request body
        const res = await fetch(`${process.env.SERVER_URL}/projects`, {
            method: "POST",
            body: JSON.stringify(projectData),  // Send data as JSON
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                authorization: `Bearer ${session?.user?.accessToken}`,
            },
        });
        console.log(res);
        return res.json();  // Return the response as JSON
    } catch (error: any) {
        return Error(error); // Return the error
    }
};

// Fetching all projects
export const getProjects = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/projects`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.json();  // Return the fetched projects as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Fetch a single project by ID
export const getSingleProject = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/projects/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.json();  // Return the project data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Edit a project
export const editProject = async (id: string, projectData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/projects/${id}`, {
            method: "PATCH",
            body: JSON.stringify(projectData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the updated project data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Delete a project
export const deleteProject = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the deleted project data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};
