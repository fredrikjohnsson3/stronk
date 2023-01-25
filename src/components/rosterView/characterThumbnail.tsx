import { useEffect, useState } from 'react';
import { useGetCharacterMediaQuery } from '../../services/blizzardapi';
import { Character, useAppSelector } from '../../state';
import { selectAccessToken } from '../../state/reducers/authSlice';
import './characterThumbnail.css';

const CharacterThumbnail: React.FC<{ character: Character }> = ({
    character,
}) => {
    const id = character._id;
    const href = character._mediaHref;
    const [renderHref, setRenderHref] = useState('');
    const accessToken = useAppSelector(selectAccessToken);

    const {
        data: res,
        isLoading,
        isFetching,
        isError,
        error,
        fulfilledTimeStamp,
    } = useGetCharacterMediaQuery(
        { id, accessToken, href },
        { skip: !href || !accessToken }
    );

    useEffect(() => {
        res?.assets.map((asset) => {
            if (asset.key === 'avatar') setRenderHref(asset.value);
        });
    }, [fulfilledTimeStamp]);

    return (
        <td>
            {isLoading || isFetching || !renderHref ? (
                '...'
            ) : (
                <img
                    className='rosterAvatarImg'
                    src={renderHref}
                    alt={`${character._name}-thumbnail-img`}
                />
            )}
        </td>
    );
};

export default CharacterThumbnail;
