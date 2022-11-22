import { configureProject } from './project.config.mjs';

configureProject();

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: ['./styles/constants'],
    prependData: `@import "scssVariables.scss"; @import "mediaQueries.scss"; @import "mixins.scss";`
  }
};

export default nextConfig;
