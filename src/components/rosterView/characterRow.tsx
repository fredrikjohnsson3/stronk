import { useEffect, useState } from 'react';
import { Character, useAppDispatch } from '../../state';
import { deleteCharacter } from '../../state/reducers/rosterSlice';
import EquipmentColumns from './equipmentCol';
import CharacterThumbnail from './characterThumbnail';
import RoleCol from './roleCol';
import ProfessionsCol from './professionsCol';
import MythicPlusCol from './mythicPlusCol';

const CharacterRow: React.FC<{ character: Character }> = ({ character }) => {
    const {
        _name,
        _realm,
        _class,
        _mainSpec,
        _currSpec,
        _mainIlvl,
        _currIlvl,
    } = character;

    const dispatch = useAppDispatch();

    const [characterSpec, setCharacterSpec] = useState('');
    const [characterIlvl, setCharacterIlvl] = useState('');

    useEffect(() => {
        if (!_mainSpec) {
            setCharacterSpec(`- (${_currSpec})`);
            if (!_currIlvl) return;
            setCharacterIlvl(`- (${_currIlvl})`);
            return;
        } else if (_mainSpec === _currSpec?.toLowerCase()) {
            setCharacterSpec(_mainSpec);
            if (!_mainIlvl) return;
            setCharacterIlvl(_mainIlvl.toString());
            return;
        }
        setCharacterSpec(`${_mainSpec} (${_currSpec})`);
        setCharacterIlvl(`${_mainIlvl} (${_currIlvl})`);
    }, [
        setCharacterSpec,
        setCharacterIlvl,
        _mainSpec,
        _mainIlvl,
        _currSpec,
        _currIlvl,
    ]);

    const onClick = () => {
        dispatch(deleteCharacter(character));
    };

    return (
        <tr>
            <CharacterThumbnail character={character} />
            <td>{_realm === 'Tarren Mill' ? _name : `${_name} - ${_realm}`}</td>
            <RoleCol character={character} />
            <td>{'' || _class}</td>
            <td>{'' || characterSpec}</td>
            <td>{'' || characterIlvl}</td>
            <EquipmentColumns character={character} />
            <MythicPlusCol character={character} />
            <ProfessionsCol character={character} />
            <td>
                <button onClick={onClick}>X</button>
            </td>
        </tr>
    );
};

export default CharacterRow;
