import CalculatorLexer from "./generated/CalculatorLexer.js";
import CalculatorParser from "./generated/CalculatorParser.js";
import { CustomCalculatorVisitor } from "./CustomCalculatorVisitor.js";
import antlr4, { CharStreams, CommonTokenStream } from "antlr4";
import readline from 'readline';
import fs from 'fs';

async function main() {
    let input;

    // Intento leer la entrada desde el archivo input.txt
    try {
        input = fs.readFileSync('input.txt', 'utf8');
    } catch (err) {
        // Si no es posible leer el archivo, solicitar la entrada del usuario por teclado
        input = await leerCadena();
    }

    console.log("========================================");
    console.log("ANÁLISIS LÉXICO Y SINTÁCTICO");
    console.log("========================================");
    console.log("\nCódigo fuente (input.txt):");
    console.log(input);

    // Crear el stream de entrada
    let inputStream = CharStreams.fromString(input);
    let lexer = new CalculatorLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);

    // Generar tabla de lexemas-tokens
    console.log("\n========================================");
    console.log("TABLA DE LEXEMAS-TOKENS");
    console.log("========================================");
    
    // Obtener todos los tokens
    tokenStream.fill();
    let allTokens = tokenStream.tokens;
    
    console.log("\n| # | LEXEMA | TOKEN |");
    console.log("|---|--------|-------|");
    let tokenIndex = 1;
    
    for (let i = 0; i < allTokens.length; i++) {
        let token = allTokens[i];
        if (token.type !== CalculatorLexer.EOF) {
            const tokenName = CalculatorLexer.symbolicNames[token.type] || 
                             CalculatorLexer.literalNames[token.type] ||
                             "UNKNOWN";
            let lexeme = token.text;
            // Limpiar la presentación de literales de texto
            if (tokenName === "TEXT_LITERAL" && lexeme.startsWith('"') && lexeme.endsWith('"')) {
                lexeme = lexeme.slice(1, -1);
            }
            console.log(`| ${tokenIndex} | ${lexeme} | ${tokenName} |`);
            tokenIndex++;
        }
    }

    // Análisis sintáctico
    let parser = new CalculatorParser(tokenStream);
    parser.buildParseTrees = true;
    let tree = parser.program();

    // Verificar errores de sintaxis
    if (parser._syntaxErrors && parser._syntaxErrors.length > 0) {
        console.error("\n❌ Se encontraron errores de sintaxis en la entrada.");
        return;
    } else {
        console.log("\n✓ Entrada válida.");
    }

    // Mostrar árbol de análisis sintáctico
    console.log("\n========================================");
    console.log("ÁRBOL DE ANÁLISIS SINTÁCTICO");
    console.log("========================================\n");
    const treeString = tree.toStringTree(parser.ruleNames);
    // Formatear el árbol de manera más legible
    const formattedTree = formatTree(treeString);
    console.log(formattedTree);

    // Interpretar el código
    console.log("\n========================================");
    console.log("INTERPRETACIÓN");
    console.log("========================================\n");
    const visitor = new CustomCalculatorVisitor();
    visitor.visit(tree);

    console.log("\n========================================");
}

function leerCadena() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question("Ingrese una cadena: ", (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

function formatTree(treeString, indent = 0) {
    // Función auxiliar para indentar el árbol de forma más legible
    let formatted = "";
    let depth = 0;
    let current = "";
    
    for (let i = 0; i < treeString.length; i++) {
        const char = treeString[i];
        
        if (char === '(') {
            if (current.trim()) {
                formatted += "  ".repeat(depth) + current.trim() + "\n";
                current = "";
            }
            depth++;
        } else if (char === ')') {
            if (current.trim()) {
                formatted += "  ".repeat(depth) + current.trim() + "\n";
                current = "";
            }
            depth--;
        } else if (char === ' ' && depth === 0) {
            if (current.trim()) {
                formatted += current.trim() + " ";
            }
            current = "";
        } else {
            current += char;
        }
    }
    
    if (current.trim()) {
        formatted += current.trim();
    }
    
    return formatted;
}

// Ejecuta la función principal
main();
