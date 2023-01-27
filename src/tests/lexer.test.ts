import { describe, expect, it } from "vitest";
import { lexer, string, number, boolean, _null } from "../lib/lexer";
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

    describe('string', () => {
        it('should parse a string', () => {
            const json = '"nic"'
            expect(string(json)).toEqual({ type: TokenType.STRING, literal: '"nic"' })
        })

        it('should not parse a string without quotes', () => {
            const json = 'nic'
            expect(string(json)).toBeUndefined()
        })
    })

    describe('number', () => {
        it('should parse a integer', () => {
            const json = '1800'
            expect(number(json)).toEqual({ type: TokenType.NUMBER, literal: 1800 })
        })

        it('should parse a integer and stop', () => {
            const json = '18a00'
            expect(number(json)).toEqual({ type: TokenType.NUMBER, literal: 18 })
        })

        it('should return undefined if no integer is found', () => {
            const json = 'test'
            expect(number(json)).toBeUndefined()
        })
    })

    describe('boolean', () => {
        it('should parse a boolean', () => {
            const jsonTrue = 'true'
            const jsonFalse = 'false'

            expect(boolean(jsonTrue)).toEqual({ type: TokenType.TRUE, literal: true })
            expect(boolean(jsonFalse)).toEqual({ type: TokenType.FALSE, literal: false })
        })

        it('should return undefined if is not true/false', () => {
            const json = 'any'
            expect(boolean(json)).toBeUndefined()
        })
    })

    describe('_null', () => {
        it('should parse a null', () => {
            const json = 'null'
            expect(_null(json)).toEqual({ type: TokenType.NULL, literal: null })
        })

        it('should return undefined if is not a null', () => {
            const json = 'any'
            expect(_null(json)).toBeUndefined()
        })
    })
})
