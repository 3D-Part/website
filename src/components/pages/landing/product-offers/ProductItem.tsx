'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface IProductItem {
    image: string;
    heading: string;
    content: string;
    link: string;
    background: string;
}

const backgroundMap: Record<string, string> = {
    'primary-50': 'bg-primary-50',
    'lightBlue': 'bg-lightBlue'
}

const ProductItem: React.FC<IProductItem> = ({ image, heading, content, link, background }) => {
    const navigation = useRouter();

    const navigate = () => {
        navigation.push(link)
    }


    return (
        <div className={`${backgroundMap[background]} p-6 rounded-2xl max-w-[380px] lg:flex lg:w-1/2 lg:max-w-none lg:gap-8`
        }>
            <div className='h-64 rounded-lg flex flex-col lg:w-[45%]'>
                <Image src={image} alt='filament-image' width={0} height={0} sizes='100vw' className='w-full h-full object-contain lg:object-cover rounded-lg' />
            </div>
            <div className='text-[#101010] flex flex-col lg:justify-between gap-4 mt-2 lg:w-[55%]'>
                <div className='text-3xl font-bold'>{heading}</div>
                <div className=''>{content}</div>
                <div onClick={navigate} className='border border-black w-fit py-3 pl-6 pr-5 rounded-lg flex items-center gap-2 font-semibold hover:scale-105 cursor-pointer transition-transform duration-500 ease-in-out'>Pogledaj ponudu <span><Image width={24} height={24} src={'/assets/img/arrow.svg'} alt='arrow-icon' /></span></div>
            </div>
        </div >
    )
}

export default ProductItem