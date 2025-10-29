'use client'

import useSettingsApi from '@/redux/api/useSettingsApi';
import React, { useEffect } from 'react'

const NonRendableComponent = () => {
    const { fetchSettings } = useSettingsApi();

    useEffect(() => {
        fetchSettings();
    }, [])

    return <></>;

}

export default NonRendableComponent