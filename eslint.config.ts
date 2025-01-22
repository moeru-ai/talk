import antfu from '@antfu/eslint-config'
import { ii } from '@importantimport/eslint-config'
// @ts-expect-error missing types
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  react: true,
  typescript: { tsconfigPath: './tsconfig.json' },
})
  .append(ii())
  .append(reactCompiler.config.recommended)
