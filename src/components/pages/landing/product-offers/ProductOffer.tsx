import React from 'react'
import ProductItem from './ProductItem'
import { HomeTile, getHomeTiles } from './homeTiles'

const BACKGROUNDS = ['primary-50', 'lightBlue']
const DEFAULT_PICTURES: Record<string, string> = {
    filaments: '/assets/img/product/filament.png',
    printers: '/assets/img/product/printer.png',
}

const ProductOffer = async () => {
    const tiles: HomeTile[] = await getHomeTiles()
    return (
        <div className='w-full max-w-[1440px] px-8 pb-24 pt-16 flex flex-col gap-8 items-center lg:flex-row 2xl:px-0 lg:items-stretch lg:justify-between'>
            {tiles.map((tile, index) => (
                <ProductItem
                    key={tile.id}
                    image={tile.image ? `${process.env.NEXT_PUBLIC_AMAZON_IMAGES}/${tile.image}` : DEFAULT_PICTURES[tile.id] ?? DEFAULT_PICTURES.filaments}
                    heading={tile.title}
                    content={tile.text}
                    buttonLabel={tile.buttonLabel || 'Pogledaj ponudu'}
                    link={tile.link}
                    background={BACKGROUNDS[index % BACKGROUNDS.length]}
                />
            ))}
        </div>
    )
}

export default ProductOffer
