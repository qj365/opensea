import Assets from '../components/assets/Assets';
import Filter from '../components/assets/Filter';
import Header from '../components/Header';

export default function Assests() {
    return (
        <>
            <Header />
            <div className="flex px-[22px] pt-2">
                <Filter />
                <Assets />
            </div>
        </>
    );
}
