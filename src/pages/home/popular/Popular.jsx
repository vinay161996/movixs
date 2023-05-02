import { useState } from "react"
import ContentWrapper from "../../../component/ContentWrapper/ContentWrapper"
import SwitchTabs from "../../../component/switchTabs/SwitchTabs"
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../component/carousel/Carousel"


const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/popular`)
    const onTabChange = (item) => {
        setEndpoint(item === 'Movies' ? "movie" : "tv")
    }

    return (
        <div className="carouselSection" >
            <ContentWrapper>
                <span className="carouselTitle">
                    What's Popular
                </span>
                <SwitchTabs data={['Movies', "Tv Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    )
}

export default Popular

