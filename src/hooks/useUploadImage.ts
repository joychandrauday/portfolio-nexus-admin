/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';

const useUploadImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    // Use useCallback to memoize the upload function to avoid unnecessary re-renders
    const uploadImage = useCallback(async (files: FileList): Promise<void> => {
        setIsLoading(true);
        setError(null);  // Reset previous errors
        try {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('upload_preset', 'product_images');
            formData.append('cloud_name', 'dklikxmpm');

            const res = await fetch("https://api.cloudinary.com/v1_1/dklikxmpm/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setImageUrl(data.secure_url);
            } else {
                throw new Error('Failed to upload image to Cloudinary');
            }
        } catch (err) {
            setError('Error uploading image');
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array ensures this function is not recreated on every render

    return {
        uploadImage,
        isLoading,
        error,
        imageUrl,
    };
};

export default useUploadImage;
