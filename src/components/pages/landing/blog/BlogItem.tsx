'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const BlogItem = ({ w, data }: { w?: number, data: any }) => {
    const router = useRouter();

    function formatSerbianDate(dateString: string) {
        const months = [
            "Januar", "Februar", "Mart", "April", "Maj", "Jun",
            "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    return (
        <article className={`bg-neutral-800 rounded-xl p-4 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-100 cursor-pointer`} style={{ minHeight: w ? `${w}px` : undefined }} onClick={() => { router.push(data.link) }}>
            <div className='pt-[70%] relative' style={{ backgroundImage: `url(${data._embedded?.['wp:featuredmedia']?.[0] ? data._embedded['wp:featuredmedia'][0].source_url : '/assets/img/test.png'})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            </div>

            <div className='flex flex-col gap-4 p-2'>
                {/* <div className=' flex gap-2 overflow-x-auto no_scrollbar'>
                    { }
                    <div className='rounded-md whitespace-nowrap bg-[#4b6bfb18] w-fit py-1 px-[10px] text-primary-400 text-sm font-medium'>3D printeri</div>
                    <div className='rounded-md whitespace-nowrap bg-[#4b6bfb18] w-fit py-1 px-[10px] text-primary-400 text-sm font-medium'>3D printeri</div>
                    <div className='rounded-md whitespace-nowrap bg-[#4b6bfb18] w-fit py-1 px-[10px] text-primary-400 text-sm font-medium'>3D printeri</div>
                    <div className='rounded-md whitespace-nowrap bg-[#4b6bfb18] w-fit py-1 px-[10px] text-primary-400 text-sm font-medium'>3D printeri</div>
                    <div className='rounded-md whitespace-nowrap bg-[#4b6bfb18] w-fit py-1 px-[10px] text-primary-400 text-sm font-medium'>3D printeri</div>
                </div> */}
                <div className='font-semibold text-2xl leading-7' dangerouslySetInnerHTML={{ __html: data.title.rendered }}></div>
                <div className='text-[#999]'>{formatSerbianDate(data.date)}</div>
            </div>
        </article>
    )
}

export default BlogItem