'use client'

import useSettingsApi from '@/redux/api/useSettingsApi'
import React, { useEffect, useRef, useState } from 'react'

const YellowStripe = () => {
    const { settings } = useSettingsApi();
    const [text, setText] = useState('');
    const textRef = useRef<HTMLSpanElement | null>(null);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
        if (settings?.settings?.banner?.text?.length) {
            setText(settings.settings.banner.text);
        }
    }, [settings]);

    useEffect(() => {
        if (textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, [text]);

    // adjust scroll speed based on text length
    useEffect(() => {
        if (textWidth > 0) {
            const duration = Math.max(10, textWidth / 50); // speed factor
            document.documentElement.style.setProperty('--marquee-duration', `${duration}s`);
        }
    }, [textWidth]);

    if (!text) return null;

    return (
        <div className="h-10 lg:h-14 bg-secondary-500 text-black w-full overflow-hidden sticky top-0 lg:top-[85px] z-10 flex items-center">
            <div
                className="flex whitespace-nowrap text-xl w-full font-bold animate-marquee"
                style={
                    {
                        // ✅ safely define CSS variable
                        ['--text-width' as any]: `${textWidth}px`,
                    } as React.CSSProperties
                }
            >
                <span ref={textRef} className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
                <span className="px-8 whitespace-pre">{text}</span>
            </div>
        </div>
    )
}

export default YellowStripe
