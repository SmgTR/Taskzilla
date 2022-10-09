import { configureProject } from './project.config.mjs';

configureProject();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;
