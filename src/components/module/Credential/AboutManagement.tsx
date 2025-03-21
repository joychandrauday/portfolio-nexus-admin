/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IAbout } from '@/types';
import { Edit } from 'lucide-react';
import { editabout } from '@/service/Credentials/about';
import Swal from 'sweetalert2';

const AboutManagement = ({ about }: { about: IAbout }) => {
    const [aboutData, setAboutData] = useState({
        title: about.title,
        content: about.content,
    });

    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(aboutData);

    const handleEdit = () => setIsOpen(true);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update the About section?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            await editabout(editData);
            setAboutData(editData);
            setIsOpen(false);

            Swal.fire({
                title: "Updated!",
                text: "The About section has been updated successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="p-6 relative rounded-lg shadow-lg">
            <div className="flex justify-between items-center gap-4">
                <div className="wrap text-left">
                    <h1 className="text-3xl font-bold mt-4">Title: {aboutData.title}</h1>
                    <p className="text-lg">Content: {aboutData.content}</p>
                    <Button className="mt-4 rounded-none" onClick={handleEdit}><Edit /></Button>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='bg-opacity-15 text-white backdrop-blur-xl'>
                    <DialogHeader>
                        <DialogTitle>Edit About Section</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input name="title" value={editData.title} onChange={handleChange} placeholder="Title" />
                        <Input name="content" value={editData.content} onChange={handleChange} placeholder="Content" />
                    </div>
                    <Button className="mt-4" onClick={handleSave}>Save</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AboutManagement;
