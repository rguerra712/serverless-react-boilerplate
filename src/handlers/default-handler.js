import 'source-map-support/register';
import { render } from '../server';

export const serve = async () => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'text/html',
  },
  body: await render(),
});
