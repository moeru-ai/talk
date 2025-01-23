export interface Asset {
  ext: string
  name: string
  type: string
  uri: string
}

export type Assets = Asset[]

export interface CharacterBook {
  description?: string
  entries: CharacterBookEntry[]
  extensions: CharacterBookExtensions
  name?: string
  recursive_scanning?: boolean
  scan_depth?: number
  token_budget?: number
}

export interface CharacterBookEntry {
  case_sensitive?: boolean
  /** not used in prompt engineering */
  comment?: string
  /** if true, always inserted in the prompt (within budget limit) */
  constant?: boolean
  content: string
  enabled: boolean
  extensions: CharacterBookEntryExtensions

  // FIELDS WITH NO CURRENT EQUIVALENT IN SILLY
  /** not used in prompt engineering */
  id?: number
  /** if two entries inserted, lower "insertion order" = inserted higher */
  insertion_order: number

  // FIELDS WITH NO CURRENT EQUIVALENT IN AGNAI
  keys: string[]
  /** not used in prompt engineering */
  name?: string
  /** whether the entry is placed before or after the character defs */
  position?: 'after_char' | 'before_char'
  /** if token budget reached, lower priority value = discarded first */
  priority?: number
  /** see field `selective`. ignored if selective == false */
  secondary_keys?: string[]
  /** if `true`, require a key from both `keys` and `secondary_keys` to trigger the entry */
  selective?: boolean
}

export interface CharacterBookEntryExtensions extends Record<string, unknown> {
}

export interface CharacterBookExtensions extends Record<string, unknown> {
}

export interface CharacterCardV3 {
  data: Data
  spec: 'chara_card_v3'
  spec_version: '3.0'
}

/** @see {@link https://github.com/kwaroran/character-card-spec-v3/blob/main/SPEC_V3.md#charactercard-object} */
export type Data = DataV1 & DataV2 & DataV3

/** @see {@link https://github.com/malfoyslastname/character-card-spec-v2/blob/main/spec_v1.md} */
export interface DataV1 {
  description: string
  first_mes: string
  mes_example: string
  name: string
  personality: string
  scenario: string
}

/** @see {@link https://github.com/malfoyslastname/character-card-spec-v2/blob/main/spec_v2.md} */
export interface DataV2 {
  alternate_greetings: string[]
  character_book?: CharacterBook
  character_version: string
  creator: string
  creator_notes: string
  extensions: Extensions
  post_history_instructions: string
  system_prompt: string
  tags: string[]
}

/** @see {@link https://github.com/kwaroran/character-card-spec-v3/blob/main/SPEC_V3.md#charactercard-object} */
export interface DataV3 {
  assets?: Assets
  creation_date?: number
  creator_notes_multilingual?: Record<string, string>
  group_only_greetings: string[]
  modification_date?: number
  nickname?: string
  source?: string[]
}

export interface Extensions extends Record<string, unknown> {
  /**
   * @default
   * ```ts
   * {
   *   depth: 4,
   *   prompt: '',
   *   role: 'system',
   * }
   * ```
   */
  depth_prompt?: ExtensionsDepthPrompt
  /** @default `false` */
  fav?: boolean
  /** @default `0.5` */
  talkativeness?: number
  /** @default `undefined` */
  world?: string
}

export interface ExtensionsDepthPrompt {
  depth: number
  prompt: string
  // eslint-disable-next-line sonarjs/no-useless-intersection
  role: 'system' | (string & {})
}

export interface Message {
  content: string
  memo?: string
  name?: string
  role: 'assistant' | 'function' | 'system' | 'user'
}
