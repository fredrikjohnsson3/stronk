import {
    BaseQueryApi,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
    BlizzardCharMediaRes,
    BlizzardEquipmentRes,
    BlizzardProfileRes,
    Character,
    CharEmbellished,
    CharKeystones,
    CharProfsRes,
    CharSetBonus,
} from '../state';
import {
    setCharKeystones,
    setCharProfessions,
    setCharThumbnailUrl,
    setSetBonusEmbellished,
    updateCharacter,
} from '../state/reducers/rosterSlice';

interface BlizzardApi {
    id: string;
    realmSlug?: string;
    characterName?: string;
    accessToken: string;
    endpoint?: string;
    href?: string;
}

const API_URL = '';
const namespace = 'profile-eu';
const locale = 'en_GB';

export const blizzardApi = createApi({
    reducerPath: 'blizzardApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getCharacter: builder.query<BlizzardProfileRes, BlizzardApi>({
            query: ({ characterName, realmSlug, accessToken }) => {
                return {
                    url: `https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}`,
                    method: 'GET',
                    params: {
                        namespace,
                        locale,
                        access_token: accessToken,
                    },
                };
            },
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const {
                        name,
                        character_class,
                        active_spec,
                        realm,
                        last_login_timestamp,
                        equipped_item_level,
                        mythic_keystone_profile,
                        professions,
                        equipment,
                        media,
                        achievements,
                        reputations,
                    } = (await queryFulfilled).data;

                    const character: Character = {
                        _id: id,
                        _name: name,
                        _realm: realm.name,
                        _class: character_class.name,
                        _currSpec: active_spec.name,
                        _currIlvl: equipped_item_level,
                        _lastLogIn: last_login_timestamp,
                        _equipmentHref: equipment.href,
                        _professionsHref: professions.href,
                        _keystoneHref: mythic_keystone_profile.href,
                        _achievementsHref: achievements.href,
                        _mediaHref: media.href,
                        _reputationsHref: reputations.href,
                    };

                    dispatch(updateCharacter(character));
                } catch (error) {}
            },
        }),
        getCharacterMedia: builder.query<BlizzardCharMediaRes, BlizzardApi>({
            query: ({ href, accessToken }) => {
                return {
                    url: `${href}`,
                    method: 'GET',
                    params: {
                        namespace,
                        locale,
                        access_token: accessToken,
                    },
                };
            },
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const { assets } = (await queryFulfilled).data;

                    const avatarAsset = () => {
                        assets.forEach((asset) => {
                            if (asset.key === 'avatar') return asset.value;
                        });
                        return '';
                    };
                    const _charThumbnailUrl = avatarAsset();
                    const character: Character = {
                        _id: id,
                        _charThumbnailUrl,
                    };
                    dispatch(setCharThumbnailUrl(character));
                } catch (error) {}
            },
        }),
        getEquipment: builder.query<BlizzardEquipmentRes, BlizzardApi>({
            query: ({ href, accessToken }) => {
                return {
                    url: `${href}`,
                    method: 'GET',
                    params: {
                        namespace,
                        locale,
                        access_token: accessToken,
                    },
                };
            },
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const { equipped_item_sets, equipped_items } = (
                        await queryFulfilled
                    ).data;

                    const setBonuses: CharSetBonus[] = [];
                    equipped_item_sets.forEach((set) => {
                        const setId = set.item_set.id;
                        const regExp = /\(([^)]+)\)/;
                        const regExpString = regExp.exec(set.display_string);
                        const bonusArray: string[] = [];
                        let setDisplayString;

                        set.effects.forEach((bonus) => {
                            if (!bonus.is_active) return;
                            bonusArray.push(bonus.display_string);
                        });

                        if (regExpString) setDisplayString = regExpString;
                        else setDisplayString = '';

                        const bonuses = bonusArray.join('\n');

                        if (bonuses === '') return;
                        setBonuses.push({
                            setId,
                            setDisplayString,
                            bonuses,
                        });
                    });

                    const embellished: CharEmbellished[] = [];
                    equipped_items.map((item) => {
                        if (!item.limit_category) return;
                        else if (
                            item.limit_category ===
                            'Unique-Equipped: Embellished (2)'
                        ) {
                            const { name, media, spells } = item;

                            if (!spells) return;
                            const embellishedMediaHref = media.key.href;
                            const spellsDescription: string[] = [];

                            spells.forEach((spell) => {
                                spellsDescription.push(
                                    [spell.spell.name, spell.description].join(
                                        ' - '
                                    )
                                );
                            });
                            const description = spellsDescription.join('\n');
                            embellished.push({
                                name,
                                embellishedMediaHref,
                                description,
                            });
                        }
                    });

                    const character: Character = {
                        _id: id,
                        _embellished: embellished,
                        _setBonus: setBonuses,
                    };

                    dispatch(setSetBonusEmbellished(character));
                } catch (error) {}
            },
        }),
        getProfessions: builder.query<CharProfsRes, BlizzardApi>({
            query: ({ href, accessToken }) => {
                return {
                    url: `${href}`,
                    method: 'GET',
                    params: {
                        namespace,
                        locale,
                        access_token: accessToken,
                    },
                };
            },
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const profData = (await queryFulfilled).data;
                    const character = { _id: id, _professions: profData };
                    dispatch(setCharProfessions(character));
                } catch (error) {}
            },
        }),
        getKeystones: builder.query<CharKeystones, BlizzardApi>({
            query: ({ accessToken, href }) => {
                return {
                    url: `${href}`,
                    method: 'GET',
                    params: {
                        namespace,
                        locale,
                        access_token: accessToken,
                    },
                };
            },
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                try {
                    const character = {
                        _keystones: (await queryFulfilled).data,
                        _id: id,
                    };
                    dispatch(setCharKeystones(character));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const {
    useGetCharacterQuery,
    useGetEquipmentQuery,
    useGetCharacterMediaQuery,
    useGetProfessionsQuery,
    useGetKeystonesQuery,
} = blizzardApi;
