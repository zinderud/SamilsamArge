
import { HttpParams } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';

export class Paginator {
  constructor(public offset: number,
    public limit: number) { }

  public SetHttpParams(hp: HttpParams): HttpParams {
    if (!TypeHelper.isNullOrEmpty(this.offset)) {
      hp = hp.set('paginator.offset', this.offset.toString());
    }
    if (!TypeHelper.isNullOrEmpty(this.limit)) {
      hp = hp.set('paginator.limit', this.limit.toString());
    }
    return hp;
  }
}
