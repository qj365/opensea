import Assets from '../../components/assets/Assets';
import Filter from '../../components/common/Filter';
import OnlyHeaderLayout from '../../components/layout/OnlyHeaderLayout';

export default function Assests() {
    return (
        <>
            <div className="flex px-[22px] pt-2">
                <Filter />
                <Assets />
            </div>
        </>
    );
}

Assests.getLayout = function getLayout(page) {
    return <OnlyHeaderLayout>{page}</OnlyHeaderLayout>;
};
