import { useLocalStorage } from '@vueuse/core'

export const packageManagers = [
  { name: 'npm', icon: 'i-vscode-icons-file-type-npm', add: 'npm i' },
  { name: 'pnpm', icon: 'i-vscode-icons-file-type-pnpm', add: 'pnpm add' },
  { name: 'yarn', icon: 'i-vscode-icons-file-type-yarn', add: 'yarn add' },
  { name: 'bun', icon: 'i-vscode-icons-file-type-bun', add: 'bun add' },
] as const

export type PackageManager = typeof packageManagers[number]['name']

/**
 * The package manager the visitor picked, remembered in localStorage (as
 * nuxt.com does), and the install command in it. Read after mounting, so the
 * server's npm does not mismatch the page on hydration.
 */
export function usePackageManager(packageName: MaybeRefOrGetter<string>) {
  const manager = useLocalStorage<PackageManager>('amxts-package-manager', 'npm', { initOnMounted: true })
  const command = computed(() => {
    const { add } = packageManagers.find(item => item.name === manager.value) ?? packageManagers[0]
    return `${add} ${toValue(packageName)}`
  })
  return { manager, command }
}
