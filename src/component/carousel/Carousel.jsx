import './Carousel.scss'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import Img from '../LazyLoadImg/Img';
import PosterFallBack from '../../assets/no-poster.png'
import { useRef } from 'react';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';


const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef()
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div ref={carouselContainer} className='carousel' >
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className='carouselLeftNav arrow'
                    onClick={() => navigation('left')}
                />
                <BsFillArrowRightCircleFill
                    className='carouselRightNav arrow'
                    onClick={() => navigation('right')}
                />
                {!loading ? (
                    <div ref={carouselContainer} className="carouselItems">
                        {data?.map(item => {
                            const posterurl = item.poster_path ? (url.poster + item.poster_path) : PosterFallBack;

                            return <div onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)} key={item.id} className="carouselItem">
                                <div className="posterBlock">
                                    <Img src={posterurl} />
                                    <CircleRating rating={item.vote_average.toFixed(1)} />
                                    <Genres data={item.genre_ids.slice(0, 2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_date).format("MMM D,YYYY")}
                                    </span>
                                </div>
                            </div>
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel
