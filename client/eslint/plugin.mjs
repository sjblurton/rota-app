import requireCallbackHook from './rules/require-callback-hook.mjs'
import requireEventCallbackHook from './rules/require-event-callback-hook.mjs'

export default {
  rules: {
    'require-callback-hook': requireCallbackHook,
    'require-event-callback-hook': requireEventCallbackHook,
  },
}
