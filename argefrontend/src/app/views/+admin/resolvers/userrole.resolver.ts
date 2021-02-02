import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';


@Injectable()
export class UserRoleResolver implements Resolve<any[]> {
    constructor(private httpClient: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.httpClient.get<any>(`${env.serverUrl}/user/usersroles?searchString=&pageIndex=1&pageSize=20&sortOrder=firstname_asc`);
    }
}
