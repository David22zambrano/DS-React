import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { MultiSelect } from "./MultiSelect";

interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
];

export const PruebaMultiSelect = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const handleFilter = (items: Item[], filterValue: string) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const getItemLabel = (item: Item) => item.name;

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open MultiSelect
      </Button>

      <MultiSelect<Item>
        topPanel={
          <TextField
            fullWidth
            size="small"
            placeholder="Filtrar"
            label="Buscar"
          />
        }
        // actions={}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={items}
        dense
        handleFilter={handleFilter}
        getItemLabel={getItemLabel}
      />
    </div>
  );
};

