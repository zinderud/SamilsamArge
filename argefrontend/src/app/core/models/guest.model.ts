import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';
import { BaseFilter } from './base-filter';
import { HttpParams } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';


export interface Guest {
  id: number;
  name?: string;
  phone?: string;
  identification?: string;
  countryID?: number;

}

export class GuestFilter extends BaseFilter {
  constructor(public searchString: string,
    public countryID: number,
    public identification: string,
    p: Paginator,
    ob: OrderBy) {
    super(p, ob);
  }

  public SetHttpParams(hp: HttpParams): HttpParams {
    hp = super.SetHttpParams(hp);

    if (!TypeHelper.isNullOrEmpty(this.searchString) && this.searchString !== '') {
      hp = hp.set('filter.searchString', this.searchString);
    }
    if (!TypeHelper.isNullOrEmpty(this.identification) && this.identification !== '') {
      hp = hp.set('filter.identification', this.identification);
    }
    if (!TypeHelper.isNullOrEmpty(this.countryID)) {
      hp = hp.set('countryID', this.countryID.toString());
    }

    return hp;
  }
}
