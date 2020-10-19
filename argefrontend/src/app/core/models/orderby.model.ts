import { HttpParams } from '@angular/common/http';
import { TypeHelper } from '@app/shared/lib/helpers/typeHelper';


export class OrderBy {
  constructor(public by: string,
    public desc: boolean) { }

  public SetHttpParams(hp: HttpParams): HttpParams {
    if (!TypeHelper.isNullOrEmpty(this.by) && this.by !== '') {
      hp = hp.set('orderBy.by', this.by);
    }
    if (!TypeHelper.isNullOrEmpty(this.desc)) {
      hp = hp.set('orderBy.desc', this.desc.toString());
    }
    return hp;
  }
}
