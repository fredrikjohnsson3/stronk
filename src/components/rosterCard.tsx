import { Fragment } from 'react';
import { useAppSelector } from '../state';
import { selectRosterUpdatedAt } from '../state/reducers/rosterSlice';
import AddCharacter from './addCharacter';
import CharacterRow from './rosterView/characterRow';

const RosterCard: React.FC = () => {
    const rosterUpdatedAt = useAppSelector(selectRosterUpdatedAt);

    const characters = useAppSelector(({ roster: { order, data } }) => {
        return order.map((id) => {
            return data[id];
        });
    });

    const renderedRows = characters.map((character) => (
        <Fragment key={character._id}>
            <CharacterRow character={character} />
        </Fragment>
    ));

    return (
        <div>
            {rosterUpdatedAt}
            <table>
                <thead />
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Class</th>
                        <th>Spec</th>
                        <th>ilvl</th>
                        <th></th>
                        <th>set</th>
                        <th>embelish</th>
                        <th>rio</th>
                        <th>professions</th>
                    </tr>
                    {renderedRows}
                </tbody>
            </table>
            <AddCharacter />
        </div>
    );
};

export default RosterCard;
