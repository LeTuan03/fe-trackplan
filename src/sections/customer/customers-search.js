import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CustomersSearch = ({ isPlant, handleSearch }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onKeyDown={(event) => {
        if (event.code === "Enter") {
          handleSearch(event.target.value)
        }
      }}
      defaultValue=""
      fullWidth
      placeholder={isPlant ? "Search by project name" : "Search account"}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
