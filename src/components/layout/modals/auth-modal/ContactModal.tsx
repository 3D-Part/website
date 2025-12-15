'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeIsContactModalVisible } from '@/redux/slices/ui/uiSlice';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react'
import { Path } from '../../header/hamburger/Hamburger';
import ContactFrom from './ContactFrom';

const ContactModal = () => {
    const isContactModalVisible = useAppSelector((state) => state.uiSlice.isContactModalVisible);
    const dispatch = useAppDispatch();

    return (
        <AnimatePresence mode="wait">
            {isContactModalVisible && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 100 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(17,17,17,0.78)] cursor-pointer min-w-[360px]  "
                        onClick={() => {
                            dispatch(changeIsContactModalVisible(false));
                        }}
                    ></motion.div>
                    <motion.div
                        initial={{ top: -500, opacity: 0 }}
                        animate={{ top: 0, opacity: 100 }}
                        exit={{ top: 500, opacity: 0, transition: { duration: 0.2 } }}
                        transition={{
                            type: "spring",
                            stiffness: 140,
                            duration: 0.4,
                            damping: 16,
                        }}
                        className="relative bg-[#1D1D1D] rounded-2xl max-w-[425px] min-w-[300px] mx-8 flex flex-col items-center gap-8 z-50 w-[425px] p-6 max-h-[calc(100vh-96px)] overflow-y-auto"
                    >
                        {/* ----------- */}
                        <Image
                            alt="3d part logo"
                            src={"/assets/img/logo.svg"}
                            width={138}
                            height={44}
                            priority
                            className=""
                        />

                        <motion.button
                            onClick={() => {
                                dispatch(changeIsContactModalVisible(false));
                            }}
                            className={`h-10 w-10 transition-all duration-500 absolute right-4 top-8 rounded-lg flex justify-center items-center`}
                            initial={"initial"}
                            animate={"open"}
                            variants={{
                                initial: { opacity: 0, scale: 0 },
                                open: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: { duration: 0.1 },
                                },
                            }}
                            aria-label="Menu"
                        >
                            <motion.div
                                whileHover={{
                                    rotate: 90,
                                    transition: { duration: 0.3, delay: 0, ease: "easeInOut" },
                                }}
                            >
                                <svg viewBox="0 0 21.5 20" className={`h-6 w-6`}>
                                    <Path
                                        variants={{
                                            open: { d: "M 3 16.5 L 17 2.5" },
                                        }}
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <Path
                                        d="M 2 9.423 L 20 9.423"
                                        variants={{
                                            open: { opacity: 0 },
                                        }}
                                        transition={{ duration: 0.1 }}
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <Path
                                        variants={{
                                            open: { d: "M 3 2.5 L 17 16.346" },
                                        }}
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </motion.div>
                        </motion.button>
                        {/* --------- */}


                        <ContactFrom />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default ContactModal