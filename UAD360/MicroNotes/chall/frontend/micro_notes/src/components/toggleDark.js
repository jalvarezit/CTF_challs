import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Checkbox from '@mui/material/Checkbox';

export default function ToggleDark(props) {
  return (
    <div>
      <Checkbox
        id="checkbox-toggle"
        icon={<Brightness7Icon  />}
        checkedIcon={<Brightness4Icon  />}
        onClick={() => {
          props.toggleDark();
        }}
      />
    </div>
  );
}