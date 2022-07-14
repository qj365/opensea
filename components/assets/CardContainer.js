import CardVertical from '../common/CardVertical';

function CardContainer() {
    return (
        <div className="flex flex-wrap justify-around">
            <CardVertical />
            <CardVertical />
            <CardVertical />
            <CardVertical />
            <CardVertical />
            <CardVertical />
        </div>
    );
}

export default CardContainer;
