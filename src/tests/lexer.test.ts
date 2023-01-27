import { describe, expect, it } from "vitest";
import { lexer } from "../lib/lexer";
import { TokenType } from "../lib/tokens";

describe('Lexer', () => {
    it('should parse a json', () => {
        const json = '{"name": "nic", "age": 18}'
        const tokens = lexer(json)

        const expectedTokens = [
            { type: TokenType.LEFT_BRACE, literal: null },
            { type: TokenType.STRING, literal: '"name"' },
            { type: TokenType.COLON, literal: null },
            { type: TokenType.STRING, literal: '"nic"' },
            { type: TokenType.COMMA, literal: null },
            { type: TokenType.STRING, literal: '"age"' },
            { type: TokenType.COLON, literal: null },
            { type: TokenType.NUMBER, literal: 18 },
            { type: TokenType.RIGHT_BRACE, literal: null }
        ]

        expect(tokens).toEqual(expectedTokens)
    })

    it('should fail when a token is not recognized', () => {
        const cursedJson = '{name: "nic", age: 18}'
        expect(() => lexer(cursedJson)).toThrow('Unexpected character: n\nPosition: 1')
    })
})