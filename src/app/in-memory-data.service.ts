import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS, getStatusText } from 'angular-in-memory-web-api';

import { Secret } from './secret';

interface SecretRequestData {
    collectionName: string;
    id: string;
    params: string[];
}


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): Secret {
    return {
        Data: 'adsf',
        Created: new Date(),
    };
  }

  private getRequestData(reqInfo: RequestInfo): SecretRequestData {
      const plainURL = reqInfo.url.replace(reqInfo.apiBase, '');
      const parts = plainURL.split('/');
      const out: SecretRequestData = {
          collectionName: parts[0],
          id: parts[1],
          params: parts.slice(2),
      };
      return out;
  }

  private getData(requestData: SecretRequestData): object {
      if (requestData.collectionName === 'secret') {
          if (requestData.params[0]) {
              return {
                  Data: 'adsf',
                  Created: new Date(),
              };
          }
      }
      return undefined;
  }

  private createResponse(reqInfo: RequestInfo): ResponseOptions {
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;

      const requestData = this.getRequestData(reqInfo);
      console.log('requestData', requestData);

      const data = this.getData(requestData);
      const options: ResponseOptions = {
          body: dataEncapsulation ? { data } : data,
          status: STATUS.OK,
      };


      options.statusText = getStatusText(options.status);
      options.headers = reqInfo.headers;
      options.url = reqInfo.url;

      return options;
  }

  get(reqInfo: RequestInfo) {
      return reqInfo.utils.createResponse$(() => this.createResponse(reqInfo));
  }
  genId(secret: Secret): string {
      return 'asdfdsfasdf-' + secret.Created.getTime();
  }
}
