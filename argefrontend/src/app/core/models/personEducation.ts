import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';
import { BaseFilter } from './base-filter';
import { HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Title } from './title';
import { Person } from './person';
import { Education } from './educations';


export class PersonEducation {

    public personEducationID?: number;
    /// <summary> personId  </summary>
    public personId?: number;

    /// <summary> person  </summary>
    public person?: Person;

    /// <summary> educationId  </summary>
    public educationId?: number;

    /// <summary> education  </summary>
    public education?: Education;

    /// <summary> Eğitim alma  durumu  </summary>
    public check?: boolean;

    /// <summary> Eğitim   aldıgı tarih  </summary>
    public educationDate?: Date;

    /// <summary> Eğitim yeniden alacağı tarih  </summary>
    public renewalDate?: Date;

    /// <summary> arşiv  durumu  </summary>
    public isArchived?: boolean;




}

export class PersonFilter extends BaseFilter {
    constructor(public searchString: string, public title: Title,
                p: Paginator,
                ob: OrderBy) {
        super(p, ob);
    }

    public SetHttpParams(hp: HttpParams): HttpParams {
        hp = super.SetHttpParams(hp);

        if (!isNullOrUndefined(this.searchString) && this.searchString !== '') {
            hp = hp.set('filter.searchString', this.searchString);
        }

        return hp;
    }
}
