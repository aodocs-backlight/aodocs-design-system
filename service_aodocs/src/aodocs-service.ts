type HttpMethod = 'GET';

export class AodocsService {
  private url: string;
  private options: RequestInit;

  constructor(
    private apiUrl: string,
    ) {
    }

  public async list(path: string, token: string): Promise<any[]> {
    // const response = await fetch(this.url, this.getOptions(token, 'GET'));
    // const list = await response.json();
    // return list ?? [];
    return Promise.resolve(['TOTO', 'TITI', 'TATA']);
  }

  private getOptions(token: string, method: HttpMethod): RequestInit {
    return <RequestInit>{
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }
  }
}