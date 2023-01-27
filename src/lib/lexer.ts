import { TokenType, Token } from "./tokens"

const charTokenMap: Record<string, TokenType> = {
    '{': TokenType.LEFT_BRACE,
    '}': TokenType.RIGHT_BRACE,
    '[': TokenType.LEFT_BRACKET,
    ']': TokenType.RIGHT_BRACKET,
    ':': TokenType.COLON,
    ',': TokenType.COMMA,
}

const number = (rest: string): Token | undefined => {
    let literal = ''
    rest.split('').some((char) => {
        if (/[0-9]/.test(char)) {
            literal += char
            return false
        }
        return true
    })

    if (literal.length) return {
        type: TokenType.NUMBER,
        literal: parseInt(literal)
    }
}

const string = (rest: string) => {
    if (!rest.startsWith('"')) return
    const closingQuoteIndex = rest.slice(1).split("").findIndex((char) => char === '"')
    return { type: TokenType.STRING, literal: rest.slice(0, closingQuoteIndex + 2) }
}

const boolean = (rest: string) => {
    if (rest.startsWith('true')) return { type: TokenType.TRUE, literal: true }
    if (rest.startsWith('false')) return { type: TokenType.FALSE, literal: false }
}

const _null = (rest: string) => {
    if (rest.startsWith('null')) return { type: TokenType.NULL, literal: null }
}

const tokenSize = (token?: Token['literal']) => {
    if (typeof token === 'string') return token.length - 1
    if (typeof token === 'boolean') return 3 // (true OR false) -1
    if (typeof token === 'number') return token.toString().length - 1
    if (token === null) return 3 // null - 1
    return 0
}

export const lexer = (json: string) => {
    const tokens: Token[] = []
    for (let i = 0; i < json.length; i++) {
        const char = json[i];
        if (char === ' ') continue
        if (charTokenMap[char]) {
            tokens.push({ type: charTokenMap[char], literal: null })
            continue
        }
        const rest = json.slice(i)
        const token = number(rest) || string(rest) || boolean(rest) || _null(rest)
        if (token) {
            tokens.push(token)
            i += tokenSize(token.literal)
            continue
        }
        throw new Error(`Current tokens: ${JSON.stringify(tokens)}\nUnexpected character: ${char}\nPosition: ${i}`)
    }

    return tokens
}