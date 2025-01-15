import type { Ref } from 'vue'

export interface DarkModeContext {
  isDark: Ref<boolean>;
  toggleDark: () => void;
}