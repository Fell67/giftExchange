import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import path from 'path'
import viteConfig from './vite.config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*']
    }
  })
)
