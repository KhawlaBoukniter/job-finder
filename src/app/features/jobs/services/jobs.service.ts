import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApiResponse } from '../models/job.model';

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    private apiUrl = 'https://www.arbeitnow.com/api/job-board-api';

    constructor(private http: HttpClient) { }

    getJobs(): Observable<JobApiResponse> {
        return this.http.get<JobApiResponse>(this.apiUrl);
    }
}
