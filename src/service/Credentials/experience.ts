/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { revalidatePath } from "next/cache";

// Fetching all projects
export const getexperience = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });
        const response = await res.json();
        return response.data.experience;
    } catch (error: any) {
        return Error(error);
    }
};

// Edit a project
export const editexperience = async (experienceData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials/experience/${process.env.CREDENTIALS_ID}`, {
            method: "PUT",
            body: JSON.stringify(experienceData),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error('Failed to update experience');
        }

        revalidatePath(`/user/dashboard`);
        return await res.json();  // Return the updated project data as JSON
    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message || 'An error occurred' }; // Better error handling
    }
};


