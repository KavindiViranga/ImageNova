import React from 'react'
import { assets } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

const Description = () => {
  return (
    <motion.div 
    
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    
    className='flex flex-col items-center justify-center my-23 p-6 md:px-28'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-500 mb-8'>Turn Your Imagination Into Visuals</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg'></img>
            <div>
                <h2 className='text-3xl font-medium max-w-lg mb-4'>Meet Your AI-Powered Text to Image Generator</h2>
                <p className='text-gray-600 mb-4'>Easily bring your ideas to life by typing out your thoughts and descriptions. Watch as your words are instantly transformed into vibrant, 
                one-of-a-kind images. Experiment freely, explore your imagination, and create visuals that capture your ideas perfectly-all in just a few seconds.</p>
                <p className='text-gray-600 mb-4'>Simply type in a text prompt and and see AI magically turn it into a unique, vibrant image. Explore endless ideas, tweak the details, 
                and watch your imagination unfold instantly.</p>
            </div>
        </div>
    </motion.div>
  )
}

export default Description