import React, { useState, useRef, useEffect } from 'react';

function Cards({ id, img, price, name, description }) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <article
                onClick={() => setIsOpen(true)}
                className="cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden shadow-md"
            >
                <img alt="" src={ "images/coffe.jpeg"} className="object-cover w-full h-40" />
                <div className="flex flex-col flex-1 p-3">
                    <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
                    <p className="text-xs text-gray-500">{description}</p>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-black">{price} Azn</span>
                    </div>
                </div>
            </article>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center shadow-[0_2px_8px_#91966050]">
                    <div
                        ref={modalRef}
                        className="bg-white w-ful shadow-[0_2px_8px_#91966050] sm:max-w-md sm:rounded-xl rounded-t-2xl p-3 sm:p-6 relative
                                   animate-slide-up sm:animate-none sm:translate-y-0"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-4 text-white hover:text-red-500 text-3xl"
                        >
                            &times;
                        </button>
                        <img src={ "images/coffe.jpeg"} alt={name} className="w-full h-80 object-cover rounded-md" />
                        <h2 className="text-xl font-bold mt-4">{name}</h2>
                        <p className="text-sm text-gray-600 mt-2">{description}</p>
                        <div className="text-lg font-semibold text-black mt-4">{price} Azn</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cards;
