export const applyTextStyle = (style) => {
  document.execCommand(style, false, null);
};

// Function to check the current style of a text element
export const checkTextStyle = (style) => {
  // Use queryCommandState to check if the specified style is currently active
  return document.queryCommandState(style);
};

export const drawWithPen = () => {
  // Implement your drawing logic here
  console.log('Drawing with a pen...');
};