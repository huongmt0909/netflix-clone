import useWindowDimensions from '../../../hooks/useWindowDimensions'
import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import './style.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const MovieRow = ({ title, movies, handleSelectMovie }) => {
    const [windowDimensions] = useWindowDimensions()
    const { width } = windowDimensions

    return (
        <>
            <h1 className='movie-row_heading'>{title}</h1>
            <Swiper
                className='movie-row_container'
                navigation={true}
                loop={true}
                loopAdditionalSlides={
                    width >= 1378 ? 5 : width >= 998 ? 3 : width >= 625 ? 2 : 2
                }
                breakpoints={{
                    1378: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    998: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    625: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    0: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                }}
                preventClicksPropagation={true}
                preventClicks={true}
                scrollbar={{ draggable: false, hide: true }}
                slideToClickedSlide={false}
                pagination={true}
            >
                {movies &&
                    movies.map((movie) => {

                        return (
                            <SwiperSlide
                                onClick={() => handleSelectMovie(movie)}
                                key={movie.id}
                                className={"movie-row_item"}

                            >
                                <img
                                    src={movie.image}
                                    className='movie-row_image'
                                />
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </>
    )
}

export default MovieRow
