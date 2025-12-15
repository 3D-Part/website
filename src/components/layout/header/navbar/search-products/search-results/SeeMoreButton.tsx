'use client'

import React from 'react'

const SeeMoreButton = ({ search }: { search: string }) => {
    const seeMoreProducts = () => {
        window.location.href = `/shop/all?search=${encodeURIComponent(search)}`;
    }

    return (
        <div className="w-full flex justify-center">
            <button
                type="button"
                onClick={seeMoreProducts}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-exo2 font-semibold transition-colors"
            >
                Pogledajte još
            </button>
        </div>
    )
}

export default SeeMoreButton