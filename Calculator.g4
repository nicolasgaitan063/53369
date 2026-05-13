grammar Calculator;

//Reglas de Parser
program: (simpleStatement)*;
simpleStatement: switchStatement | assignmentStatement | outputStatement;
switchStatement: 'switch' '(' IDENTIFIER ')' '{' (caseSection)* (defaultSection)? '}';
caseSection: 'case' constant ':' (simpleStatement)*;
defaultSection: 'default' ':' (simpleStatement)*;
assignmentStatement: IDENTIFIER '=' constant ';';
outputStatement: 'output' '(' TEXT_LITERAL ')' ';';
constant: NUMBER | TEXT_LITERAL;

//Tokens Léxicos
TEXT_LITERAL: '"' (~'"')* '"';
IDENTIFIER: LETTER (LETTER | DIGIT | '_')*;
NUMBER: DIGIT (DIGIT)*;

fragment LETTER: [a-zA-Z];
fragment DIGIT: [0-9];

WS: [ \t\n\r]+ -> skip;
