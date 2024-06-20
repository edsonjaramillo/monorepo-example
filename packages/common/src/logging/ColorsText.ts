export const colorsText = {
  BLACK: '\x1B[30m',
  RED: '\x1B[31m',
  GREEN: '\x1B[32m',
  YELLOW: '\x1B[33m',
  BLUE: '\x1B[34m',
  MAGENTA: '\x1B[35m',
  CYAN: '\x1B[36m',
  WHITE: '\x1B[37m',
  ORANGE: '\x1B[38,5,208m',
  RESET: '\x1B[0m',
};

export type ColorsText = keyof typeof colorsText;
