import React, { useState } from 'react';

const fontOptions = ['Calibri', 'Arial', 'Times New Roman', 'Roboto'];

function FontSelector () {
    // State to manage the selected font
    const [selectedFont, setSelectedFont] = useState(fontOptions[0]);

    // Event handler for changing the selected font
    const handleFontChange = (e) => {
        setSelectedFont(e.target.value);
    };

    return (
        <select className='font-selector' value={selectedFont} onChange={handleFontChange}>
            {fontOptions.map((font) => (
                <option key={font} value={font}>
                    {font}
                </option>
            ))}
        </select>
    );
} export default FontSelector;
