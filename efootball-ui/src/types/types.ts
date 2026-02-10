export interface Saison {
    name: string;
    saisonStartDate: string;
    status: string;
    id: number;
    _links: {
        self: { href: string };
        saison: { href: string };
        tournaments: { href: string };
    };
}

export interface SaisonResponse {
    _embedded: {
        saisons: Saison[];
    };
    _links: {
        self: { href: string };
        profile: { href: string };
    };
}