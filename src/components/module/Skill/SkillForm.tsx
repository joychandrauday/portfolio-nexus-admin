/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import useUploadImage from '@/hooks/useUploadImage';
import { Input } from '@/components/ui/input';
import { FaSpinner } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { addSkill } from '@/service/Skill';
import Swal from 'sweetalert2';

const AddSkill = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const { uploadImage, isLoading, error, imageUrl } = useUploadImage();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            uploadImage(event.target.files as FileList);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title || !type) {
            alert('Title and Type are required');
            return;
        }

        const skillData = {
            title,
            description,
            type,
            image: imageUrl || '', // Use the URL from Cloudinary
        };

        try {
            const res = await addSkill(skillData)

            if (!res.success) throw new Error('Failed to add skill');
            Swal.fire('success', 'Skill added successfully!');
        } catch (error) {
            Swal.fire('failed', 'Failed to add skill');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Skill</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Title</label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Skill Title"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Description</label>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Skill Description"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    >
                        <option value="">Select Skill Type</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="full-stack">Full Stack</option>
                        <option value="database">Database</option>
                        <option value="utility">Utility</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Upload Image</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm"
                    />
                    {isLoading && <FaSpinner />}
                    {imageUrl && <Image width={100} height={100} src={imageUrl} alt="Uploaded Skill Image" className="mt-2 w-32" />}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Uploading...' : 'Add Skill'}
                </Button>
            </form>
        </div>
    );
};

export default AddSkill;
