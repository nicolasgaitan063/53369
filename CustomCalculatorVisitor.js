import CalculatorVisitor from "./generated/CalculatorVisitor.js";
import CalculatorParser from "./generated/CalculatorParser.js";

export class CustomCalculatorVisitor extends CalculatorVisitor {

    constructor() {
        super();
        this.memory = new Map();
    }

    // Visitador para program
    visitProgram(ctx) {
        return this.visitChildren(ctx);
    }

    // Visitador para simpleStatement
    visitSimpleStatement(ctx) {
        return this.visitChildren(ctx);
    }

    // Visitador para switchStatement
    visitSwitchStatement(ctx) {
        const switchVar = ctx.IDENTIFIER().getText();
        const switchValue = this.memory.get(switchVar);

        // Procesa cada caseSection
        const caseSections = ctx.caseSection();
        if (caseSections) {
            for (let i = 0; i < caseSections.length; i++) {
                const caseCtx = caseSections[i];
                const caseValue = this.visitConstant(caseCtx.constant());
                
                if (switchValue === caseValue) {
                    const statements = caseCtx.simpleStatement();
                    for (let j = 0; j < statements.length; j++) {
                        this.visit(statements[j]);
                    }
                    return null;
                }
            }
        }

        // Procesa defaultSection si existe
        const defaultSection = ctx.defaultSection();
        if (defaultSection) {
            this.visit(defaultSection);
        }

        return null;
    }

    // Visitador para caseSection
    visitCaseSection(ctx) {
        const constant = this.visitConstant(ctx.constant());
        const statements = ctx.simpleStatement();
        for (let i = 0; i < statements.length; i++) {
            this.visit(statements[i]);
        }
        return constant;
    }

    // Visitador para defaultSection
    visitDefaultSection(ctx) {
        const statements = ctx.simpleStatement();
        for (let i = 0; i < statements.length; i++) {
            this.visit(statements[i]);
        }
        return null;
    }

    // Visitador para assignmentStatement
    visitAssignmentStatement(ctx) {
        const identifier = ctx.IDENTIFIER().getText();
        const value = this.visitConstant(ctx.constant());
        this.memory.set(identifier, value);
        return value;
    }

    // Visitador para outputStatement
    visitOutputStatement(ctx) {
        const text = this.visitTextLiteral(ctx.TEXT_LITERAL());
        console.log(text);
        return null;
    }

    // Visitador para constant
    visitConstant(ctx) {
        if (ctx.NUMBER()) {
            return this.visitNumber(ctx.NUMBER());
        } else if (ctx.TEXT_LITERAL()) {
            return this.visitTextLiteral(ctx.TEXT_LITERAL());
        }
        return null;
    }

    // Visitador para TEXT_LITERAL
    visitTextLiteral(token) {
        if (!token) return "";
        let text = token.getText();
        // Elimina las comillas al inicio y final
        if (text.startsWith('"') && text.endsWith('"')) {
            text = text.slice(1, -1);
        }
        return text;
    }

    // Visitador para IDENTIFIER
    visitIdentifier(token) {
        if (!token) return "";
        return token.getText();
    }

    // Visitador para NUMBER
    visitNumber(token) {
        if (!token) return 0;
        return parseInt(token.getText());
    }
}