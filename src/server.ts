import { env } from './env';
import { serverHttp } from './app';

serverHttp.listen(env.PORT, () => {
  console.log(`\n 🚀 - SERVER IS RUNNING ON PORT ${env.PORT}`);
});
