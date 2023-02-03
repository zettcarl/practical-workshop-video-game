/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '🐍',
    'S': '😵',
    'P': '😦',
    'N': '💖',
    'M': '💔',
    'I': '🐒',
    'i': '🙈',
    'PLAYER': '🤠',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    OXXXXXX---
    --XXX-X-X-
    X-XXXXX-X-
    X--XXXX-X-
    XX--XXX-X-
    XXX-----X-
    ---X-XXXX-
    -X---X----
    -XXXXXXXX-
    --------IX
  `);
  maps.push(`
  XXXXXXXXXX
  I-XXX-X-X-
  -XXXXX---X
  -XXXX--X-X
  -XXX--XX-X
  -XX--XXX-X
  -X--XXXX-X
  ---XXXXX-X
  -XXXXXXX-X
  -------XOX
`);
maps.push(`
  XI--------
  OXXXXXXXX-
  -XX-------
  --X--XXXXX
  X--X--XXXX
  XX--X--XXX
  ---X-X--XX
  -X----X--X
  -XXXXX-X-X
  ---------X
  `);