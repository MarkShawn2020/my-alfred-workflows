const langsSupportedTerminology = [
    "EN",
    "JA",
    "DE",
    "FR"
] as const

const langs = [
    ...langsSupportedTerminology,
    "ZH"
]

export type LangsSupportedTerminology = typeof langsSupportedTerminology[number]
export type Langs = typeof langs[number]


export interface TransMeta {
    text: string
    fromLang: Langs
    targetLang: Langs
}