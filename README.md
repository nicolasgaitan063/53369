# 53369

Proyecto de un analizador sintáctico en Node.js usando ANTLR.

## Contenido del repositorio

- `Calculator.g4` - gramática del lenguaje.
- `grammar.txt` - archivo de texto con la gramática asignada.
- `index.js` - programa principal que lee la entrada, parsea y muestra el resultado.
- `package.json` - dependencias y script de ejecución.
- `generated/` - archivos generados por ANTLR (`CalculatorLexer.js`, `CalculatorParser.js`, etc.).
- `CustomCalculatorListener.js` - listener personalizado (si se usa).
- `CustomCalculatorVisitor.js` - visitor personalizado para ejecutar el árbol.
- `input.txt` - archivo de entrada usado por defecto.
- `input_valid_1.txt` y `input_valid_2.txt` - ejemplos válidos.
- `input_invalid_1.txt` y `input_invalid_2.txt` - ejemplos inválidos.

## Cómo instalar

1. Abre una terminal en esta carpeta.
2. Ejecuta:

```bash
npm install
```

## Cómo ejecutar

```bash
npm start
```

El programa lee por defecto el archivo `input.txt`.

## Cómo usar los ejemplos

- Copia el contenido de cualquiera de los archivos `input_valid_*.txt` o `input_invalid_*.txt` en `input.txt`.
- Luego ejecuta `npm start`.

## Ejemplos incluidos

### Entrada válida 1
`x = 10;`

### Entrada válida 2
```c
switch(a){
    case 1:
        x = 5;
    default:
        output("fin");
}
```

### Entrada inválida 1
`x = 10`

### Entrada inválida 2
```c
switch(x){
    case:
        output("hola");
}
```

## Notas importantes

- `x = 10;` es válido porque termina con punto y coma.
- `x = 10` es inválido porque falta el `;`.
- `case` debe tener un valor después, por ejemplo `case 1:`.
- Al hacer el repositorio, puedes subir primero la carpeta principal con `README.md`, `Calculator.g4`, `index.js`, `package.json`, `generated/`, `CustomCalculatorListener.js`, `CustomCalculatorVisitor.js` y luego agregar los archivos `.txt`.

