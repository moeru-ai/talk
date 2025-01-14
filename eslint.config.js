import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  react: true,
  typescript: { tsconfigPath: './tsconfig.json' },
})
  .append(ii())
  .append({
    plugins: { 'react-compiler': reactCompiler },
    rules: { 'react-compiler/react-compiler': 'error' },
  })
