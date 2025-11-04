'use client'

import Heading2 from '@/components/common/text/heading/Heading2'
import React from 'react'
import BlogGrid from './BlogGrid'
import useBlogApi from '@/redux/api/useBlogApi'
import { useRouter } from 'next/navigation'

const Blog = () => {
    const { blogData } = useBlogApi();
    const router = useRouter();

    if (blogData.length === 0) return null;

    return (
        <div className='w-full max-w-[1512px] mx-auto my-0 pt-24  mb-[60px] lg:mb-24 lg:px-9 '>
            <Heading2 className='w-full block px-4 lg:px-0'>Poslednje novosti</Heading2>
            <BlogGrid />
            <div className='mt-8 flex justify-center px-4' onClick={() => router.push('https://blog.3dpartshop.com/')}>
                <div className='px-4 transition-all font-bold text-lg w-full mt-6 md:w-fit bg-primary-500 hover:bg-primary-400 active:bg-primary-600 disabled:bg-[rgba(59,130,246,0.5)] disabled:text-neutral-400 py-3 rounded-lg flex justify-center items-center
        disabled:cursor-not-allowed cursor-pointer'>
                    Pogledaj sve
                </div>
            </div>
        </div>
    )
}

export default Blog