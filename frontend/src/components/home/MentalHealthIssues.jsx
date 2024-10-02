import React, { useEffect, useState } from 'react'
//import { Motion } from 'framer-motion'
import ArticleCard from '../articles/ArticleCard'
import adhd from '../../assets/adhd.jpg'
import anxiety from '../../assets/anxiety.jpg'
import depression from '../../assets/depression.jpg'
import sleepDisorder from '../../assets/sleepDisorder.jpg'
import { Link } from 'react-router-dom';
import { article_list } from '../../components/articles/articleArray';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MentalHealthIssues = () => {


    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2, // Trigger when 20% of the card is visible
        triggerOnce: false, // Only trigger the animation once
    });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut' },
            });
        } else {
            controls.start({
                opacity: 0,
                y: 50,
            });
        }
    }, [controls, inView]);



    const [slidePercentage, setSlidePercentage] = useState(100);

    useEffect(() => {
        const updateSlidePercentage = () => {
            if (window.innerWidth >= 650) {
                setSlidePercentage(50); // 2 cards for medium screens
            } else {
                setSlidePercentage(100); // 1 card for small screens
            }
        };

        window.addEventListener("resize", updateSlidePercentage);
        updateSlidePercentage(); // Initial check

        return () => window.removeEventListener("resize", updateSlidePercentage);
    }, []);



    return (
        <div className=' h-[600px] mx-auto bg-[#f6c899]'>
            <h1 className='text-5xl text-center pt-2 mb-12'>Mental Health Resources</h1>

            <div className=" lg:hidden">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop = {true}
                    showIndicators={false}
                    useKeyboardArrows
                    autoPlay={false}
                    centerMode={true}
                    centerSlidePercentage={slidePercentage}
                >

                    <div
                        className="p-4 flex justify-center gap-4"
                    >
                        <Link to={`/article/${article_list[0][0]}`} key={article_list[0][0]}>
                            <ArticleCard
                                title={'Depression'}
                                img={depression}
                                quote={'Even the darkest nights will end, and the sun will rise.'} />
                        </Link>
                    </div>

                    <div

                        className="p-4 flex justify-center gap-4"
                    >
                        <Link to={`/article/${article_list[1][0]}`} key={article_list[0][0]}>
                            <ArticleCard
                                title={'Anxiety'}
                                img={anxiety}
                                quote={'Anxiety is just a story you tell yourself; rewrite it.'} />
                        </Link>
                    </div>

                    <div
                        className="p-4 flex justify-center gap-4"
                    >
                        <Link to={`/article/${article_list[2][0]}`} key={article_list[0][0]}>
                            <ArticleCard
                                title={'ADHD'}
                                img={adhd}
                                quote={'Embrace your unique mind; it is your greatest strength.'} />
                        </Link>
                    </div>

                    <div
                        className="p-4 flex justify-center gap-4"
                    >

                        <Link to={`/article/${article_list[3][0]}`} key={article_list[0][0]}>
                            <ArticleCard
                                title={'Sleep Disorder'}
                                img={sleepDisorder}
                                quote={'Good sleep is the foundation of a good day.'} />
                        </Link>
                    </div>
                </Carousel>
            </div>


            <div className='hidden lg:flex  justify-center flex-row gap-4 '>
                {/* flex flex-row gap-4 md:grid grid-cols-2 lg:grid-cols-4 gap-4*/}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
                    animate={controls} // Animate based on scroll
                    className="p-4"
                >
                    <Link to={`/article/${article_list[0][0]}`} key={article_list[0][0]}>
                        <ArticleCard
                            title={'Depression'}
                            img={depression}
                            quote={'Even the darkest nights will end, and the sun will rise.'} />
                    </Link>
                </motion.div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
                    animate={controls} // Animate based on scroll
                    className="p-4"
                >
                    <Link to={`/article/${article_list[1][0]}`} key={article_list[0][0]}>
                        <ArticleCard
                            title={'Anxiety'}
                            img={anxiety}
                            quote={'Anxiety is just a story you tell yourself; rewrite it.'} />
                    </Link>

                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
                    animate={controls} // Animate based on scroll
                    className="p-4"
                >
                    <Link to={`/article/${article_list[2][0]}`} key={article_list[0][0]}>
                        <ArticleCard
                            title={'ADHD'}
                            img={adhd}
                            quote={'Embrace your unique mind; it is your greatest strength.'} />
                    </Link>
                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
                    animate={controls} // Animate based on scroll
                    className="p-4"
                >

                    <Link to={`/article/${article_list[3][0]}`} key={article_list[0][0]}>
                        <ArticleCard
                            title={'Sleep Disorder'}
                            img={sleepDisorder}
                            quote={'Good sleep is the foundation of a good day.'} />
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default MentalHealthIssues