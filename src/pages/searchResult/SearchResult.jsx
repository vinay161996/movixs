import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './SearchResult.scss'

import ContentWrapper from '../../component/ContentWrapper/ContentWrapper'
import noResults from '../../assets/no-results.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import Spinner from '../../component/spinner/Spinner'
import MovieCard from '../../component/movieCard/MovieCard'

const SearchResult = () => {

    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const { query } = useParams()

    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then(res => {
                setData(res);
                setPageNum(prev => prev + 1)
                setLoading(false)
            })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then(res => {
                if (data?.results) {
                    setData({
                        ...data, results: [...data?.results, ...res.results]
                    })
                } else {
                    setData(res)
                }
                setPageNum(prev => prev + 1)
            })

    }

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();

    }, [query])

    return (
        <div className='searchResultsPage'>
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data.results.length > 0 ? 'results' : 'result'} of ${query}`}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, ind) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={ind}
                                            mediaType={item.media_type}
                                            fromSearch={true}
                                            data={item} />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results Not Found
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    )
}

export default SearchResult
