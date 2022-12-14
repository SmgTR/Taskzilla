import { configureProject } from './project.config.mjs';

configureProject();

const nextConfig = {
  sassOptions: {
    includePaths: ['./styles/constants'],
    prependData: `@import "scssVariables.scss"; @import "mediaQueries.scss"; @import "mixins.scss";`
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
};

export default nextConfig;
