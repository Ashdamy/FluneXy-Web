#!/usr/bin/env bash
# lint + build + regresion (escritorio y movil). Imprime una linea de resumen al final.
AQUI="$(cd "$(dirname "$0")" && pwd)"
cd "$AQUI/../../frontend-react" || exit 1
LINT=$(npm run lint --silent 2>&1); LE=$?
BUILD=$(npm run build --silent 2>&1); BE=$?
cd "$AQUI" || exit 1
REG=$(node regresion.mjs 2>&1); RE=$?
MOV=$(node regresion.mjs --movil 2>&1)
echo "$LINT" | grep -iE "warning|error|Found" | head -20
echo "$BUILD" | grep -iE "error|✓ built" | head -10
echo "$REG" | grep -E "FALLA" | head -40
echo "$MOV" | grep -E "FALLA" | head -20
LINEA_LINT=$([ $LE -eq 0 ] && echo "lint ok" || echo "lint FALLA")
LINEA_BUILD=$([ $BE -eq 0 ] && echo "build ok" || echo "build FALLA")
RES=$(echo "$REG" | grep RESULTADO | sed 's/RESULTADO //' | sed 's/ comprobaciones pasan//')
RMOV=$(echo "$MOV" | grep RESULTADO | sed 's/RESULTADO (móvil) //' | sed 's/ comprobaciones pasan//')
echo "VERIFICACION: $LINEA_LINT, $LINEA_BUILD, regresión $RES (escritorio) y $RMOV (móvil)"
