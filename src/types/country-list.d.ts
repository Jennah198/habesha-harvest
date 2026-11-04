declare module 'country-list' {
  export function getNames(): string[]
  export function getCodes(): string[]
  export function getName(code: string): string | undefined
  export function getCode(name: string): string | undefined
  export function getData(): { code: string; name: string }[]
}
