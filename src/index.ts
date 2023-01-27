import { lexer } from "./lib/lexer";
import { parser } from "./lib/parser";
    
const tokens = lexer(`{"name": "nicolao", "age": 18}`)
const ast = parser(tokens)
console.log(JSON.stringify(ast, null, 2))