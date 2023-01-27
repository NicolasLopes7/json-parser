import { keywords, PropertyNode, Token, TokenType, TokenValue } from './types'

type Keywords = typeof keywords[number];
type KeywordsMap = (type: Keywords, value: TokenValue) => PropertyNode
const keywordsMap: KeywordsMap = (type, value) => ({
    FALSE: { type: 'BooleanLiteral', value: false },
    TRUE: { type: 'BooleanLiteral', value: true },
    NULL: { type: 'NullLiteral', value: null },
    NUMBER: { type: 'NumberLiteral', value },
    STRING: { type: 'StringLiteral', value }
} as Record<Keywords, PropertyNode>)[type]


const getCommaIndexes = (tokens: Token[]) => tokens.reduce(
    (commaIndexes, token, index) => token.type === TokenType.COMMA ? commaIndexes.concat(index) : commaIndexes,
    [] as number[]
  )
  
  const getEntries = (tokens: Token[]) => {
    const commaIndexes = getCommaIndexes(tokens)
    const entries = []
    let startIndex = 0
    commaIndexes.forEach(endIndex => {
      entries.push(tokens.slice(startIndex, endIndex))
      startIndex = endIndex + 1
    })
    entries.push(tokens.slice(startIndex))
    return entries
  }

export const parser = (tokens: Token[]) => {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (token.type === TokenType.LEFT_BRACE) {
            const entries = getEntries(tokens.slice(i + 1))
            const properties = entries.map(([key, _, value]) => {
                return {
                    type: 'Property',
                    key: {
                        type: key.type,
                        value: key.literal
                    },
                    value: keywordsMap(value.type as Keywords, value.literal)
                }
            })
            return {
                type: 'ObjectExpression',
                properties
            }
        }
    }
}