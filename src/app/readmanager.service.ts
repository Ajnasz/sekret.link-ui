import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ReadmanagerService {

  constructor() { }
  static READ_VALUE = 'yes';

  private generateKey(id): string {
    return `secret:read:${id}`;
  }

  setRead(id): void {
    localStorage.setItem(this.generateKey(id), ReadmanagerService.READ_VALUE);
  }

  isRead(id): boolean {
    return localStorage.getItem(this.generateKey(id)) === ReadmanagerService.READ_VALUE;
  }
}
