import React, { useEffect, useState } from 'react'
import { categoriesServices } from '../../../../../../../services/categoriesServices';
import Paragraph from '@/components/common/text/paragraph/Paragraph';
import { usePathname } from 'next/navigation';
import { IProductAttribute } from '@/shared/types';

const Categories = ({ filterByProductAttributes,
    setFilterByProductAttributes }: {
        filterByProductAttributes: string | undefined;
        setFilterByProductAttributes: (x: string | undefined) => void;
    }) => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [productAttributes, setProductAttributes] = useState<Array<IProductAttribute>>([]);
    const pathname = usePathname();

    const getCategories = async () => {
        try {
            const data = await categoriesServices.getAllProductAttributes();

            setProductAttributes(data.rows);
        } catch (err) {

        }
    };
    useEffect(() => {
        getCategories();
    }, []);

    if (productAttributes.length === 0 || pathname !== '/shop/all') return null;

    return (
        <div>
            <Paragraph size="L" weight="Bold" className="mb-1">
                Atributi
            </Paragraph>

            <select
                onChange={(event) => {
                    console.log(event.target);
                    setFilterByProductAttributes(event.target.value === "Sve kategorije" ? undefined : event.target.value);
                    setSelected(event.target.value === "Sve kategorije" ? undefined : event.target.value);
                }}
                className="bg-neutral-700 h-8 w-[174px] rounded-lg px-3 focus:ring-primary-600 focus:border-primary-400 block dark:bg-black dark:border-black dark:placeholder-bg-success-400 dark:text-white dark:focus:ring-error-400 dark:focus:border-success-100 select"
                value={selected}
            >
                <option key="all-categories" value={undefined}>Sve kategorije</option>
                {productAttributes.map((productAttr, index) => (
                    <option key={`${productAttr.attribute.id}-${index}`} value={productAttr.attribute.name}>{productAttr.attribute.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Categories