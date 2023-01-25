import { Fragment } from 'react';
import { useAppSelector } from '../state';
import { selectCardData, selectCardOrder } from '../state/reducers/cardsSlice';
import AddCardMenu from './addCardMenu';
import CardItem from './cardItem';

const Cards: React.FC = () => {
    const cardOrder = useAppSelector(selectCardOrder);
    const cardData = useAppSelector(selectCardData);

    const cards = cardOrder.map((id) => {
        return cardData[id];
    });

    const renderedCards = cards.map((card) => (
        <Fragment key={card.id}>
            <CardItem card={card} />
            <AddCardMenu previousCardId={card.id} />
        </Fragment>
    ));

    return (
        <div>
            <AddCardMenu
                forceVisible={cards.length === 0}
                previousCardId={null}
            />
            {renderedCards}
        </div>
    );
};

export default Cards;

// resizable draggable cards, menu that shows when you hold and drag a window like in windows to attach apps to diffrent parts of the screen. fullwidth, 2-split, 3-split
