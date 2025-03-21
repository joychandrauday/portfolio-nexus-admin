/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Facebook, Twitter, Instagram, Linkedin, Github, Youtube, Globe } from 'lucide-react';
import Swal from 'sweetalert2';
import { ISocial } from '@/types';
import { Card } from "@/components/ui/card";
import { editsocial } from '@/service/Credentials/social';

const icons = {
    facebook: <Facebook className="text-blue-500" />,
    twitter: <Twitter className="text-blue-400" />,
    instagram: <Instagram className="text-pink-500" />,
    linkedin: <Linkedin className="text-blue-600" />,
    github: <Github className="text-gray-700" />,
    youtube: <Youtube className="text-red-500" />,
    website: <Globe className="text-green-500" />,
};

const SocialLinks = ({ social }: { social: ISocial }) => {
    const [links, setLinks] = useState(social);
    const [editLinks, setEditLinks] = useState(links);
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = () => setIsOpen(true);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setEditLinks({ ...editLinks, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await editsocial(editLinks);
            setLinks(editLinks);
            setIsOpen(false);

            Swal.fire({
                title: "Updated!",
                text: "Your social links have been updated successfully.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Error updating social links:", error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <Card className="p-6 bg-opacity-15 backdrop-blur-lg border border-gray-600 shadow-lg rounded-xl">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold ">Social Links</h1>
                <Button variant="outline" onClick={handleEdit} className="flex gap-2  border-gray-500 hover:border-gray-400">
                    <Edit size={18} /> Edit
                </Button>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(links).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-opacity-15 backdrop-blur-md hover:bg-opacity-20 transition">
                        {icons[key as keyof typeof icons] || <Globe className="text-gray-500" />}
                        <span className="">{key}</span>
                    </a>
                ))}
            </div>

            {/* Edit Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='bg-opacity-15 text-white backdrop-blur-xl border border-gray-500 rounded-lg'>
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold text-white">Edit Social Links</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                        {Object.entries(editLinks).map(([key, url]) => (
                            <div key={key} className="flex flex-col">
                                <label className="capitalize text-gray-300">{key}</label>
                                <Input name={key} value={url} onChange={handleChange} placeholder={key} className="bg-gray-800 text-white border-gray-600" />
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default SocialLinks;
