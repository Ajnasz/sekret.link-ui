import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends Title {
  setTitle(title: string): void {
    let newTitle = 'Sekret Link';

    if (title !== '') {
      newTitle = `${title} - ${newTitle}`;
    }

    super.setTitle(newTitle);
  }
}
