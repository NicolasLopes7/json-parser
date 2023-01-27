export enum Token {
    LEFT_BRACE = 'LEFT_BRACE',
    RIGHT_BRACE = 'RIGHT_BRACE',
    LEFT_BRACKET = 'LEFT_BRACKET',
    RIGHT_BRACKET = 'RIGHT_BRACKET',
    COLON = 'COLON',
    COMMA = 'COMMA',
    STRING = 'STRING',
    NUMBER = 'NUMBER',
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    NULL = 'NULL',
}

export const keywords = [Token.TRUE, Token.FALSE, Token.NULL] as const;