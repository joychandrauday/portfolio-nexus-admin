/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from 'react';
import EducationComponent from '@/components/module/Credential/EducationManagement';
import { geteducation } from '@/service/Credentials/education';
import { IEducation } from '@/types';
import LoadingPage from '@/components/utils/Loading';

const EducationPage: React.FC = () => {
    const [education, setEducation] = useState<IEducation[]>([]); // Set the correct type instead of 'any'
    const [loading, setLoading] = useState<boolean>(true);  // To manage loading state
    const [error, setError] = useState<string | null>(null); // For handling error

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const education = await geteducation();
                setEducation(education); // Assuming the response contains `education` in the response
                setLoading(false);  // Hide the loading spinner
            } catch (error) {
                setError('Failed to fetch education data');
                setLoading(false);  // Hide the loading spinner even on error
            }
        };

        fetchEducation();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return <div><LoadingPage /></div>; // You can replace this with a spinner or skeleton loader
    }

    if (error) {
        return <div>{error}</div>; // Show error message if there’s an issue
    }

    return (
        <div>
            <EducationComponent education={education} />
        </div>
    );
};

export default EducationPage;
