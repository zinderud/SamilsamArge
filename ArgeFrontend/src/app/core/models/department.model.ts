import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';
import { BaseFilter } from './base-filter';
import { HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

export class Department {
  public id: number;
  public name: string;
  public code: string;
}

export class DepartmentFilter extends BaseFilter {
  constructor(public searchString: string, public code: string,
              p: Paginator,
              ob: OrderBy) {
    super(p, ob);
  }

  public SetHttpParams(hp: HttpParams): HttpParams {
    hp = super.SetHttpParams(hp);

    if (!isNullOrUndefined(this.searchString) && this.searchString !== '') {
      hp = hp.set('filter.searchString', this.searchString);
    }
    if (!isNullOrUndefined(this.code) && this.code !== '') {
      hp = hp.set('filter.code', this.code);
    }
    return hp;
  }
}
