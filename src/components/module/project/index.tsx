'use client'
import React from 'react';
import { IProject } from '@/types';
import ProjectTable from './ProjectTable';

const ProjectsManage = ({ projects }: {
    projects: {
        data: IProject[],
    }

}) => {
    return (
        <div className=' px-4'>
            <ProjectTable projects={projects.data} />
        </div>
    );
}

export default ProjectsManage;
