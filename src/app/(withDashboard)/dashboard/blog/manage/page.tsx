import ManageBlog from '@/components/module/BlogManagement';
import { getAllBlogs } from '@/service/blog';
import React from 'react';

const ManageBlogPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const pageQuery = `page=${page}`;
    const { data } = await getAllBlogs('10', pageQuery)
    console.log(data);
    return (
        <div>
            <ManageBlog blogs={data} />
        </div>
    );
}

export default ManageBlogPage;
