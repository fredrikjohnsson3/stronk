import { Fragment } from 'react';
import { useGetProfessionsQuery } from '../../services/blizzardapi';
import { Character, useAppSelector } from '../../state';
import { selectAccessToken } from '../../state/reducers/authSlice';
import './equipmentCol.css';

const ProfessionsCol: React.FC<{ character: Character }> = ({ character }) => {
    const { _id, _professionsHref, _professions } = character;
    const accessToken = useAppSelector(selectAccessToken);

    const { fulfilledTimeStamp } = useGetProfessionsQuery(
        { href: _professionsHref, accessToken, id: _id },
        { skip: !_professionsHref }
    );

    const primaryProfs = () => {
        if (!_professions) return <p>failed</p>;
        return _professions?.primaries.map((primaries) => {
            const prof = primaries.profession;
            const profTiers = primaries.tiers.map((tiers) => {
                return (
                    <Fragment key={tiers.tier.id}>
                        {`${tiers.tier.name}: ${tiers.skill_points}/
                    ${tiers.max_skill_points}`}
                        <br></br>
                    </Fragment>
                );
            });
            return (
                <p className='tooltip' key={prof.id}>
                    {prof.name}
                    <span className='tooltiptext'>{profTiers}</span>
                    <br></br>
                </p>
            );
        });
    };

    return <td>{!fulfilledTimeStamp ? 'asd' : primaryProfs()}</td>;
};

export default ProfessionsCol;
