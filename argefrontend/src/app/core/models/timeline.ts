import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';
import { BaseFilter } from './base-filter';
import { HttpParams } from '@angular/common/http';
import { TypeHelper } from '../../shared/lib/helpers/typeHelper';
import { Title } from './title';
import { User } from './user.model';
import { Basvuru } from './basvuru/basvuru';



export class Timeline {

  public userId?: number;

  public user?: User;

  public basvuruId?: number;

  public basvuru?: Basvuru;



  public tarih?: string;

  public durum?: string;
  public not?: string;




}

export class TimelineFilter extends BaseFilter {
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

    return hp;
  }
}
