import { Injectable } from '@angular/core';

import { DAY } from './time';

interface ReadStateValue {
  state: string;
  date: Date;
}

const READ_VALUE = 'yes';
const KEY_PREFIX = 'secret:read:';

@Injectable({
  providedIn: 'root',
})
export class ReadmanagerService {

  constructor() {
    this.maintain();
  }

  private generateKey(id: string): string {
    return KEY_PREFIX + id;
  }

  private generateValue(): string {
    return `${READ_VALUE}:${(new Date()).toISOString()}`;
  }

  private parseValue(value: string): ReadStateValue {
    return {
      state: value.slice(0, value.indexOf(':')),
      date: new Date(value.slice(value.indexOf(':') + 1)),
    };
  }

  private isSecret(value: string): boolean {
    return value.startsWith(KEY_PREFIX);
  }

  setRead(id: string): void {
    localStorage.setItem(this.generateKey(id), this.generateValue());
  }

  isRead(id: string): boolean {
    const value = localStorage.getItem(this.generateKey(id));
    if (value === null) {
      return false;
    }
    const parsed = this.parseValue(value);
    return parsed.state === READ_VALUE &&
      !Number.isNaN(parsed.date.getTime());
  }

  isExpired(date: Date): boolean {
    return date.getTime() < Date.now() - DAY * 30;
  }

  maintain(): void {
    Object.entries(localStorage)
      .filter(([key]) => this.isSecret(key))
      .forEach(([key, value]) => {
        const parsed = this.parseValue(value);

        if (this.isExpired(parsed.date)) {
          localStorage.removeItem(key);
        }
      });
  }
}
