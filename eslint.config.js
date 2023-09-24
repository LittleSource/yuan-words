import antfu, { combine } from '@antfu/eslint-config'
import plugin from '@unocss/eslint-plugin'

export default combine(
  antfu,
  {
    plugins: {
      '@unocss': plugin,
    },
    rules: Object.assign({}, plugin.configs.recommended.rules, {
      // 自定义规则
      'no-console': 'off',
    }),
  },
)
