import React, { useCallback, useState } from "react";
import { Button, Stack, Box, TextField } from "@mui/material";
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

export const EjemploMultiSelect = () => {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filterValue, setFilterValue] = useState("");

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setFilterValue("");
  }, []);

  const isPopoverOpen = Boolean(anchorEl);

  const handleFilter = useCallback((items: Item[], filterValue: string) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [])

  const getItemLabel = (item: Item) => item.name;
  const filteredItems = handleFilter(items, filterValue);

  return (
    <Box width={500}>
      <Button variant="text" onClick={handleOpen}>
        MultiSelectFilter 
      </Button>

      <MultiSelect<Item>
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        items={filteredItems}
        actions
        dense
        getItemLabel={getItemLabel}
      />
    </Box >
  );
};