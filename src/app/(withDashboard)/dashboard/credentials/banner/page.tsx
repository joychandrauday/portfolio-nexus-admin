import BannerComponent from '@/components/module/Credential/BannerManagement';
import { getBanner } from '@/service/Credentials/banner';
import React from 'react';

const BannerPage = async () => {
    const banner = await getBanner() || {
        title: "",
        subtitle: "",
        bannerImage: "",
        designations: [],
        designationPretext: ""
    };

    return (
        <div>
            <BannerComponent banner={{ ...banner, designations: banner.designations || [] }} />
        </div>
    );
}


export default BannerPage;
