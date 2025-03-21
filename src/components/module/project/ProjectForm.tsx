/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { addProject } from "@/service/project";
import Swal from "sweetalert2";

// Define the form data interface
interface IFormData {
    title: string;
    coverImage: string;
    description: string;
    liveLink?: string;
    clientCodeLink?: string;
    serverCodeLink?: string;
    underDevelopment: boolean;
    features: string[];
    usedTechnologies: string[];
    serial: string;
    images: string[];
    projectType: string;
}

const ProjectForm = () => {
    const { control, handleSubmit, reset } = useForm<IFormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission
    const onSubmit = async (data: IFormData) => {
        setIsSubmitting(true);
        try {
            // Use the ProjectService to create a project
            const res = await addProject(data);
            console.log(res);
            Swal.fire({
                title: "Project posted successfully!",
                icon: "success",
            });
            reset(); // Clear form after successful submission
        } catch (error) {
            toast.error("Failed to post project. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Post a New Project</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Title is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input {...field} className="mt-1" />
                                {fieldState?.error && <span className="text-red-500 text-sm">{fieldState?.error?.message}</span>}
                            </>
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Cover Image URL</label>
                    <Controller
                        name="coverImage"
                        control={control}
                        defaultValue="https://designshack.net/wp-content/uploads/placeholder-image.png"
                        rules={{ required: "Cover image is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input {...field} className="mt-1" />
                                {fieldState?.error && <span className="text-red-500 text-sm">{fieldState?.error?.message}</span>}
                            </>
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Description is required" }}
                        render={({ field, fieldState }) => (
                            <>
                                <Textarea {...field} className="mt-1" />
                                {fieldState?.error && <span className="text-red-500 text-sm">{fieldState?.error?.message}</span>}
                            </>
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Live Link</label>
                    <Controller
                        name="liveLink"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} className="mt-1" />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Client Code Link</label>
                    <Controller
                        name="clientCodeLink"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} className="mt-1" />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Server Code Link</label>
                    <Controller
                        name="serverCodeLink"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} className="mt-1" />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Under Development</label>
                    <Controller
                        name="underDevelopment"
                        control={control}
                        defaultValue={false} // Initial value
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                {...field}
                                type="checkbox"
                                checked={value} // Use checked for checkbox
                                onChange={(e) => onChange(e.target.checked)} // Handle boolean value
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Features (Comma Separated)</label>
                    <Controller
                        name="features"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Input
                                {...field}
                                className="mt-1"
                                placeholder="e.g., Feature 1, Feature 2"
                                onChange={(e) => field.onChange(e.target.value.split(",").map((s) => s.trim()))}
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Used Technologies (Comma Separated)</label>
                    <Controller
                        name="usedTechnologies"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Input
                                {...field}
                                className="mt-1"
                                placeholder="e.g., React, Node.js"
                                onChange={(e) => field.onChange(e.target.value.split(",").map((s) => s.trim()))}
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Serial</label>
                    <Controller
                        name="serial"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <>
                                <Input {...field} className="mt-1" />
                                {fieldState?.error && <span className="text-red-500 text-sm">{fieldState?.error?.message}</span>}
                            </>
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Images (Comma Separated URLs)</label>
                    <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Input
                                {...field}
                                className="mt-1"
                                placeholder="e.g., http://example.com/image1.jpg, http://example.com/image2.jpg"
                                onChange={(e) => field.onChange(e.target.value.split(",").map((s) => s.trim()))}
                            />
                        )}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Project Type</label>
                    <Controller
                        name="projectType"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <>
                                <select {...field} className="mt-1 block w-full border rounded-md">
                                    <option value="">Select Project Type</option>
                                    <option value="frontend">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="fullstack">Full Stack</option>
                                </select>

                                {fieldState?.error && <span className="text-red-500 text-sm">{fieldState?.error?.message}</span>}
                            </>
                        )}
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Project"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
