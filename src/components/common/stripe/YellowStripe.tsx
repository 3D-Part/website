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

    // sticks right under the header on every screen: the header's height
    // changes with the screen (search row on mobile), so it is measured
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        const header = document.querySelector('header');
        if (!header) return;
        const measure = () => setHeaderHeight(header.getBoundingClientRect().height);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(header);
        return () => observer.disconnect();
    }, []);

    // adjust scroll speed based on text length
    useEffect(() => {
        if (textWidth > 0) {
            const duration = Math.max(10, textWidth / 50); // speed factor
            document.documentElement.style.setProperty('--marquee-duration', `${duration}s`);
        }
    }, [textWidth]);

    if (!text) return null;

    return (
        <div
            className="h-10 lg:h-14 bg-secondary-500 text-black w-full overflow-hidden sticky z-40 flex items-center"
            style={{ top: headerHeight }}
        >
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
