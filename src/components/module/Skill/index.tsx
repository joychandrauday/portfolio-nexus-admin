'use client'
import { Skill } from '@/types';
import React from 'react';
import SkillTable from './SkillTable';

const SkillSManage = ({ skills }: {
    skills: {
        data: Skill[],
    }
}) => {

    return (
        <div className=' px-4'>
            <SkillTable skills={skills.data} />
        </div>
    );
}

export default SkillSManage;
