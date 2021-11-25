type HttpMethod = 'GET';

export abstract class BaseService {
  private options: RequestInit;

  constructor(private apiUrl: string) {}

  public async get<T>(path: string, token: string): Promise<T> {
    const response = await fetch(
      this.apiUrl + path,
      this.getOptions(token, 'GET')
    );
    const responseObject = await response.json();
    return responseObject ?? {};
  }

  private getOptions(token: string, method: HttpMethod): RequestInit {
    return <RequestInit>{
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    };
  }
}
