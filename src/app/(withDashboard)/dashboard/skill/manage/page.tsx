import SkillSManage from '@/components/module/Skill';
import { getSkills } from '@/service/Skill';
import React from 'react';

const ManageSkillPage = async () => {
    const data = await getSkills()
    console.log(data);
    return (
        <div>
            <SkillSManage skills={data} />
        </div>
    );
}

export default ManageSkillPage;
