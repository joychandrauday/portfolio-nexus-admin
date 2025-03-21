/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from "react";
import Swal from "sweetalert2"; // SweetAlert2 import
import Image from "next/image";
import useUploadImage from "@/hooks/useUploadImage";
import { Skill } from "@/types";
import { deleteSkill, editSkill } from "@/service/Skill";

const SkillTable = ({ skills }: { skills: Skill[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);


    // Use the custom image upload hook
    const { uploadImage, error, imageUrl } = useUploadImage();

    // Open Edit Modal with Selected Project Data
    const openEditModal = (skill: Skill) => {
        setSelectedSkill({ ...skill });
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSkill(null);
    };

    // Handle Change for Inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!selectedSkill) return;


        setSelectedSkill({
            ...selectedSkill,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            await uploadImage(e.target.files);
            if (imageUrl && imageUrl !== selectedSkill?.image) {
                setSelectedSkill((prev) => prev ? { ...prev, image: imageUrl } : null);
            }
        }
    };

    // Handle Save
    const handleSave = async () => {
        if (!selectedSkill || !selectedSkill._id) return;

        const updatedFields: Partial<Skill> = {};

        if (selectedSkill.title) updatedFields.title = selectedSkill.title;
        if (selectedSkill.description) updatedFields.description = selectedSkill.description;
        if (selectedSkill.type) updatedFields.type = selectedSkill.type;

        if (imageUrl) updatedFields.image = imageUrl;

        try {
            await editSkill(selectedSkill._id, updatedFields);
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
                await deleteSkill(id); // Call your delete API service
                Swal.fire("Deleted!", "The project has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to delete the project", "error");
            }
        }
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
                        {skills?.length > 0 ? (
                            skills?.map((skill) => (
                                <tr key={skill._id} className="text-xs md:text-sm border">
                                    <td className="p-2 border">{skill.title.slice(0, 30)}...</td>
                                    <td className="p-2 border">{skill.type || 'Unknown'}</td>
                                    <td className="p-2 border">
                                        <Image
                                            src={skill.image}
                                            alt={skill.title}
                                            className="rounded-full w-10 h-10 md:w-12 md:h-12"
                                            width={120}
                                            height={120}
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm" onClick={() => openEditModal(skill)}>Edit</button>
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm bg-red-500 text-white" onClick={() => handleDelete(skill._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-xs md:text-sm border">
                                    No skills found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedSkill && (
                <div className="fixed inset-0 flex items-center justify-center min-h-screen z-50 bg-black bg-opacity-50">
                    <div className="backdrop-blur-lg border-2 border-gray-400 rounded-lg shadow-lg p-6 w-3/4 h-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg font-semibold mb-4">Edit Skill</h2>

                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="title" className="block">Title</label>
                                <input
                                    name="title"
                                    value={selectedSkill.title || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>


                        </div>

                        <div>
                            <label htmlFor="description" className="block">Description</label>
                            <textarea
                                name="description"
                                value={selectedSkill.description || ""}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label htmlFor="coverImage" className="block">Icon Image</label>
                            <input
                                type="file"
                                name="coverImage"
                                onChange={handleImageUpload}
                                className="w-full p-2 border rounded"
                            />
                            {selectedSkill.image && (
                                <div className="mt-4">
                                    <Image width={100} height={100} src={selectedSkill.image} alt="Project Cover" className="w-20 h-20 object-cover" />
                                </div>
                            )}
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
            )
            }
        </div >
    );
};

export default SkillTable;
