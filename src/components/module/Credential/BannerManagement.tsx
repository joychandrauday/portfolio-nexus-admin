/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { IBanner } from '@/types';
import { Edit, List, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import useUploadImage from '@/hooks/useUploadImage';
import { editBanner } from '@/service/Credentials/banner';

const BannerComponent = ({ banner }: { banner: IBanner }) => {
    const [bannerData, setBannerData] = useState({
        title: banner.title,
        subtitle: banner.subtitle,
        bannerImage: banner.bannerImage,
        designations: banner.designations,
        designationPretext: banner.designationPretext
    });

    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(bannerData);
    const { uploadImage, isLoading, imageUrl } = useUploadImage();

    const handleEdit = () => setIsOpen(true);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: { target: { files: any; }; }) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            await uploadImage(files);
        }
    };

    if (imageUrl) {
        setEditData((prev) => ({ ...prev, bannerImage: imageUrl }));
    }
    const handleDesignationChange = (index: number, value: string) => {
        const updatedDesignations = [...editData.designations];
        updatedDesignations[index] = value;
        setEditData({ ...editData, designations: updatedDesignations });
    };

    const addDesignation = () => {
        setEditData({ ...editData, designations: [...editData.designations, ""] });
    };

    const removeDesignation = (index: number) => {
        const updatedDesignations = editData.designations.filter((_, i) => i !== index);
        setEditData({ ...editData, designations: updatedDesignations });
    };

    const handleSave = async () => {
        await editBanner(editData);
        setBannerData(editData);
        setIsOpen(false);
    };


    return (
        <div className="p-6 relative rounded-lg shadow-lg">
            <div className="flex justify-between items-center gap-4">
                <div className="wrap text-left">
                    <h1 className="text-3xl font-bold mt-4">Title : {bannerData.title}</h1>
                    <p className="text-lg">SubTitle: {bannerData.subtitle}</p>
                    {/* designation list */}
                    <p>Designations: </p>
                    {bannerData?.designations?.length > 0 ? bannerData.designations.map((designation, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <List /> {designation}
                        </div>
                    )) : null}

                    <p className="mt-2">
                        Designation Pretext: {bannerData.designationPretext} {Array.isArray(bannerData.designations) ? bannerData.designations.join(', ') : ""}
                    </p>
                    <Button className="mt-4 rounded-none" onClick={handleEdit}><Edit /></Button>
                </div>
                <div className="wrap">
                    <Image width={250} height={250} src={bannerData.bannerImage} alt="Banner" className="rounded-md" />
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className='bg-opacity-15 text-white backdrop-blur-xl'>
                    <DialogHeader>
                        <DialogTitle>Edit Banner</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input name="title" value={editData.title} onChange={handleChange} placeholder="Title" />

                        <Input name="subtitle" value={editData.subtitle} onChange={handleChange} placeholder="Subtitle" />

                        <Input type="file" accept="image/*" onChange={handleImageUpload} />
                        {isLoading && <p className="text-sm text-blue-500">Uploading...</p>}
                        {imageUrl && <Image width={150} height={150} src={imageUrl} alt="New Banner" className="rounded-md" />}

                        <Input name="designationPretext" value={editData.designationPretext} onChange={handleChange} placeholder="Designation Pretext" />

                        {/* Designations List */}
                        <div className="flex flex-col mt-4">
                            <Label className="text-sm font-medium mb-2">Designations</Label>
                            {editData.designations?.map((designation, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <Input
                                        type="text"
                                        value={designation}
                                        onChange={(e) => handleDesignationChange(index, e.target.value)}
                                        className="p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm text-gray-200 placeholder-gray-400 flex-1"
                                        placeholder={`Designation ${index + 1}`}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => removeDesignation(index)}
                                        className="ml-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            )) || []}

                            <Button
                                type="button"
                                onClick={addDesignation}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                            >
                                Add Designation
                            </Button>
                        </div>
                    </div>
                    <Button className="mt-4" onClick={handleSave}>Save</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BannerComponent;
