/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2"; // SweetAlert2 import
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { Blog, Category } from '@/types';
import { getAllCategory } from "@/service/category";
import { updateBlog, deleteBlog } from "@/service/blog";
import toast from "react-hot-toast";

const BlogTable = ({ blogs }: { blogs: Blog[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategory();
                setCategories(data);
            } catch (error) {
                console.log('Failed to fetch categories');
            }
        };
        fetchCategories();
    }, []);

    // Open Edit Modal with Selected Blog Data
    const openEditModal = (blog: Blog) => {
        setSelectedBlog({ ...blog });
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
    };

    // Handle Change for Inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!selectedBlog) return;

        const { name, value } = e.target;

        setSelectedBlog({
            ...selectedBlog,
            [name]: value,
        });
    };

    // Save Changes
    const handleSave = async () => {
        if (!selectedBlog || !selectedBlog._id) return;

        const updatedFields: Partial<Blog> = {};
        if (selectedBlog.title) updatedFields.title = selectedBlog.title;
        if (selectedBlog.content) updatedFields.content = selectedBlog.content;

        try {
            await updateBlog(selectedBlog._id, updatedFields);
            Swal.fire("Success", "Blog updated successfully!", "success");
            closeModal(); // Close modal after save
        } catch (error) {
            Swal.fire("Error", "Failed to update the blog", "error");
        }
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this blog?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteBlog(id); // Call your delete API service
                Swal.fire("Deleted!", "The blog has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to delete the blog", "error");
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
                        {blogs?.length > 0 ? (
                            blogs?.map((blog) => (
                                <tr key={blog._id} className="text-xs md:text-sm border">
                                    <td className="p-2 border">{blog.title.slice(0, 30)}...</td>
                                    <td className="p-2 border">
                                        <select
                                            value={blog.isPublished.toString()}
                                            onChange={async (e) => {
                                                try {
                                                    // Convert string to boolean before sending it to the backend
                                                    const newStatus = e.target.value === "true";
                                                    await updateBlog(blog._id, { isPublished: newStatus });
                                                    toast.success("Status updated successfully!");
                                                } catch (error) {
                                                    toast.error("Failed to update status.");
                                                }
                                            }}
                                            className="w-[80px] text-xs md:text-sm border rounded p-1"
                                        >
                                            <option value="true">Published</option> {/* Display "Published" for true */}
                                            <option value="false">Hidden</option> {/* Display "Hidden" for false */}
                                        </select>
                                    </td>

                                    <td className="p-2 border">
                                        <Image
                                            src={blog.featuredImage}
                                            alt={blog.title}
                                            className="rounded-full w-10 h-10 md:w-12 md:h-12"
                                            width={120}
                                            height={120}
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <div className="flex flex-col md:flex-row gap-2">
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm" onClick={() => openEditModal(blog)}>Edit</button>
                                            <button className="border px-2 py-1 rounded text-xs md:text-sm bg-red-500 text-white" onClick={() => handleDelete(blog._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-xs md:text-sm border">
                                    No blogs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && selectedBlog && (
                <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`}>
                    <div className="backdrop-blur-lg border-2 border-gray-400 rounded-lg shadow-lg p-6 w-[500px]">
                        <h2 className="text-lg font-semibold mb-4">Edit Blog</h2>
                        <div className="grid gap-2 py-4">
                            <div>
                                <label htmlFor="title" className="block">Title</label>
                                <Input name="title" value={selectedBlog.title || ""} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="description" className="block">Description</label>
                                <textarea name="content" value={selectedBlog.content || ""} onChange={handleChange} className="w-full" />
                            </div>
                            <div>
                                <label htmlFor="status" className="block">Status</label>
                                <select
                                    name="status"
                                    value={""}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="category" className="block">Category</label>
                                <select
                                    name="category"
                                    value={selectedBlog.category.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="image" className="block">Image URL</label>
                                <Input
                                    name="featuredImage"
                                    value={selectedBlog.featuredImage || ""}
                                    onChange={handleChange}
                                    placeholder="Enter image URL"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="px-4 py-2 border rounded" onClick={closeModal}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BlogTable;
