import { MdRefresh } from 'react-icons/md';
import CardContainer from './CardContainer';

function Assets() {
    return (
        <div className="flex flex-col w-3/4">
            <div className="flex items-center mb-[10px]">
                <button className="h-12 p-3 mr-2 outline-none hover:bg-[#4c505c66] hover:rounded-[50%]">
                    <MdRefresh className="text-white text-2xl" />
                </button>
                <p className="text-white text-base">46.608.776 items</p>
            </div>
            <CardContainer />
        </div>
    );
}

export default Assets;
