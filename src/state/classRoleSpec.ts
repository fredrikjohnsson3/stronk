interface ClassRoleSpec {
    [key: string]: {
        dps?: string | string[];
        healer?: string | string[];
        tank?: string | string[];
    };
}

export const classRoleSpec: ClassRoleSpec = {
    priest: {
        dps: 'shadow',
        healer: ['discipline', 'holy'],
    },
    paladin: {
        dps: 'retribution',
        healer: 'holy',
        tank: 'protection',
    },
    druid: {
        dps: ['balance', 'feral'],
        healer: 'restoration',
        tank: 'guardian',
    },
    evoker: {
        dps: 'devastation',
        healer: 'preservation',
    },
    rogue: {
        dps: ['assassination', 'subtlety', 'outlaw'],
    },
    deathknight: {
        dps: ['unholy', 'frost'],
        tank: ['blood'],
    },
    demonhunter: {
        dps: 'havoc',
        tank: 'vengeance',
    },
    mage: {
        dps: ['arcane', 'fire', 'frost'],
    },
    monk: {
        dps: 'windwalker',
        healer: 'mistweaver',
        tank: 'brewmaster',
    },
    shaman: {
        dps: ['elemental', 'enhancement'],
        healer: 'restoration',
    },
    warlock: {
        dps: ['affliction', 'demonology', 'destruction'],
    },
    warrior: {
        dps: ['fury', 'arms'],
        tank: 'protection',
    },
    hunter: {
        dps: ['survival', 'beast mastery', 'marksmanship'],
    },
};
