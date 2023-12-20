import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const CustomersSearch = ({ isPlant, handleSearch, placeHolder }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      onKeyDown={(event) => {
        if (event.code === "Enter") {
          handleSearch(event.target.value);
        }
      }}
      onChange={(event) => {
        if (!event.target.value) handleSearch(event.target.value);
      }}
      defaultValue=""
      fullWidth
      placeholder={placeHolder ? placeHolder : isPlant ? "Tìm kiếm theo tên" : "Tìm kiếm tài khoản"}
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
