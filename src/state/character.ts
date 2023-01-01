export interface Characters {
    id: string;
    class: string;
    content: {
        name: string;
        realm: string;
        role: string;
        spec_main: string;
        spec_curr: string;
        rio: number;
        professions: {};
        ilvl_main: number;
        ilvl_curr: number;
        set: string;
        embelish: {};
    };
}
