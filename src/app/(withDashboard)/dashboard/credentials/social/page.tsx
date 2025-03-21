
import SocialLinks from '@/components/module/Credential/SocialLink';
import { getsocial } from '@/service/Credentials/social';
import React from 'react';

const BannerPage = async () => {
    const social = await getsocial()
    return (
        <div>
            <SocialLinks social={social} />
        </div>
    );
}

export default BannerPage;
