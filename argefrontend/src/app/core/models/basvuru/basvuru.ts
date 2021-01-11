import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { BaseFilter, Paginator, OrderBy, User } from '../core';



export class Basvuru {
    // public OzgecmisId?: number;
    public id?: number;
    public basvuruNo?: number;
    public userId?: number;
    public user?: User;
    public tarih?: Date;
    public durum?: string;
    public durumId?: number;
    public basvuruTuruId?: number;
    public basvuruTuru?: string;
    public basvuruForm?: string;
}


export class OzgecmisFilter extends BaseFilter {
    constructor(public searchString: string, public tc: string,
        p: Paginator,
        ob: OrderBy) {
        super(p, ob);
    }

    public SetHttpParams(hp: HttpParams): HttpParams {
        hp = super.SetHttpParams(hp);

        if (!TypeHelper.isNullOrEmpty(this.searchString) && this.searchString !== '') {
            hp = hp.set('filter.searchString', this.searchString);
        }
        if (!TypeHelper.isNullOrEmpty(this.tc) && this.tc !== '') {
            hp = hp.set('filter.tc', this.tc);
        }
        return hp;
    }
}
