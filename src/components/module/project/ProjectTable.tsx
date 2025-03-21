/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from "react";
import Swal from "sweetalert2"; // SweetAlert2 import
import Image from "next/image";
import { IProject } from '@/types';
import useUploadImage from "@/hooks/useUploadImage"; // Import the custom image upload hook
import { deleteProject, editProject } from "@/service/project";

const ProjectTable = ({ projects }: { projects: IProject[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

    const [technologyFields, setTechnologyFields] = useState<string[]>(selectedProject?.usedTechnologies || []);
    const [featureFields, setFeatureFields] = useState<string[]>([]); // For Features

    // Use the custom image upload hook
    const { uploadImage, imageUrl } = useUploadImage();

    // Open Edit Modal with Selected Project Data
    const openEditModal = (project: IProject) => {
        setSelectedProject({ ...project });
        setTechnologyFields(project.usedTechnologies || []);
        setFeatureFields(project.features || []);
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    // Handle Change for Inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!selectedProject) return;

        if (e.target.name === 'usedTechnologies') {
            setTechnologyFields(e.target.value.split(", ").map(item => item.trim()));
        } else if (e.target.name === 'features') {
            setFeatureFields(e.target.value.split(", ").map(item => item.trim()));
        } else {
            setSelectedProject({
                ...selectedProject,
                [e.target.name]: e.target.value,
            });
        }
    };

    // Handle Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            await uploadImage(e.target.files);
            if (imageUrl && imageUrl !== selectedProject?.coverImage) {
                setSelectedProject((prev) => prev ? { ...prev, coverImage: imageUrl } : null);
            }
        }
    };

    // Handle Save
    const handleSave = async () => {
        if (!selectedProject || !selectedProject._id) return;

        const updatedFields: Partial<IProject> = {};

        if (selectedProject.title) updatedFields.title = selectedProject.title;
        if (selectedProject.description) updatedFields.description = selectedProject.description;
        if (selectedProject.projectType) updatedFields.projectType = selectedProject.projectType;
        if (selectedProject.liveLink) updatedFields.liveLink = selectedProject.liveLink;
        if (selectedProject.clientCodeLink) updatedFields.clientCodeLink = selectedProject.clientCodeLink;
        if (selectedProject.serverCodeLink) updatedFields.serverCodeLink = selectedProject.serverCodeLink;
        if (selectedProject.underDevelopment !== undefined) updatedFields.underDevelopment = selectedProject.underDevelopment;
        if (technologyFields.length) updatedFields.usedTechnologies = technologyFields;
        if (featureFields.length) updatedFields.features = featureFields;
        if (selectedProject.serial) updatedFields.serial = selectedProject.serial;
        if (imageUrl) updatedFields.coverImage = imageUrl;
        try {
            await editProject(selectedProject._id, updatedFields);
            Swal.fire("Success", "Project updated successfully!", "success");
            closeModal();
        } catch (error) {
            Swal.fire("Error", "Failed to update the project", "error");
        }
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this project?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteProject(id); // Call your delete API service
                Swal.fire("Deleted!", "The project has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to delete the project", "error");
            }
        }
    };

    // Add Technology Field
    const addTechnologyField = () => {
        setTechnologyFields([...technologyFields, ""]);
    };

    // Remove Technology Field
    const removeTechnologyField = (index: number) => {
        const updatedFields = [...technologyFields];
        updatedFields.splice(index, 1);
        setTechnologyFields(updatedFields);
    };

    // Add Feature Field
    const addFeatureField = () => {
        setFeatureFields([...featureFields, ""]);
    };

    // Remove Feature Field
    const removeFeatureField = (index: number) => {
        const updatedFields = [...featureFields];
        updatedFields.splice(index, 1);
        setFeatureFields(updatedFields);
    };

    return (
        <div className="wrap overflow-x-auto">
            <div className="overflow-x-auto table-auto w-full">
                <table className="w-full min-w-[600px] border border-gray-300">
                    <thead>
                        <tr>
                            <th className="p-2 text-sm md:text-base border">Title</th>
                            <th className="p-2 text-sm md:text-base border">Status</th>
                            <th className="p-2 text-sm md:text-base border">Image</th>
                            <th className="p-2 text-sm md:text-base border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.length > 0 ? (
                            projects?.map((project) => (
                                <tr key={project._id} className="text-xs md:text-sm border">
                                    <td className="p-2 border">{project.title.slice(0, 30)}...</td>
                                    <td className="p-2 border">{project.projectType || 'Unknown'}</td>
                                    <td className="p-2 border">
                                        <Image
                                            src={project.coverImage}
                                            alt={project.title}
                                            className="rounded-full w-10 h-10 md:w-12 md:h-12"
                                            width={120}
                                            height={120}
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm" onClick={() => openEditModal(project)}>Edit</button>
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm bg-red-500 text-white" onClick={() => handleDelete(project._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-xs md:text-sm border">
                                    No projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedProject && (
                <div className="fixed inset-0 flex items-center justify-center min-h-screen z-50 bg-black bg-opacity-50">
                    <div className="backdrop-blur-lg border-2 border-gray-400 rounded-lg shadow-lg p-6 w-3/4 h-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Edit Project</h2>

                        <div className="grid grid-cols-2 gap-4 py-4">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="title" className="block">Title</label>
                                    <input
                                        name="title"
                                        value={selectedProject.title || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="liveLink" className="block">Live Link</label>
                                    <input
                                        name="liveLink"
                                        value={selectedProject.liveLink || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="serverCodeLink" className="block">Server Code Link</label>
                                    <input
                                        name="serverCodeLink"
                                        value={selectedProject.serverCodeLink || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="serial" className="block">Serial</label>
                                    <input
                                        name="serial"
                                        value={selectedProject.serial || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="description" className="block">Description</label>
                                    <textarea
                                        name="description"
                                        value={selectedProject.description || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="usedTechnologies" className="block">Used Technologies</label>
                                    {technologyFields.map((field, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                value={field}
                                                onChange={(e) => {
                                                    const updatedFields = [...technologyFields];
                                                    updatedFields[index] = e.target.value;
                                                    setTechnologyFields(updatedFields);
                                                }}
                                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400 flex-1"
                                                placeholder={`Technology ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeTechnologyField(index)}
                                                className="ml-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addTechnologyField}
                                        className="p-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Add Technology
                                    </button>
                                </div>

                                <div>
                                    <label htmlFor="features" className="block">Features</label>
                                    {featureFields.map((field, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                value={field}
                                                onChange={(e) => {
                                                    const updatedFields = [...featureFields];
                                                    updatedFields[index] = e.target.value;
                                                    setFeatureFields(updatedFields);
                                                }}
                                                className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-400 flex-1"
                                                placeholder={`Feature ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFeatureField(index)}
                                                className="ml-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addFeatureField}
                                        className="p-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Add Feature
                                    </button>
                                </div>

                                <div>
                                    <label htmlFor="coverImage" className="block">Cover Image</label>
                                    <input
                                        type="file"
                                        name="coverImage"
                                        onChange={handleImageUpload}
                                        className="w-full p-2 border rounded"
                                    />
                                    {selectedProject.coverImage && (
                                        <div className="mt-4">
                                            <Image width={100} height={100} src={selectedProject.coverImage} alt="Project Cover" className="w-20 h-20 object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectTable;
