import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { BaseFilter, Paginator, OrderBy } from '../core';
import { Arastirma } from './arastirma';
import { Deneyim } from './deneyim';
import { Egitim } from './egitim';
import { Unvan } from './unvan';



export class Ozgecmis {
    // public OzgecmisId?: number;
    public sorumlu?: boolean;
    public tc?: string;
    public ad?: string;
    public soyad?: string;
    public dogumYeri?: string;
    public dogumTarihi?: string;
    public yabanciDil?: string;
    public eposta?: string;
    public unvans?: string;
    public arastirmas?: string;
    public deneyims?: string;
    public egitims?: string;
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
