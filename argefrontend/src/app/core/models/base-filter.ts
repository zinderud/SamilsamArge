import { Paginator } from './paginator.model';
import { OrderBy } from './orderby.model';

import { HttpParams } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';



export class BaseFilter {
  constructor(public p: Paginator,
    public ob: OrderBy) { }

  public SetHttpParams(hp: HttpParams): HttpParams {
    if (!TypeHelper.isNullOrEmpty(this.p)) {
      hp = this.p.SetHttpParams(hp);
    }
    if (!TypeHelper.isNullOrEmpty(this.ob)) {
      hp = this.ob.SetHttpParams(hp);
    }
    return hp;
  }
}
