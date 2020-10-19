import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';
import { BaseFilter } from './base-filter';
import { HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Title } from './title';


export class Education {

        /// <summary> educationId  </summary>
        public educationId?: number;
    /// <summary> Konu  </summary>
    public subject?: string;

    /// <summary> Başkanlık  </summary>
    public management?: string;

    /// <summary> yenileme süresi yıl  </summary>
    public renewalPeriod?: number;
  
    /// <summary> eğitim Şekli  </summary>
    public educationType?: string;

    /// <summary> eğitim Yeri  </summary>
    public educationPlace?: string;

  /*   /// <summary> eğitim Tarihi  </summary>
    public educationDate?: Date; */

    /// <summary> eğitim Süresi  saat </summary>
    public educationTime?: number;
    /// <summary> eğiticinin Adı soy adı  </summary>
    public educator?: string;

    /// <summary> eğitim alması gereken Unvanlar </summary>


    public titles?: string;



    /// <summary> Eğitim Sorumlusu </summary>
    public educationOfficer?: string;



    /// <summary> Verilecek Belgeler  </summary>
    public certification?: string;






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
        if (!isNullOrUndefined(this.title.name) && this.title.name !== '') {
            hp = hp.set('filter.title', this.title.name);
        }
        return hp;
    }
}
