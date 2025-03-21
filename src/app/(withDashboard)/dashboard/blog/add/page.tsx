"use server"
import ContentForm from '@/components/editor/content-form';
import { getAllCategory } from '@/service/category';
import React from 'react';

const ManageBlogPage = async () => {
    const data = await getAllCategory()
    const categoriesArray = Array.isArray(data) ? data : [];

    return (
        <div className='w-full'>

            <ContentForm categories={categoriesArray} />
        </div>
    );
}

export default ManageBlogPage;
