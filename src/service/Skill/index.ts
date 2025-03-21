/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// Adding a Skill
export const addSkill = async (SkillData: any): Promise<any> => {
    const session = await getServerSession(authOptions);

    try {
        // Send the data as JSON in the request body
        const res = await fetch(`${process.env.SERVER_URL}/skill`, {
            method: "POST",
            body: JSON.stringify(SkillData),  // Send data as JSON
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                authorization: `Bearer ${session?.user?.accessToken}`,
            },
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the response as JSON
    } catch (error: any) {
        return Error(error); // Return the error
    }
};

// Fetching all Skills
export const getSkills = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/skill`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });
        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

// Fetch a single Skill by ID
export const getSingleSkill = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/skill/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.json();  // Return the Skill data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Edit a Skill
export const editSkill = async (id: string, SkillData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/skill/${id}`, {
            method: "PATCH",
            body: JSON.stringify(SkillData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the updated Skill data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

// Delete a Skill
export const deleteSkill = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/skill/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the deleted Skill data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};
