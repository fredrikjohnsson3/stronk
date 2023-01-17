import { useState, useEffect } from 'react';
import { Character, useAppSelector } from '../../state';
import { selectAccessToken } from '../../state/reducers/authSlice';
import { useGetEquipmentQuery } from '../../services/blizzardapi';
import './equipmentCol.css';

const EquipmentColumns: React.FC<{ character: Character }> = ({
    character,
}) => {
    const { _id, _equipmentHref, _embellished, _setBonus } = character;

    const accessToken = useAppSelector(selectAccessToken);

    const [getEquipment, setGetEquipment] = useState(false);
    const [isEquipment, setIsEquipment] = useState(false);

    const { fulfilledTimeStamp } = useGetEquipmentQuery(
        { href: _equipmentHref, accessToken, id: _id },
        { skip: !_equipmentHref || !getEquipment }
    );

    const handleClick = () => {
        if (!getEquipment) setGetEquipment(true);
    };

    useEffect(() => {
        if (!fulfilledTimeStamp) return;
        setIsEquipment(true);
    }, [fulfilledTimeStamp]);

    const setBonuses = _setBonus?.map((set) => {
        return (
            <p className='tooltip' key={set.setId}>
                {set.setId}
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
            <td>
                <button onClick={handleClick}>E</button>
            </td>
            <td>{!isEquipment ? '' : setBonuses}</td>
            <td>{!isEquipment ? '' : embellishments}</td>
        </>
    );
};

export default EquipmentColumns;
