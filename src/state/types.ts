export interface AccessToken {
    access_token: string;
    expires_in: number;
}
export type BnetAuthRes = AccessToken;

export type CardTypes = 'blizz' | 'rio' | 'wcl' | 'rbots';
export interface Card {
    id: string;
    type: CardTypes;
    content: string;
}

export interface BlizzardApi {
    realmSlug: string;
    characterName: string;
    endpoint: string;
}

export interface BlizzardProfile {
    name: string;
    character_class: {
        name: string;
    };
    active_spec: {
        name: string;
    };
    realm: {
        name: string;
    };
    achievment_points: number;
    last_login_timestamp: number;
    equipped_item_level: number;
    mythic_keystone_profile: {
        href: string;
    };
    professions: {
        href: string;
    };
    appearance: {
        href: string;
    };
    equipment: {
        href: string;
    };
    media: {
        href: string;
    };
    encounters: {
        href: string;
    };
    pvp_summary: {
        href: string;
    };
    titles: {
        href: string;
    };
    achievements: {
        href: string;
    };
    specializations: {
        href: string;
    };
    reputations: {
        href: string;
    };
}
export type BlizzardProfileRes = BlizzardProfile;

export interface Character {
    _id: string;
    _name?: string;
    _realm?: string;
    _class?: string;
    _role?: string;
    _mainSpec?: string;
    _currSpec?: string;
    _keystoneHref?: string;
    _professionsHref?: string;
    _mainIlvl?: number;
    _currIlvl?: number;
    _equipmentHref?: string;
    _lastLogIn?: number;
    _reputationsHref?: string;
    _mediaHref?: string;
    _achievementsHref?: string;
    _setBonus?: CharSetBonus[];
    _embellished?: CharEmbellished[];
}
export type Roster = Character;

export type SetItems = {
    item: {
        id?: number;
        key?: string;
        name?: string;
    };
    is_equipped?: boolean;
};
export type SetEffects = {
    display_string: string;
    is_active?: boolean;
    required_count: number;
};
export type EquippedItemSets = {
    display_string: string;
    effects: SetEffects[];
    item_set: {
        id: number;
        key: string;
        name: string;
    };
    items: SetItems[];
};
export type CraftingStat = {
    id: number;
    name: string;
    type: string;
};
export type Stats = {
    display: {};
    type: {
        type: string;
        name: string;
    };
    value: number;
};
export type Sockets = {
    display_string: string;
    item: {
        id: number;
        key: { href: string };
        name: string;
    };
    socket_type: {
        type: string;
        name: string;
    };
};
export type Spells = {
    description: string;
    spell: {
        id: number;
        key: { href: string };
        name: string;
    };
};
export type EquippedItems = {
    armor?: {};
    binding?: {};
    bonus_list?: [];
    context?: number;
    description?: string;
    durability?: {};
    enchantments?: { display_string: string };
    inventory_type: {
        type: string;
        name: string;
    };
    item?: {};
    item_class?: {};
    item_subclass?: {};
    level?: {};
    limit_category?: string;
    media: {
        key: { href: string };
        id: number;
    };
    modified_crafting_stat: CraftingStat[];
    modified_appearance_id?: number;
    name: string;
    name_description?: {};
    quality?: {};
    quantity?: number;
    requirements?: {};
    sell_price?: {};
    sockets?: Sockets[];
    spells?: Spells[];
    slot: {
        type: string;
        name: string;
    };
    stats?: Stats[];
    transmog?: {};
};
export interface BlizzardEquipment {
    equipped_item_sets: EquippedItemSets[];
    equipped_items: EquippedItems[];
}
export type BlizzardEquipmentRes = BlizzardEquipment;

export interface CharSetBonus {
    setId: number;
    bonuses: string;
}
export type CharSetBonusType = CharSetBonus;

export interface CharEmbellished {
    name: string;
    embellishedMediaHref: string;
    description: string;
}
export type CharEmbellishedType = CharEmbellished;
