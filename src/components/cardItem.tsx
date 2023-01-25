import { Card } from '../state';
import RosterCard from './rosterView/rosterCard';

interface CardItemProps {
    card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
    let child: JSX.Element;
    switch (card.type) {
        case 'blizz':
            child = (
                <div className='card-item'>
                    <RosterCard />
                </div>
            );
            return child;
        case 'rio':
            child = <div className='card-item'>{/* <RioCard />  */}</div>;
            return child;
        default:
            return <></>;
    }
};

export default CardItem;
