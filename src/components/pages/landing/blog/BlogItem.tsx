import Image from 'next/image'
import React from 'react'

const BlogItem = ({ w }: { w?: number }) => {
    return (
        <div className={`bg-neutral-800 rounded-xl p-4 flex flex-col gap-4`} style={{ minHeight: w ? `${w}px` : undefined }}>
            <div className='pt-[55.17%] relative'>
                <Image width={0} height={0} sizes='100vw' src={'/assets/img/test.png'} alt='blog-image' className='w-full absolute top-0' />
            </div>

            <div className='flex flex-col gap-4 p-2'>
                <div className=''>
                    <div className='rounded-md bg-[#4b6bfb18] w-fit py-1 px-[10px] text-primary-400 font-medium'>3D printeri</div>
                </div>
                <div className='font-semibold text-2xl leading-7'>Uticaj 3D štampe na industriju: Kako tehnologija menja budućnost proizvodnje</div>
                <div className='text-[#999]'>Novembar 14, 2024</div>
            </div>
        </div>
    )
}

export default BlogItem