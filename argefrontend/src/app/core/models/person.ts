import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';
import { BaseFilter } from './base-filter';
import { HttpParams } from '@angular/common/http';
import { TypeHelper } from '../../shared/lib/helpers/typeHelper';
import { Title } from './title';



export class Person {

    public personId?: number;

    /// <summary> isim  </summary>
    public name?: string;

    /// <summary> Soyİsim  </summary>
    public surname?: string;

    /// <summary> Mail Adresi  </summary>
    public email?: string;

    /// <summary> Ünvan  </summary>


    public title?: Title;

    /// <summary> telefon  </summary>
    public phone?: number;

    /// <summary> Birimi  </summary>
    public unit?: string;

    /// <summary> arşiv  durumu  </summary>
    public isArchived?: boolean;
    /// <summary> departmentId  </summary>
    public departmentId?: number;





}

export class PersonFilter extends BaseFilter {
    constructor(public searchString: string, public title: Title,
        p: Paginator,
        ob: OrderBy) {
        super(p, ob);
    }

    public SetHttpParams(hp: HttpParams): HttpParams {
        hp = super.SetHttpParams(hp);

        if (!TypeHelper.isNullOrEmpty(this.searchString) && this.searchString !== '') {
            hp = hp.set('filter.searchString', this.searchString);
        }
        if (!TypeHelper.isNullOrEmpty(this.title.name) && this.title.name !== '') {
            hp = hp.set('filter.title', this.title.name);
        }
        return hp;
    }
}
