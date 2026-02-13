import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationItem } from '../models/application.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/applications';

    getUserApplications(userId: string): Observable<ApplicationItem[]> {
        return this.http.get<ApplicationItem[]>(`${this.apiUrl}?userId=${userId}`);
    }

    addApplication(app: ApplicationItem): Observable<ApplicationItem> {
        return this.http.post<ApplicationItem>(this.apiUrl, app);
    }

    deleteApplication(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateApplication(id: number | string, patch: Partial<ApplicationItem>): Observable<ApplicationItem> {
        return this.http.patch<ApplicationItem>(`${this.apiUrl}/${id}`, patch);
    }

    checkExists(userId: string, offerId: string): Observable<ApplicationItem[]> {
        return this.http.get<ApplicationItem[]>(`${this.apiUrl}?userId=${userId}&offerId=${offerId}`);
    }
}
