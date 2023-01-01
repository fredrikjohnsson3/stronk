export type CardTypes = 'blizz' | 'rio' | 'wcl' | 'rbots';
export interface Card {
    id: string;
    type: CardTypes;
    content: string;
}
