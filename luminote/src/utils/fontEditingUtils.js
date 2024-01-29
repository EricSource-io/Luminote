export const drawWithPen = () => {
  // Implement your drawing logic here
  console.log('Drawing with a pen...');
};
// Map for font styles
export const fontStyles = {
  'BOLD': {
    fontWeight: 'bold',
  },
  'ITALIC': {
    fontStyle: 'italic',
  },
  'UNDERLINE': {
    textDecoration: 'underline',
  },
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'CODE': {
    fontFamily: 'monospace',
    backgroundColor: '#f0f0f0',
    padding: '2px 4px',
    borderRadius: '4px',
  },
  // Add more styles as needed
};

// Map for font colors
export const fontColors = {
  'FONT_COLOR_DEFAULT':{
    color: 'var(--text-normal)',
  },
  'FONT_COLOR_RED': {
    color: 'red',
  },
  'FONT_COLOR_ORANGE': {
    color: 'orange',
  },
  'FONT_COLOR_YELLOW': {
    color: 'yellow',
  },
  'FONT_COLOR_LIGHTGREEN': {
    color: 'lightgreen',
  },
  'FONT_COLOR_GREEN': {
    color: 'green',
  },
  'FONT_COLOR_LIGHTBLUE': {
    color: 'lightblue',
  },
  'FONT_COLOR_BLUE': {
    color: 'blue',
  },
  'FONT_COLOR_DARKBLUE': {
    color: 'darkblue',
  },
  'FONT_COLOR_DARKVIOLET': {
    color: 'darkviolet',
  },
  // Add more colors as needed
};

// Combine text styles and font colors into fontStyleMap
export const fontStyleMap = { ...fontStyles, ...fontColors };

// Default font colors array
export const defaultFontColors = [
  'FONT_COLOR_DEFAULT',
  'FONT_COLOR_RED', 
  'FONT_COLOR_ORANGE',
  'FONT_COLOR_YELLOW',
  'FONT_COLOR_LIGHTGREEN',
  'FONT_COLOR_GREEN',
  'FONT_COLOR_LIGHTBLUE',
  'FONT_COLOR_BLUE',
  'FONT_COLOR_DARKBLUE',
  'FONT_COLOR_DARKVIOLET'
];
