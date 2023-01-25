import { useAppDispatch } from '../state';
import { addCard } from '../state/reducers/cardsSlice';

interface AddCardMenuProps {
    forceVisible?: boolean;
    previousCardId: string | null;
}

const AddCardMenu: React.FC<AddCardMenuProps> = ({
    forceVisible,
    previousCardId,
}) => {
    const dispatch = useAppDispatch();

    const onRosterClick = () => {
        dispatch(addCard({ type: 'blizz', previousCardId }));
    };

    const onRioClick = () => {
        dispatch(addCard({ type: 'rio', previousCardId }));
    };

    return (
        <div className={`add-card ${forceVisible && 'force-visible'}`}>
            <div className='add-button'>
                <button
                    className='button is-rounded is-primary is-small'
                    onClick={onRosterClick}
                >
                    <span className='icon is-small'>
                        <i className='fas fa-plus' />
                    </span>
                    <span>Roster</span>
                </button>
                <button
                    className='button is-rounded is-primary is-small'
                    onClick={onRioClick}
                >
                    <span className='icon is-small'>
                        <i className='fas fa-plus' />
                    </span>
                    <span>Rio</span>
                </button>
            </div>
            <div className='divider' />
        </div>
    );
};

export default AddCardMenu;
