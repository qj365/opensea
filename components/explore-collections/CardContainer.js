import Card from './Card';

function CardContainer() {
    return (
        <div className="flex flex-wrap py-10 w-full justify-evenly max-w-[1462px]">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    );
}

export default CardContainer;
