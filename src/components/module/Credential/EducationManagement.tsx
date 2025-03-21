'use client'
import { editeducation } from '@/service/Credentials/education';
import { IEducation } from '@/types';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

type EducationField = string | Date;
const EducationComponent = ({ education }: { education: IEducation[] }) => {
    const [educationData, setEducationData] = useState<IEducation[]>(education);
    const [newEducation, setNewEducation] = useState<IEducation>({
        id: '', // Assuming id is a required field in IEducation
        degree: '',
        institution: '',
        specialization: '',
        startYear: '',
        endYear: '',
    });
    const [debouncedEducation, setDebouncedEducation] = useState<IEducation[]>(educationData);

    // Handle typing delay (debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedEducation(educationData); // After typing stops, set the debounced data
        }, 2000); // Wait for 2 seconds after typing stops

        return () => clearTimeout(timer); // Cleanup timeout on change
    }, [educationData]);


    useEffect(() => {
        if (debouncedEducation !== educationData) {
            if (!Array.isArray(educationData)) {
                console.error('Education data is not an array:', educationData);
                return;
            }
            const timer = setTimeout(() => {
                const updateEducation = async () => {
                    await editeducation(debouncedEducation); // Update data in backend after debounce
                    toast('Education Degree Updated!');
                };
                updateEducation();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [debouncedEducation, educationData]);


    const handleUpdate = (index: number, field: keyof IEducation, value: EducationField) => {
        const updatedData = [...educationData];

        // If the value is a Date, convert it to a string
        if (value instanceof Date) {
            updatedData[index][field] = value.toISOString();  // Convert Date to ISO string
        } else {
            updatedData[index][field] = value; // Directly assign string values
        }

        setEducationData(updatedData); // Update the state
    };


    // Add new education entry
    const handleAdd = async () => {
        if (
            newEducation.degree &&
            newEducation.institution &&
            newEducation.specialization &&
            newEducation.startYear &&
            newEducation.endYear
        ) {
            // Add new education to the state first
            const updatedEducationData = [...educationData, newEducation];
            setEducationData(updatedEducationData);

            // Send the updated data to the server after state update
            try {
                await editeducation(updatedEducationData);

                Swal.fire("success", "Qualification added successfully!");
            } catch (error) {
                console.error("Error adding education:", error);
                Swal.fire("error", "Failed to add qualification.");
            }

            // Reset new education input fields
            setNewEducation({
                id: '', // Reset id as well
                degree: '',
                institution: '',
                specialization: '',
                startYear: '',
                endYear: '',
            });
        } else {
            Swal.fire("warning", "Please fill out all fields.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto z-30 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Education</h2>

            {/* Display existing education entries */}
            {educationData.map((education, index) => (
                <div key={index} className="education-entry mb-6 relative p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10  h-10 flex items-center justify-center font-bold text-yellow-500 bg-black rounded-full absolute right-0 top-0">
                        {index + 1}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor={`degree-${index}`}>Degree</label>
                        <input
                            id={`degree-${index}`}
                            type="text"
                            value={education.degree}
                            onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                            placeholder="Enter Degree"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor={`institution-${index}`}>Institution</label>
                        <input
                            id={`institution-${index}`}
                            type="text"
                            value={education.institution}
                            onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                            placeholder="Enter Institution"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor={`specialization-${index}`}>Specialization</label>
                        <input
                            id={`specialization-${index}`}
                            type="text"
                            value={education.specialization}
                            onChange={(e) => handleUpdate(index, 'specialization', e.target.value)}
                            placeholder="Enter Specialization"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor={`startYear-${index}`}>Start Year</label>
                        <input
                            id={`startYear-${index}`}
                            type="date"
                            value={new Date(education.startYear).toISOString().split('T')[0]} // Convert Date to string
                            onChange={(e) => handleUpdate(index, 'startYear', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor={`endYear-${index}`}>End Year</label>
                        <input
                            id={`endYear-${index}`}
                            type="date"
                            value={new Date(education.endYear).toISOString().split('T')[0]} // Convert Date to string
                            onChange={(e) => handleUpdate(index, 'endYear', e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            ))}

            {/* Add new education entry form */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Education</h3>
            <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="degree">Degree</label>
                    <input
                        id="degree"
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                        placeholder="Enter Degree"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="institution">Institution</label>
                    <input
                        id="institution"
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        placeholder="Enter Institution"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="specialization">Specialization</label>
                    <input
                        id="specialization"
                        type="text"
                        value={newEducation.specialization}
                        onChange={(e) => setNewEducation({ ...newEducation, specialization: e.target.value })}
                        placeholder="Enter Specialization"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="startYear">Start Year</label>
                    <input
                        id="startYear"
                        type="date"
                        value={newEducation.startYear}
                        onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="endYear">End Year</label>
                    <input
                        id="endYear"
                        type="date"
                        value={newEducation.endYear}
                        onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    onClick={handleAdd}
                    className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add New Education
                </button>
            </div>
        </div>
    );
};

export default EducationComponent;
