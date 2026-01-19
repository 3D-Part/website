import React, { useEffect, useState } from 'react';
import Paragraph from '@/components/common/text/paragraph/Paragraph';
import { usePathname } from 'next/navigation';
import { CategoryAttributesInterface } from '@/shared/interfaces/categoryInterface';

interface FilterValue {
    text?: string;
    select?: string;
    range?: { min: string; max: string };
    boolean?: boolean;
}

const Categories = ({
    filterByProductAttributes,
    setFilterByProductAttributes,
    categoryAttributes
}: {
    filterByProductAttributes: string | undefined;
    setFilterByProductAttributes: (x: string | undefined) => void;
    categoryAttributes: Array<CategoryAttributesInterface>;
}) => {
    const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>({});
    const pathname = usePathname();

    // Reset filters if path changes
    useEffect(() => {
        setFilterValues({});
    }, [pathname]);

    // Reset local state when parent clears filters
    useEffect(() => {
        if (filterByProductAttributes === undefined) {
            setFilterValues({});
        }
    }, [filterByProductAttributes]);

    // Update parent whenever local input changes
    useEffect(() => {
        const activeFilters: any[] = [];

        Object.entries(filterValues).forEach(([attributeId, filterValue]) => {
            if (filterValue.text && filterValue.text.trim()) {
                activeFilters.push({
                    attributeId,
                    value: filterValue.text
                });
            } else if (filterValue.select && filterValue.select.trim()) {
                activeFilters.push({
                    attributeId,
                    value: filterValue.select
                });
            } else if (filterValue.range) {
                const { min, max } = filterValue.range;
                const filterObj: any = { attributeId };

                if (min && min.trim()) {
                    filterObj.gt = parseFloat(min);
                }
                if (max && max.trim()) {
                    filterObj.lt = parseFloat(max);
                }

                if (filterObj.gt !== undefined || filterObj.lt !== undefined) {
                    activeFilters.push(filterObj);
                }
            } else if (filterValue.boolean !== undefined) {
                activeFilters.push({
                    attributeId,
                    value: filterValue.boolean
                });
            }
        });

        if (activeFilters.length > 0) {
            setFilterByProductAttributes(JSON.stringify(activeFilters));
        } else {
            setFilterByProductAttributes(undefined);
        }
    }, [filterValues, setFilterByProductAttributes]);

    const handleTextChange = (attributeId: string, value: string) => {
        setFilterValues(prev => ({
            ...prev,
            [attributeId]: { text: value }
        }));
    };

    const handleSelectChange = (attributeId: string, value: string) => {
        setFilterValues(prev => ({
            ...prev,
            [attributeId]: { select: value }
        }));
    };

    const handleRangeChange = (attributeId: string, type: 'min' | 'max', value: string) => {
        setFilterValues(prev => {
            const current = prev[attributeId]?.range || { min: '', max: '' };
            return {
                ...prev,
                [attributeId]: {
                    range: {
                        ...current,
                        [type]: value
                    }
                }
            };
        });
    };

    const handleBooleanChange = (attributeId: string, value: boolean) => {
        setFilterValues(prev => ({
            ...prev,
            [attributeId]: { boolean: value }
        }));
    };

    const renderFilter = (item: CategoryAttributesInterface) => {
        const attributeId = item.attributeId;
        let type = (item as any).attribute.type || 'input'; // Default to input if no type specified


        switch (type) {
            case 'input':
                return (
                    <input
                        id={attributeId}
                        type="text"
                        placeholder={`Filter by ${item.attribute.name}...`}
                        value={filterValues[attributeId]?.text || ''}
                        onChange={(e) => handleTextChange(attributeId, e.target.value)}
                        className="bg-neutral-700 h-8 w-full rounded-lg px-3 
                                   focus:ring-primary-600 focus:border-primary-400 block 
                                   dark:bg-black dark:border-neutral-800 dark:text-white 
                                   dark:focus:ring-primary-400 dark:focus:border-primary-400 
                                   placeholder-neutral-400 text-sm"
                    />
                );

            case 'select':
                const options = ((item as any).attribute.productAttributes || [])
                    .filter((attr: any, i: number, arr: any[]) =>
                        arr.findIndex(a => a.value === attr.value) === i
                    );

                return (
                    <select
                        id={attributeId}
                        value={filterValues[attributeId]?.select || ''}
                        onChange={(e) => handleSelectChange(attributeId, e.target.value)}
                        className="bg-neutral-700 h-8 w-full rounded-lg px-3 
                                   focus:ring-primary-600 focus:border-primary-400 block 
                                   dark:bg-black dark:border-neutral-800 dark:text-white 
                                   dark:focus:ring-primary-400 dark:focus:border-primary-400 
                                   text-sm"
                    >
                        <option value="">Select...</option>
                        {options.map((option: { value: string }) => (
                            <option key={option.value} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                );

            case 'range':
                const min = filterValues[attributeId]?.range?.min || '';
                const max = filterValues[attributeId]?.range?.max || '';
                return (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={min}
                            onChange={(e) => handleRangeChange(attributeId, 'min', e.target.value)}
                            className="bg-neutral-700 h-8 w-full rounded-lg px-3 
                                       focus:ring-primary-600 focus:border-primary-400 block 
                                       dark:bg-black dark:border-neutral-800 dark:text-white 
                                       dark:focus:ring-primary-400 dark:focus:border-primary-400 
                                       placeholder-neutral-400 text-sm"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={max}
                            onChange={(e) => handleRangeChange(attributeId, 'max', e.target.value)}
                            className="bg-neutral-700 h-8 w-full rounded-lg px-3 
                                       focus:ring-primary-600 focus:border-primary-400 block 
                                       dark:bg-black dark:border-neutral-800 dark:text-white 
                                       dark:focus:ring-primary-400 dark:focus:border-primary-400 
                                       placeholder-neutral-400 text-sm"
                        />
                    </div>
                );

            case 'bool':
                const isChecked = filterValues[attributeId]?.boolean || false;
                return (
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => handleBooleanChange(attributeId, e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`block w-10 h-6 rounded-full transition ${isChecked ? 'bg-primary-500' : 'bg-neutral-600'
                                }`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isChecked ? 'transform translate-x-4' : ''
                                }`}></div>
                        </div>
                        <span className="ml-3 text-sm text-neutral-300">
                            {isChecked ? 'Yes' : 'No'}
                        </span>
                    </label>
                );

            default:
                return null;
        }
    };

    if (categoryAttributes.length === 0 || pathname === '/shop/all' /*|| !categoryAttributes.some(attr => attr.attribute.type) */) return null;

    return (
        <div className="flex flex-col gap-4">
            <Paragraph size="L" weight="Bold" className="mb-1">
                Atributi
            </Paragraph>

            {categoryAttributes/*.filter(attr => attr.attribute.type)*/.map((item) => (
                <div key={item.id} className="flex flex-col gap-1">
                    <label
                        htmlFor={item.attributeId}
                        className="text-sm font-medium text-white dark:text-neutral-300"
                    >
                        {item.attribute.name}
                    </label>

                    {renderFilter(item)}
                </div>
            ))}
        </div>
    );
}

export default Categories;