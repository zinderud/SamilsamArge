// tslint:disable:no-bitwise
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';
import { Timeline } from '../models/timeline';





@Injectable({
    providedIn: 'root'
})
export class TimelineService {

    private userid;
    timeline: Timeline = {}


    constructor(private httpClient: HttpClient
    ) { }

    public addTimeLine(timeline: Timeline) {
        let p: Timeline;
        p = { ...timeline };

        return this.httpClient.post(`${env.serverUrl}/timeline`, p)

    }


    public listTimeline(basvuruId: number) {
        return this.httpClient.get(`${env.serverUrl}/basvuru/${basvuruId}`)
    }




}
