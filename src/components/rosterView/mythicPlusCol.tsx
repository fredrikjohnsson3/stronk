import { useGetKeystonesQuery } from '../../services/blizzardapi';
import { Character, useAppSelector } from '../../state';
import { selectAccessToken } from '../../state/reducers/authSlice';

const MythicPlusCol: React.FC<{ character: Character }> = ({ character }) => {
    const { _id, _keystoneHref, _keystones } = character;
    const accessToken = useAppSelector(selectAccessToken);

    const { fulfilledTimeStamp } = useGetKeystonesQuery(
        { id: _id, href: _keystoneHref, accessToken },
        { skip: !_keystoneHref }
    );

    const parsedKeystones = () => {
        if (!_keystones) return <td>...</td>;
        const { color, rating } = _keystones.current_mythic_rating;
        const { r, g, b, a } = color;
        return (
            <td style={{ color: `rgba(${r}, ${g}, ${b}, ${a})` }}>
                {Math.floor(rating)}
            </td>
        );
    };

    return <>{parsedKeystones()}</>;
};

export default MythicPlusCol;
