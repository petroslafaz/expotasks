export class MockResponse {
  body: string;
  status: number;
  ok: boolean;

  constructor(body: string, options: { status: number }) {
    this.body = body;
    this.status = options.status;
    this.ok = options.status >= 200 && options.status < 300;
  }

  json() {
    return Promise.resolve(JSON.parse(this.body));
  }

  text() {
    return Promise.resolve(this.body);
  }
}
