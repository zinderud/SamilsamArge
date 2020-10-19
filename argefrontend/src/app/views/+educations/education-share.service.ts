import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Education } from '@app/core/models/educations';

@Injectable({
  providedIn: 'root'
})
export class EducationShareService {

  private educationStageMessage = new BehaviorSubject(new Education());
  currentApprovalStageMessage = this.educationStageMessage.asObservable();

  constructor() {

  }
  updateApprovalMessage(message: Education) {
    this.educationStageMessage.next(message);
  }
}
