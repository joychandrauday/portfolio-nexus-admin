'use client'
import { editexperience } from '@/service/Credentials/experience';
import { IExperience } from '@/types';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const ExperienceComponent = ({ experience }: { experience: IExperience[] }) => {
    const [experienceData, setExperienceData] = useState<IExperience[]>(experience);
    const [newExperience, setNewExperience] = useState<IExperience>({
        id: '',
        company: '',
        position: '',
        duration: { from: '', to: '' },
        location: '',
        description: '',
        achievements: []
    });

    const [debouncedExperience, setDebouncedExperience] = useState<IExperience[]>(experienceData);

    // Handle typing delay (debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedExperience(experienceData); // After typing stops, set the debounced data
        }, 2000); // Wait for 2 seconds after typing stops

        return () => clearTimeout(timer); // Cleanup timeout on change
    }, [experienceData]);

    // Handle update of experience entry (called after debounce delay)
    useEffect(() => {
        if (debouncedExperience !== experienceData) {
            const timer = setTimeout(() => {
                const updateExperience = async () => {
                    await editexperience(debouncedExperience); // Update data in backend after debounce
                    toast('Experience Updated!');
                };
                updateExperience();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [debouncedExperience, experienceData]); // This will run after the debounced data is set

    // Update experience entry
    const handleUpdate = (index: number, field: string, value: string) => {
        const updatedData = [...experienceData];
        updatedData[index][field] = value;
        setExperienceData(updatedData); // Update the state
    };


    const handleAdd = async () => {
        if (
            newExperience.company &&
            newExperience.position &&
            newExperience.duration.from &&
            newExperience.duration.to &&
            newExperience.location &&
            newExperience.description
        ) {
            // Add new experience to the state first
            const updatedExperienceData = [...experienceData, newExperience];
            setExperienceData(updatedExperienceData);

            try {
                const res = await editexperience(updatedExperienceData);  // Sending all experiences

                if (res && res.success) { // Adjust based on actual response format
                    Swal.fire("success", "Experience added successfully!");
                } else {
                    Swal.fire("error", "Failed to add experience.");
                }
            } catch (error) {
                console.error("Error adding experience:", error);
                Swal.fire("error", "Failed to add experience.");
            }

            // Reset new experience input fields
            setNewExperience({
                id: '',
                company: '',
                position: '',
                duration: { from: '', to: '' },
                location: '',
                description: '',
                achievements: []
            });
        } else {
            Swal.fire("warning", "Please fill out all fields.");
        }
    };

    const handleDelete = async (index: number) => {
        const updatedExperienceData = experienceData.filter((_, i) => i !== index);
        setExperienceData(updatedExperienceData); // Update the state

        try {
            const res = await editexperience(updatedExperienceData);

            if (res && res.success) {
                Swal.fire("success", "Experience deleted successfully!");
            } else {
                Swal.fire("error", "Failed to delete experience.");
                setExperienceData(experienceData); // Restore the previous state if delete fails
            }
        } catch (error) {
            console.error("Error deleting experience:", error);
            Swal.fire("error", "Failed to delete experience.");
            setExperienceData(experienceData); // Restore the previous state if an error occurs
        }
    };


    return (
        <div className="max-w-4xl mx-auto z-30 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Experience</h2>

            <div className="grid grid-cols-2 gap-4 w-full">
                {/* Display existing experience entries */}
                {experienceData.map((exp, index) => (
                    <div key={index} className="experience-entry mb-6 relative p-4 bg-white rounded-lg shadow-sm">
                        <div className="w-10 h-10 flex items-center justify-center font-bold text-yellow-500 bg-black rounded-full absolute right-0 top-0">
                            {index + 1}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor={`company-${index}`}>Company</label>
                            <input
                                id={`company-${index}`}
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                                placeholder="Enter Company"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor={`position-${index}`}>Position</label>
                            <input
                                id={`position-${index}`}
                                type="text"
                                value={exp.position}
                                onChange={(e) => handleUpdate(index, 'position', e.target.value)}
                                placeholder="Enter Position"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor={`from-${index}`}>From</label>
                            <input
                                id={`from-${index}`}
                                type="date"
                                value={new Date(exp.duration.from).toISOString().split('T')[0]}
                                onChange={(e) => handleUpdate(index, 'duration.from', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor={`to-${index}`}>To</label>
                            <input
                                id={`to-${index}`}
                                type="date"
                                value={new Date(exp.duration.to).toISOString().split('T')[0]}
                                onChange={(e) => handleUpdate(index, 'duration.to', e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor={`location-${index}`}>Location</label>
                            <input
                                id={`location-${index}`}
                                type="text"
                                value={exp.location}
                                onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                                placeholder="Enter Location"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor={`description-${index}`}>Description</label>
                            <textarea
                                id={`description-${index}`}
                                value={exp.description}
                                onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                                placeholder="Enter Description"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Add Delete Button */}
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Add new experience entry form */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Experience</h3>
            <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="company">Company</label>
                    <input
                        id="company"
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                        placeholder="Enter Company"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="position">Position</label>
                    <input
                        id="position"
                        type="text"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                        placeholder="Enter Position"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="from">From</label>
                    <input
                        id="from"
                        type="date"
                        value={newExperience.duration.from}
                        onChange={(e) => setNewExperience({ ...newExperience, duration: { ...newExperience.duration, from: e.target.value } })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="to">To</label>
                    <input
                        id="to"
                        type="date"
                        value={newExperience.duration.to}
                        onChange={(e) => setNewExperience({ ...newExperience, duration: { ...newExperience.duration, to: e.target.value } })}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        value={newExperience.location}
                        onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                        placeholder="Enter Location"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                        placeholder="Enter Description"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    onClick={handleAdd}
                    className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add New Experience
                </button>
            </div>
        </div>
    );
};

export default ExperienceComponent;
