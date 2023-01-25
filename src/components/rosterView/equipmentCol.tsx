import { Character, useAppSelector } from '../../state';
import { selectAccessToken } from '../../state/reducers/authSlice';
import { useGetEquipmentQuery } from '../../services/blizzardapi';
import './equipmentCol.css';

const EquipmentColumns: React.FC<{ character: Character }> = ({
    character,
}) => {
    const { _id, _equipmentHref, _embellished, _setBonus } = character;
    const accessToken = useAppSelector(selectAccessToken);

    const { fulfilledTimeStamp } = useGetEquipmentQuery(
        { href: _equipmentHref, accessToken, id: _id },
        { skip: !_equipmentHref }
    );

    const setBonuses = _setBonus?.map((set) => {
        return (
            <p className='tooltip' key={set.setId}>
                {set.setDisplayString ? set.setDisplayString[1] : ''}
                <span className='tooltiptext'>{set.bonuses}</span>
                <br></br>
            </p>
        );
    });

    const embellishments = _embellished?.map((emb) => {
        return (
            <p className='tooltip' key={emb.name}>
                {emb.name}
                <span className='tooltiptext'>{emb.description}</span>
                <br></br>
            </p>
        );
    });

    return (
        <>
            <td>{!fulfilledTimeStamp ? '' : setBonuses}</td>
            <td>{!fulfilledTimeStamp ? '' : embellishments}</td>
        </>
    );
};

export default EquipmentColumns;
