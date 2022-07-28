import CardContainer from '../components/explore-collections/CardContainer';
import Tab from '../components/explore-collections/Tab';
import OnlyHeaderLayout from '../components/layout/OnlyHeaderLayout';

export default function ExploreCollections() {
    return (
        <>
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

ExploreCollections.getLayout = function getLayout(page) {
    return <OnlyHeaderLayout>{page}</OnlyHeaderLayout>;
};
