export enum TokenType {
    LEFT_BRACE = 'LEFT_BRACE',
    RIGHT_BRACE = 'RIGHT_BRACE',
    LEFT_BRACKET = 'LEFT_BRACKET',
    RIGHT_BRACKET = 'RIGHT_BRACKET',
    COLON = 'COLON',
    QUOTE = 'QUOTE',
    COMMA = 'COMMA',
    STRING = 'STRING',
    NUMBER = 'NUMBER',
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    NULL = 'NULL',
    WHITESPACE = 'WHITESPACE'
}
export const keywords = [TokenType.STRING, TokenType.NUMBER, TokenType.TRUE, TokenType.FALSE, TokenType.NULL] as const

export type TokenValue =  boolean | number | string | null
export type Token = { type: TokenType; literal: TokenValue }

export type PropertyNode = {
    type: 'StringLiteral' | 'NumberLiteral' | 'BooleanLiteral' | 'NullLiteral';
    value: TokenValue
}