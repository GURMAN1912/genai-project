import React from 'react'
import { article_list } from './articleArray';
import { Link } from 'react-router-dom';

const ArticleCard = ({title , img, quote}) => {
  return (
    <div className='flex flex-col rounded-[25px] w-[280px] shadow-2xl cursor-pointer bg-white py-10 px-5 border-2 border-transparent hover:border-[#d5812d] hover:text-[#c7721d]'>
                <div className='items-center '>
                    <img src={img} className='rounded-full w-48 h-48 mx-auto' />
                </div>
                <p className='text-center mt-6 text-2xl font-serif font-semibold'>{title}</p>
                <p className='text-center text-base font-serif font-normal text-gray-600'>{quote}</p>
  </div>
  )}

export default ArticleCard