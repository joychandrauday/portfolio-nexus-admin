/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { revalidatePath } from "next/cache";

// Fetching all projects
export const getsocial = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = await res.json();
        return response.data.social;
    } catch (error: any) {
        return Error(error);
    }
};


// Edit a project
export const editsocial = async (socialData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials/social/${process.env.CREDENTIALS_ID}`, {
            method: "PUT",
            body: JSON.stringify(socialData),
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });
        revalidatePath(`/user/dashboard`);
        return res.json();  // Return the updated project data as JSON
    } catch (error: any) {
        return Error(error);  // Handle any errors
    }
};

