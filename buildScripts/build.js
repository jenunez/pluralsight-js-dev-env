import webpack from 'webpack';  /*eslint-disable no-console */
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating minified bundle for production. This will takea moment....'));/*eslint-disable no-console */
webpack(webpackConfig).run((err, stats) => {
  if (err) {//so a fatal error occurred. Stop here
    console.log(chalk.red(err)); /*eslint-disable no-console */
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));/*eslint-disable no-console */
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));/*eslint-disable no-console */
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));   /*eslint-disable no-console */
  }

  console.log(`Webpack stats: ${stats}`);/*eslint-disable no-console */

  //if we got this far, the build succeeded
  console.log(chalk.green('Your app has been build for production and written to /dist!')); /*eslint-disable no-console */

  return 0;
});
