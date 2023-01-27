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

export type Token = {
    type: TokenType;
    literal: boolean | number | string | null;
}