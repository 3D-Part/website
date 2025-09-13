import React from "react";

interface FreeDeliveryProgressProps {
    currentAmount: number; // Current cart total
    freeDeliveryThreshold: number; // Amount needed for free delivery
}

const FreeDeliveryProgress: React.FC<FreeDeliveryProgressProps> = ({
    currentAmount,
    freeDeliveryThreshold,
}) => {
    const progress = Math.min((currentAmount / freeDeliveryThreshold) * 100, 100);
    const remaining = Math.max(freeDeliveryThreshold - currentAmount, 0);

    return (
        <div className="w-full pt-7 px-4 rounded-2xl ">
            <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden animate-progress-bar">
                <div
                    className="h-full bg-gradient-to-r from-primary-400 to-green-600 rounded-full transition-[width] duration-700 ease-out "
                    style={{
                        width: `${progress}%`,
                        transform: progress === 100 ? "scaleX(1.05)" : "scaleX(1)",
                        transformOrigin: "left center",
                        transition: "width 0.7s ease-out, transform 0.3s ease-in-out",
                    }}
                />
            </div>

            <div className={`flex ${currentAmount < freeDeliveryThreshold ? "justify-between" : "justify-center"} text-sm mt-2 text-gray-600`}>
                {currentAmount < freeDeliveryThreshold && <span>{currentAmount.toFixed(2)}{`KM`}</span>}
                <p className="text-sm px-4 font-semibold text-center">
                    {remaining > 0
                        ? `${remaining.toFixed(2)} do besplate dostave!`
                        : "Besplatna dostava!"}
                </p>
                {currentAmount < freeDeliveryThreshold && <span>{freeDeliveryThreshold.toFixed(2)}{`KM`}</span>}
            </div>
        </div>
    );
};

export default FreeDeliveryProgress;
