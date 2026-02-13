export type ApplicationStatus = 'en_attente' | 'accepte' | 'refuse';

export interface ApplicationItem {
    id?: number | string;
    userId: string;
    offerId: string;
    apiSource: 'arbeitnow';
    title: string;
    company: string;
    location: string;
    url: string;
    status: ApplicationStatus;
    notes?: string;
    dateAdded: string;
}
