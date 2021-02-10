import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { BaseFilter, Paginator, OrderBy, User } from '../core';



export class Basvuru {
    // public OzgecmisId?: number;
    public id?: number;
    public basvuruNo?: number;
    public userId?: number = 0;
    public user?: User;
    public tarih?: Date;
    public durum?: string;
    public durumId?: number;
    public basvuruTuruId?: number;
    public basvuruTuru?: string;
    public basvuruForm?: string;
    public basvuruBaslangicTarih?: Date;
    public basvuruBitisTarih?: Date;
}


export class OzgecmisFilter extends BaseFilter {
    constructor(public searchString: string, public userId: number,
        p: Paginator,
        ob: OrderBy) {
        super(p, ob);
    }

    public SetHttpParams(hp: HttpParams): HttpParams {
        hp = super.SetHttpParams(hp);

        if (!TypeHelper.isNullOrEmpty(this.searchString) && this.searchString !== '') {
            hp = hp.set('filter.searchString', this.searchString);
        }
        if (!TypeHelper.isNullOrEmpty(this.userId) && this.userId !== 0) {
            hp = hp.set('filter.tc', this.userId.toString());
        }
        return hp;
    }
}
