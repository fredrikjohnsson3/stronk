import { FormEvent, useState, useEffect } from 'react';
import { useGetCharacherQuery } from '../services/blizzardapi';
import { useAppDispatch, useAppSelector } from '../state';
import { selectAccessToken } from '../state/reducers/authSlice';
import { addCharacter } from '../state/reducers/rosterSlice';

const AddCharacter: React.FC = () => {
    const dispatch = useAppDispatch();

    const [_name, setCharName] = useState('');
    const [_realm, setCharRealm] = useState('Tarren Mill');
    const [getCharacter, setGetCharacter] = useState(false);

    const characterName = _name.toLowerCase();
    const realmSlug = _realm.replace(' ', '-').toLowerCase();
    const id = [characterName, realmSlug].join('');

    const accessToken = useAppSelector(selectAccessToken);

    const {
        data: res,
        isFetching,
        isLoading,
        isError,
        error,
        fulfilledTimeStamp,
    } = useGetCharacherQuery(
        { id, characterName, realmSlug, accessToken },
        { skip: !getCharacter || !accessToken }
    );

    useEffect(() => {
        if (!fulfilledTimeStamp) return;
        setGetCharacter(false);
        setCharName('');
        setCharRealm('Tarren Mill');
    }, [res, error]);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        const _id = id;
        dispatch(addCharacter({ _id, _name, _realm }));
        setGetCharacter(true);
    }

    return (
        <div>
            {isLoading || isFetching ? (
                'Loading...'
            ) : (
                <form onSubmit={(event) => onSubmit(event)}>
                    <input
                        type='text'
                        value={_name || ''}
                        onChange={(e) => setCharName(e.currentTarget?.value)}
                        onFocus={() => setGetCharacter(false)}
                    ></input>
                    <input
                        type='text'
                        value={_realm || ''}
                        onChange={(e) => setCharRealm(e.currentTarget?.value)}
                        onFocus={() => setGetCharacter(false)}
                    ></input>
                    <input type='submit' />
                </form>
            )}
            {isError ? 'Error getting character data' : ''}
        </div>
    );
};

export default AddCharacter;
