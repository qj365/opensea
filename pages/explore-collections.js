import CardContainer from '../components/explore-collections/CardContainer';
import Tab from '../components/explore-collections/Tab';
import Header from '../components/Header';

export default function ExploreCollections() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <h1 className="text-white text-[40px] font-semibold text-center mt-[67px] mb-[27px]">
                    Explore Collections
                </h1>
                <Tab />
                <CardContainer />
            </div>
        </>
    );
}
