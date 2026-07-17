import type { NextConfig } from "next";

const githubPagesExport = process.env.GITHUB_PAGES_EXPORT === "1";
const githubPagesBasePath = process.env.GITHUB_PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: githubPagesExport ? "export" : undefined,
  trailingSlash: githubPagesExport,
  basePath: githubPagesExport ? githubPagesBasePath : undefined,
};

export default nextConfig;
