'use client'
import React from 'react';
import TablePagination from './TablePagination';
import { Blog } from '@/types';
import BlogTable from './BlogTable';

const ManageBlog = ({ blogs }: {
    blogs: {
        blogs: Blog[],
        meta: {
            totalPages: number
        }
    }

}) => {
    return (
        <div className=' px-4'>
            <BlogTable blogs={blogs.blogs} />
            <TablePagination totalPage={blogs?.meta.totalPages} />
        </div>
    );
}

export default ManageBlog;
