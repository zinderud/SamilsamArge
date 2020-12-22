
// tslint:disable:no-bitwise
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';
export interface FileResponse {
    fileName: string;
}


@Injectable({
    providedIn: 'root'
})
export class UploadDownloadService {
    constructor(private http: HttpClient) { }

    uploadFiles(files: File[]) {
        const formData: FormData = new FormData();
        Array.from(files).map((file, index) => {
            return formData.append('file' + index, file, file.name);
        });

        console.log("formData=", formData)
        return this.http.post<FileResponse[]>(`${env.serverUrl}/UploadDownload`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }
    uploadFile(file: File) {
        const formData: FormData = new FormData();

        formData.append('file', file, file.name);


        console.log("formData=", formData)
        return this.http.post<FileResponse[]>(`${env.serverUrl}/UploadDownload`, formData, {
            reportProgress: true,
            observe: 'events'
        });
    }


    downloadFile(fileName: string, downloadName?: string): Observable<Blob> {
        return this.http.get<Blob>(
            `${env.serverUrl}UploadDownload?fileName=${fileName}&downloadName=${downloadName || fileName}`,
            { reportProgress: true, responseType: 'blob' as 'json' }
        );
    }
}
