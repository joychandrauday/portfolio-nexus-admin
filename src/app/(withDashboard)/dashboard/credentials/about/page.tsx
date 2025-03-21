import AboutManagement from '@/components/module/Credential/AboutManagement';
import { getabout } from '@/service/Credentials/about';
import React from 'react';

const AboutPage = async () => {
    const data = await getabout()
    return (
        <div>
            <AboutManagement about={data} />
        </div>
    );
}

export default AboutPage;
