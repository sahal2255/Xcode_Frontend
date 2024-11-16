import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

function valuetext(value) {
  return `${value}`;
}

export default function Filter() {
  const [value, setValue] = React.useState([300, 10000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClear = () => {
    setValue([300, 10000]); // Reset to initial range
  };

  const handleApply = () => {
    console.log(`Applied range: ${value[0]} to ${value[1]}`); 
  };

  return (
    <div className="filter-container">
      <Box sx={{ width: 350 }}>
        {/* Value Display */}
        <div
          className="value-display mt-5"
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 10px',
          }}
        >
          <span
            className="value"
            style={{
              border: '2px solid #000',
              width: '45%',
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: '5px',
              fontWeight: 'bold',  // Added bold for emphasis
            }}
          >
            {value[0]}
          </span>
          <span
            className="value"
            style={{
              border: '2px solid #000',
              width: '45%',
              textAlign: 'center',
              padding: '8px 0',
              borderRadius: '5px',
              fontWeight: 'bold',  // Added bold for emphasis
            }}
          >
            {value[1]}
          </span>
        </div>

        {/* Slider */}
        <Slider
          getAriaLabel={() => 'Value range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          valueLabelFormat={(value) => `${value}`}
          min={300}
          max={10000}
          step={100}  
        />
        <div
          className="button-group m-4"
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            style={{
              width: '45%',
              padding: '10px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            style={{
              width: '45%',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#7C3AED', // Violet color
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            Apply
          </Button>
        </div>
      </Box>
    </div>
  );
}
