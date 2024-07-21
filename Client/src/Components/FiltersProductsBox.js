import React, { useId } from "react";
import UseFilters from "../Hokks/UseFilters";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AddIcon from "@mui/icons-material/Add";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Category } from "@mui/icons-material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FiltersProductsBox = () => {
  const { filters, setFilters } = UseFilters();

  const dropdowns_id = useId();

  const handlerSearchFilters = (event) => {
    //console.log(event.target.value);
    setFilters((prevState) => ({
      ...prevState,
      search: event.target.value,
    }));
  };

  const handlerCategoriesFilter = (event) => {
    console.log(event.target.innerText);
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.innerText,
    }));
  };

  const handlerPricesCategories = (event) => {
    //console.log(event.target.innerText);

    if (event.target.innerText == "All") {
      setFilters((prevState) => ({
        ...prevState,
        minPrice: 2000,
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        minPrice: event.target.innerText,
      }));
    }
  };

  const handlerStoreFilters = (event) => {
    console.log(event.target.innerText);
    setFilters((prevState) => ({
      ...prevState,
      store: event.target.innerText,
    }));
  };

  return (
    <Box
      sx={{
        display: { xs: "block", sm: "flex" },
        width: { xs: "95%", sm: "98%" },
        padding: "10px",
        backgroundColor: "white",
        margin: "10px ",
        borderRadius: "8px",
      }}
    >
      <IconButton
        size="small"
        aria-label="notificaions"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="black"
        sx={{
          display: { xs: "none", sm: "block" },
          mr: 2,
          borderRadius: "8px",
          backgroundColor: "#EDE7F6",
          color: "#8E05C2",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "#8E05C2",
            color: "#EDE7F6",
            borderRadius: "8px",
            transition: "0.5s",
          },
        }}
      >
        <AutoAwesomeMosaicIcon />
      </IconButton>
      <TextField
        sx={{
          "& .MuiFormLabel-root": {
            fontSize: "13px",
            marginTop: "2px",
            color: "#8E05C2",
            fontWeight: "bold",
          },
          borderRadius: "8px",
          backgroundColor: "#FAFAFB",
          width: { xs: "100%", sm: "25%" },
          marginRight: "15px",
        }}
        size="small"
        autoComplete="off"
        onChange={handlerSearchFilters}
        label="Search products..."
        InputProps={{
          sx: {
            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              border: "2px solid #EDE7F6 !important",
              borderRadius: "8px",
            },
            "&:hover": {
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                border: "2px solid #8E05C2 !important",
                borderRadius: "8px",
              },
            },
          },
        }}
      />

      <Autocomplete
        disablePortal
        size="small"
        id={dropdowns_id}
        options={categories_dropdonw}
        onChange={handlerCategoriesFilter}
        sx={{
          display: { xs: "none", sm: "block" },
          width: { xs: "100%", sm: "17%" },
          marginRight: "15px",
          backgroundColor: "#FAFAFB",
          "& .MuiFormLabel-root": {
            fontSize: "13px !important",
            marginTop: "2px",
            color: "#8E05C2",
            fontWeight: "bold",
          },
          "&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot": {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #EDE7F6 !important",
          },
          "& .css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
            {
              display: "none",
            },
        }}
        renderInput={(params) => (
          <TextField {...params} label="Categories..." />
        )}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
      />

      <Autocomplete
        disablePortal
        size="small"
        onChange={handlerPricesCategories}
        id={dropdowns_id}
        options={prices_dropdonw}
        sx={{
          display: { xs: "none", sm: "block" },
          width: { xs: "100%", sm: "17%" },
          marginRight: "15px",
          backgroundColor: "#FAFAFB",
          "& .MuiFormLabel-root": {
            fontSize: "13px !important",
            marginTop: "2px",
            color: "#8E05C2",
            fontWeight: "bold",
          },
          "&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot": {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #EDE7F6 !important",
          },
          "& .css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
            {
              display: "none",
            },
        }}
        renderInput={(params) => <TextField {...params} label="Prices..." />}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
      />

      <Autocomplete
        disablePortal
        size="small"
        id={dropdowns_id}
        onChange={handlerStoreFilters}
        options={stores_dropdonw}
        sx={{
          display: { xs: "none", sm: "block" },
          width: { xs: "100%", sm: "17%" },
          marginRight: "15px",
          backgroundColor: "#FAFAFB",
          "& .MuiFormLabel-root": {
            fontSize: "13px !important",
            marginTop: "2px",
            color: "#8E05C2",
            fontWeight: "bold",
          },
          "&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot": {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #EDE7F6 !important",
          },
          "& .css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator":
            {
              display: "none",
            },
        }}
        renderInput={(params) => <TextField {...params} label="Store..." />}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          );
        }}
      />

      <Button
        sx={{
          width: { xs: "100%", sm: "20%" },
          textTransform: "none",
          backgroundColor: "#8E05C2 !important",
          fontWeight: "bold",
          borderRadius: "8px",
          marginTop: { xs: "10px", sm: "0" },
        }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Product
      </Button>
    </Box>
  );
};
export default FiltersProductsBox;

const categories_dropdonw = [
  { label: "All" },
  { label: "Laptops" },
  { label: "Smartphones" },

  // { label: "Technology" },
  // { label: "Clothes" },
  // { label: "Appliances" },
  // { label: "Cars tools" },
  // { label: "Others" },
];

const prices_dropdonw = [
  { label: "All" },
  { label: "20" },
  { label: "40 " },
  { label: "60" },
  { label: "80" },
  { label: "100" },
];

const stores_dropdonw = [
  { label: "All" },
  { label: "Amazon" },
  { label: "TikTok Shop" },
  { label: "Temu" },
];
