import ProjectsManage from '@/components/module/project';
import { getProjects } from '@/service/project';

const ManageBlogPage = async () => {
    const data = await getProjects()
    return (
        <div>
            <ProjectsManage projects={data} />
        </div>
    );
}

export default ManageBlogPage;
