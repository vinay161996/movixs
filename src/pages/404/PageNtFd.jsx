import './PageNtFd.scss';
import ContentWrapper from '../../component/ContentWrapper/ContentWrapper';

const PageNtFd = () => {
    return (
        <div className="pageNotFound" >
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default PageNtFd;
