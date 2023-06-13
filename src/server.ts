import { env } from './shared/env';
import { serverHttp } from './app';

serverHttp.listen(env.PORT, () => {
  console.log(`\n 🚀 - SERVER IS RUNNING ON PORT ${env.PORT}`);
});
