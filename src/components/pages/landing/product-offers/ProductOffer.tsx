import React from 'react'
import ProductItem from './ProductItem'

const ProductOffer = () => {
    return (
        <div className='w-full max-w-[1440px] px-8 pb-24 pt-16 flex flex-col gap-8 items-center lg:flex-row 2xl:px-0 lg:items-stretch lg:justify-between'>
            <ProductItem image='/assets/img/product/filament.png' heading='3D filamenti' content='Pronađite savršeni filament za vaše 3D projekte! Bilo da radite sa PLA, ABS ili TPU, kvalitetan materijal je ključ za vrhunske rezultate. Eksperimentišite i kreirajte bez ograničenja!' link='/shop/category/filamenti' background='primary-50' />

            <ProductItem image='/assets/img/product/printer.png' heading='3D printeri' content='Otključajte svijet mogućnosti uz vrhunske 3D štampače! Preciznost, pouzdanost i lakoća korišćenja za svaki vaš projekat. Kreirajte budućnost već danas!' link='/shop/category/3d-printeri' background='lightBlue' />
        </div>
    )
}

export default ProductOffer