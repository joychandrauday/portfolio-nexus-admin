/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { revalidatePath } from "next/cache";

// Fetching all projects
export const getBanner = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        });
        const response = await res.json();
        return response.data.banner;
    } catch (error: any) {
        return Error(error);
    }
};



// Edit a project
export const editBanner = async (bannerData: any): Promise<any> => {
    try {
        const res = await fetch(`${process.env.SERVER_URL}/credentials/banner/${process.env.CREDENTIALS_ID}`, {
            method: "PUT",
            body: JSON.stringify(bannerData),
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

