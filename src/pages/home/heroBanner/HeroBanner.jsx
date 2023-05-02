import { useEffect, useState } from "react"
import "./HeroBanner.scss"
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../component/LazyLoadImg/Img";
import ContentWrapper from '../../../component/ContentWrapper/ContentWrapper'


const HeroBanner = () => {
    const [backGround, setBackGround] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch('/movie/upcoming')

    const url = useSelector(state => state.home.url);

    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackGround(bg)

    }, [data])

    const searchQueryHandle = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop-img">
                <Img src={backGround} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            type="text"
                            onKeyUp={searchQueryHandle}
                            placeholder="Search for a movie or tv show...."
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
