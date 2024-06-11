import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
  STATUS,
  getStatusText,
  ParsedRequestUrl,
} from 'angular-in-memory-web-api';

import { Secret } from './secret';

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* tslint:disable:no-bitwise */
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    /*tslint:enable*/
    return v.toString(16);
  });
}

type SecretActions = 'has' | 'read';

interface SecretRequestData {
    collectionName: string;
    action: SecretActions;
    id: string;
    params: string[];
}


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): {secret: Secret[]} {
    const secret = JSON.parse(window.localStorage.getItem('secret')) || [];
    return { secret };
  }

/*   parseRequestUrl(url: string): ParsedRequestUrl { */
/*     console.log(this); */
/*     return { */
/*     } */
/*   } */

  private getRequestData(reqInfo: RequestInfo): SecretRequestData {
    console.log(this);
    const plainURL = reqInfo.url.replace(reqInfo.apiBase, '');
    const parts = plainURL.split('/');
    console.log('parts', reqInfo.url, parts);
    const out: SecretRequestData = {
      collectionName: parts[0],
      action: parts[1] as SecretActions,
      id: parts[2],
      params: parts.slice(3),
    };
    return out;
  }

  private getData(requestData: SecretRequestData, reqInfo: RequestInfo): Secret {

    if (requestData.collectionName === 'secret') {
      const item = reqInfo.collection.find((s: Secret) => s.UUID === requestData.id);

      if (item && requestData.action === 'read' && requestData.params[0] === item.Key) {
        window.localStorage.setItem('secret', JSON.stringify(reqInfo.collection.filter((s: Secret) => s !== item)));
      }
      return item;
    }
    return undefined;
  }

  private createResponse(reqInfo: RequestInfo): ResponseOptions {
    const requestData = this.getRequestData(reqInfo);
    const data = this.getData(requestData, reqInfo);

    let options: ResponseOptions = null;

    if (!data) {
      options = {
        body: 'Not found',
        status: STATUS.NOT_FOUND,
      };
    } else {
      if (requestData.action === 'has') {
        options = {
          status: STATUS.OK,
          body: {
            ID: data.UUID,
            Data: null,
            Created: data.Created,
          }
        };
      } else {
        if (data.Key === requestData.params[0]) {
          options = {
            status: STATUS.OK,
            body: data,
          };
        } else {
          options = {
            body: 'Unauthorized',
            status: STATUS.UNAUTHORIZED,
          };
        }
      }
    }

    options.statusText = getStatusText(options.status);

    return options;
  }

  get(reqInfo: RequestInfo): Observable<Secret> {
    return reqInfo.utils.createResponse$(() => this.createResponse(reqInfo));
  }

  getJSONBody(req: HttpRequest<any>): Secret {
    return req.body;
  }

  post(reqInfo: RequestInfo): Observable<string> {
    const { req } = reqInfo;
    const data = this.getJSONBody(req as HttpRequest<any>);
    data.Created = new Date();
    data.UUID = this.genId();
    console.log('erequinfo', reqInfo);
    data.Key =  (Math.round(Math.random() * 1e16)).toString(16) +  (Math.round(Math.random() * 1e16)).toString(16);
    /* data.Id = this.genId(); */
    reqInfo.collection.push(data);
    window.localStorage.setItem('secret', JSON.stringify(reqInfo.collection));
    /* const body = "OK"; */
    const headers =  new HttpHeaders({ 'Content-Type': 'application/json' });
    const response = { body: data, status: STATUS.CREATED, headers };
    return reqInfo.utils.createResponse$(() => response);
  }

  genId(): string {
    console.log('gen id');
    return uuidv4();
  }
}
