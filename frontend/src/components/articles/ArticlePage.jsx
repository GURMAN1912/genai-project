import React from 'react'
import { article_list } from './articleArray';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArticlePage = () => {

    const { id } = useParams(); // Get the ID from the URL

    // Find the corresponding item in the data array using the ID
    const item = article_list.find((entry) => entry[0] === parseInt(id));

    const parts = item[2].split('///');


    const pageVariants = {
      hidden: {
        opacity: 0,
        y: 50, // Move the content down by 50px
      },
      visible: {
        opacity: 1,
        y: 0, // Move back to the original position
        transition: {
          duration: 0.8, // Animation duration
          ease: 'easeOut', // Easing for smoothness
        },
      },
    };
  

  return (
    <div className=' p-10 md:px-56 bg-[#fef4ee] font-serif'>
        <motion.div
      initial="hidden" // Initial state when page reloads
      animate="visible" // Final state after animation
      variants={pageVariants} // The variants object controlling the animation
    >
        <div className='flex flex-col my-6 text-black'>
            <h1 className='m-10 ml-0 text-6xl font-abold font-serif'>{item[1]}</h1>
            <div className='w-full'>
                <img className='md:w-[700px] aspect-w-16 aspect-h-9 mx-auto rounded-2xl' src={item[4]} alt="" />
            </div>
            <div className='my-6 leading-8'>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                    {part}
                    {index < parts.length - 1 && <div><br/></div>}
                    </React.Fragment>
                ))}
            </div>
            <div className='flex justify-center'>
            <a href={item[3]} target="_blank" rel="noopener noreferrer"
                className='hover:underline hover:text-[#b53b30]'>
                Read more on Harvard Site.</a> </div>
        </div>
        </motion.div>
    </div>
  )
}

export default ArticlePage