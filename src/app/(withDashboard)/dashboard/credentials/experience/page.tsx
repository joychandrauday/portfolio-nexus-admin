/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import ExperienceComponent from "@/components/module/Credential/ExperienceManagement";
import { getexperience } from "@/service/Credentials/experience";
import LoadingPage from "@/components/utils/Loading";

const ExperiencePage: React.FC = () => {
    const [experience, setExperience] = useState<any>(null); // Use the appropriate type instead of 'any'
    const [loading, setLoading] = useState<boolean>(true);  // Loading state
    const [error, setError] = useState<string | null>(null); // Error handling state

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const data = await getexperience();
                setExperience(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch experience data.");  // Handle the error
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (loading) {
        return <div><LoadingPage /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <ExperienceComponent experience={experience} />
        </div>
    );
};

export default ExperiencePage;
