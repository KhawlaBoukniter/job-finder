import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
    slug: string;
    company_name: string;
    title: string;
    description: string;
    remote: boolean;
    url: string;
    tags: string[];
    job_types: string[];
    location: string;
    created_at: number;
}

export interface JobResponse {
    data: Job[];
    links?: {
        first: string;
        last?: string;
        prev?: string | null;
        next?: string | null;
    };
    meta?: {
        current_page: number;
        from: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    private apiUrl = 'https://www.arbeitnow.com/api/job-board-api';

    constructor(private http: HttpClient) { }

    getJobs(): Observable<JobResponse> {
        return this.http.get<JobResponse>(this.apiUrl);
    }
}
