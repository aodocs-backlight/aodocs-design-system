import {BaseService} from '../../service_base';
import {AodocsUserModel} from '../../model_aodocs-user';

type HttpMethod = 'GET';

export class AodocsService extends BaseService {
  constructor(apiUrl: string) {
      super(apiUrl);
    }

    public async getUser(token: string): Promise<AodocsUserModel> {
      return await this.get('user/v1/me', token);
    }
}