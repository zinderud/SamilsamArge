import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';
import { Basvuru } from '../basvuru/basvuru';
import { BaseFilter, Paginator, OrderBy, User } from '../core';


export class Kontrol {

    public basvuruId: number;
    public basvuru: Basvuru;
    public atayanUserId?: number;
    public atayanUser?: User;
    public atananUserId?: number;
    public atananUser?: User;
    public atamaTarih?: Date;
    public kontrolDurum?: string; // incelemede , tamamlandı
    public kurumUstYazi?: string;
    public dilekceBasvurusuUygunmu?: string;
    public arastirmaBaslik?: string;
    public arastirmaStatu?: string;
    public arastirmaci?: string;
    public danisman?: string;
    public kurum?: string;
    public arastirmaAmac?: string;
    public arastirmaTuru?: string;
    public arastirmaYeri?: string;
    public arastirmaEvreni?: string;
    public arastirmaHipotez?: string;
    public arastirmaYontem?: string;
    public arastirmaZamanAralik?: string;
    public girisimselUygulama?: string;
    public prospektifmi?: string;
    public arastirmaBilimselYararAciklanmismi?: string;
    public anketSorulariUygunmu?: string;
    public onizinformvarmi?: string;
    public basvuruformvarmi?: string;
    public etikkurulvarmi?: string;
    public bakanlikOnayvarmi?: string;
    public butceFormvarmi?: string;
    public ozgecmisvarmi?: string;
    public kullanilacakevraklarvarmi?: string;
    public ucedetLitaratur?: string;
    public gorusler?: string;
    public kontrolTarih?: Date;


}

export class KontrolFilter extends BaseFilter {
    constructor(public searchString: string, public atananUserId: string,
        p: Paginator,
        ob: OrderBy) {
        super(p, ob);
    }

    public SetHttpParams(hp: HttpParams): HttpParams {
        hp = super.SetHttpParams(hp);

        if (!TypeHelper.isNullOrEmpty(this.searchString) && this.searchString !== '') {
            hp = hp.set('filter.searchString', this.searchString);
        }
        if (!TypeHelper.isNullOrEmpty(this.atananUserId) && this.atananUserId !== '') {
            hp = hp.set('filter.atananUserId', this.atananUserId);
        }
        return hp;
    }
}
