'use client'

import useBlogApi from '@/redux/api/useBlogApi';
import useSettingsApi from '@/redux/api/useSettingsApi';
import React, { useEffect } from 'react'

const NonRendableComponent = () => {
    const { fetchSettings } = useSettingsApi();
    const { fetchBlog } = useBlogApi();

    useEffect(() => {
        fetchSettings();
        fetchBlog();
    }, [])

    return <></>;

}

export default NonRendableComponent