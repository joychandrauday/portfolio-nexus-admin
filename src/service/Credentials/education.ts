/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { revalidatePath } from "next/cache";

// Fetching all projects
export const geteducation = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/credentials`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });
        const response = await res.json();
        return response.data.education;
    } catch (error: any) {
        console.error('Error fetching education data:', error);
        return [];
    }
};


// Edit a project
export const editeducation = async (educationData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials/education/${process.env.CREDENTIALS_ID}`, {
            method: "PUT",
            body: JSON.stringify(educationData),
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

