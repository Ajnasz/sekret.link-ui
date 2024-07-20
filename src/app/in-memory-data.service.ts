import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import {
  InMemoryDbService,
  RequestCore,
  RequestInfo,
  ResponseOptions,
  STATUS,
  getStatusText,
} from 'angular-in-memory-web-api';

import { Secret } from './secret';

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
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
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { secret: Secret[] } {
    const secret = JSON.parse(window.localStorage.getItem('secret')) || [];
    return { secret };
  }

  private getRequestData(reqInfo: RequestInfo): SecretRequestData {
    const plainURL = reqInfo.url.replace(reqInfo.apiBase, '');
    const parts = plainURL.split('/');
    const out: SecretRequestData = {
      collectionName: parts[0],
      action: parts[1] as SecretActions,
      id: parts[2],
      params: parts.slice(3),
    };
    return out;
  }

  private getData(
    requestData: SecretRequestData,
    reqInfo: RequestInfo
  ): Secret {
    if (requestData.collectionName === 'secret') {
      const item = reqInfo.collection.find(
        (s: Secret) => s.UUID === requestData.id
      );

      if (
        item &&
        requestData.action === 'read' &&
        requestData.params[0] === item.Key
      ) {
        window.localStorage.setItem(
          'secret',
          JSON.stringify(reqInfo.collection.filter((s: Secret) => s !== item))
        );
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
          },
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

  getJSONBody(req: HttpRequest<Secret>): Secret {
    return req.body;
  }

  private isSecretRequest(
    reqInfo: RequestCore
  ): reqInfo is HttpRequest<Secret> {
    return reqInfo.url.includes('secret');
  }

  post(reqInfo: RequestInfo): Observable<string> {
    const { req } = reqInfo;
    if (!this.isSecretRequest(req)) {
      return of('');
    }

    const data = this.getJSONBody(req);
    data.Created = new Date();
    data.UUID = this.genId();
    data.Key =
      Math.round(Math.random() * 1e16).toString(16) +
      Math.round(Math.random() * 1e16).toString(16);
    /* data.Id = this.genId(); */
    reqInfo.collection.push(data);
    window.localStorage.setItem('secret', JSON.stringify(reqInfo.collection));
    /* const body = "OK"; */
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const response = { body: data, status: STATUS.CREATED, headers };
    return reqInfo.utils.createResponse$(() => response);
  }

  genId(): string {
    return uuidv4();
  }
}
