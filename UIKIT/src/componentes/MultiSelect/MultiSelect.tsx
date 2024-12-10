import { Checkbox, ListItemIcon, MenuItem, Popover, Stack, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

export interface MultiSelectProps<T> {
    topPanel?: React.ReactNode;
    actions?: React.ReactNode;
    anchorEl: HTMLElement | null;
    dense?: boolean;
    open: boolean;
    items: T[];
    onClose?: () => void;
    handleFilter: (items: T[], filterValue: string) => T[];
    getItemLabel: (item: T) => string;
}

export function MultiSelect<T>({
    topPanel,
    actions,
    open,
    onClose,
    items,
    handleFilter,
    getItemLabel,
    anchorEl,
    dense,
}: MultiSelectProps<T>) {
    const [filterValue, setFilterValue] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    const filteredItems = handleFilter(items, filterValue);

    const handleChangeTextField = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterValue(e.target.value);
        },[]);

    const handleCheckboxChange = useCallback(
        (item: T) => {
            setSelectedItems((prevSelected) =>
                prevSelected.includes(item)
                    ? prevSelected.filter((selectedItem) => selectedItem !== item)
                    : [...prevSelected, item]
            );
        }, []);

    const handleSelectAll = useCallback(() => {
        const allSelected = selectedItems.length === filteredItems.length;
        setSelectedItems(allSelected ? [] : filteredItems);
    }, [filteredItems, selectedItems]);

    const allSelected = filteredItems.length > 0 && selectedItems.length === filteredItems.length;

    const sortedFilteredItems = [
        ...filteredItems.filter((item) => selectedItems.includes(item)),
        ...filteredItems.filter((item) => !selectedItems.includes(item)),
    ];

    return (
        <Popover
            elevation={8}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={open}
            onClose={onClose}
        >
            <Stack height="auto" minWidth="320px">
                <Stack height="auto" py={2} px={1}>
                    {topPanel ? (
                        React.cloneElement(topPanel as React.ReactElement, {
                            setFilterValue
                        })
                    ) : (
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Escribe algo"
                            label="Buscar"
                            value={filterValue}
                            onChange={handleChangeTextField}
                        />
                    )}
                </Stack>

                <Stack height="auto" maxHeight="300px" overflow="auto">
                    {sortedFilteredItems.length > 2 && (
                        <MenuItem dense={dense} onClick={handleSelectAll}>
                            <ListItemIcon>
                                <Checkbox checked={allSelected} />
                            </ListItemIcon>
                            Todos los items
                        </MenuItem>
                    )}

                    {sortedFilteredItems.length > 0 ? (
                        sortedFilteredItems.map((item) => (
                            <MenuItem dense={dense} key={getItemLabel(item)} onClick={() => handleCheckboxChange(item)}>
                                <ListItemIcon>
                                    <Checkbox checked={selectedItems.includes(item)} />
                                </ListItemIcon>
                                {getItemLabel(item)}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No se encontraron resultados</MenuItem>
                    )}
                </Stack>
                {actions}
            </Stack>
        </Popover>
    );
}


// import { Checkbox, ListItemIcon, MenuItem, Popover, Stack, TextField } from "@mui/material";
// import React, { useCallback, useState } from "react";

// export interface MultiSelectProps<T> {
//     topPanel?: React.ReactNode;
//     actions?: React.ReactNode;
//     anchorEl: HTMLElement | null;
//     dense?: boolean;
//     open: boolean;
//     items: T[];
//     onClose?: () => void;
//     handleFilter: (items: T[], filterValue: any) => T[];
//     getItemLabel: (item: T) => string;
// }

// export function MultiSelect<T>({
//     topPanel,
//     actions,
//     open,
//     onClose,
//     items,
//     handleFilter,
//     getItemLabel,
//     anchorEl,
//     dense,
// }: MultiSelectProps) {
//     const [filterValue, setFilterValue] = useState<string>(""); // Puede ser string o cualqrer tipo dependiendo del filtrador que e vya usar
//     const [selectedItems, setSelectedItems] = useState<T[]>([]);

//     const filteredItems = handleFilter(items, filterValue);

//     const handleChangeTextField = useCallback(
//         (e: React.ChangeEvent<HTMLInputElement>) => {
//             setFilterValue(e.target.value);
//         },
//         []
//     );

//     const handleCheckboxChange = useCallback(
//         (item: T) => {
//             setSelectedItems((prevSelected) =>
//                 prevSelected.includes(item)
//                     ? prevSelected.filter((selectedItem) => selectedItem !== item)
//                     : [...prevSelected, item]
//             );
//         },
//         []
//     );

//     const handleSelectAll = useCallback(() => {
//         const allSelected = selectedItems.length === filteredItems.length;
//         setSelectedItems(allSelected ? [] : filteredItems);
//     }, [filteredItems, selectedItems]);

//     const allSelected = filteredItems.length > 0 && selectedItems.length === filteredItems.length;

//     const sortedFilteredItems = [
//         ...filteredItems.filter((item) => selectedItems.includes(item)),
//         ...filteredItems.filter((item) => !selectedItems.includes(item)),
//     ];

//     return (
//         <Popover
//             elevation={8}
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//             }}
//             open={open}
//             onClose={onClose}
//         >
//             <Stack height="auto" minWidth="320px">
//                 <Stack height="auto" py={2} px={1}>
//                     {topPanel ? (
//                         React.cloneElement(topPanel as React.ReactElement, {
//                             setFilterValue
//                         })
//                     ) : (
//                         <TextField
//                             fullWidth
//                             size="small"
//                             placeholder="Escribe algo"
//                             label="Buscar"
//                             value={filterValue}
//                             onChange={handleChangeTextField}
//                         />
//                     )}
//                 </Stack>

//                 <Stack height="auto" maxHeight="300px" overflow="auto">
//                     {sortedFilteredItems.length > 2 && (
//                         <MenuItem dense={dense} onClick={handleSelectAll}>
//                             <ListItemIcon>
//                                 <Checkbox checked={allSelected} />
//                             </ListItemIcon>
//                             Todos los items
//                         </MenuItem>
//                     )}

//                     {sortedFilteredItems.length > 0 ? (
//                         sortedFilteredItems.map((item, index) => (
//                             <MenuItem dense={dense} key={index} onClick={() => handleCheckboxChange(item)}>
//                                 <ListItemIcon>
//                                     <Checkbox checked={selectedItems.includes(item)} />
//                                 </ListItemIcon>
//                                 {getItemLabel(item)}
//                             </MenuItem>
//                         ))
//                     ) : (
//                         <MenuItem disabled>No se encontraron resultados</MenuItem>
//                     )}
//                 </Stack>
//                 {actions}
//             </Stack>
//         </Popover>
//     );
// }



// import { Checkbox, ListItemIcon, MenuItem, Popover, Stack, TextField } from "@mui/material";
// import React, { useCallback, useState } from "react";

// export interface MultiSelectProps<T = any> {
//     topPanel?: React.ReactNode;
//     actions?: React.ReactNode;
//     anchorEl: HTMLElement | null;
//     dense?: boolean;
//     open: boolean;
//     items: T[];
//     onClose?: () => void;
//     handleFilter: (items: T[], filterText: string) => T[];
//     getItemLabel: (item: T) => string;
// }
// export function MultiSelect<T>({ topPanel, actions, open, onClose, items, handleFilter, getItemLabel, anchorEl, dense }: MultiSelectProps) {

//     const [filterText, setFilterText] = useState(" ");
//     const [selectedITems, setSelectedITems] = useState<T[]>([]);

//     const filteredItems = handleFilter(items, filterText);

//     const handleChangeTextfield = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         setFilterText(e.target.value);
//     }, []);

//     const handleCheckboxChange = useCallback(
//         (item: T) => {
//             setSelectedITems((prevSeleccionados) =>
//                 prevSeleccionados.includes(item)
//                     ? prevSeleccionados.filter((itemSeleccionado) => itemSeleccionado !== item)
//                     : [...prevSeleccionados, item]
//             );
//         },
//         []
//     );

//     const controlSeleccionarTodos = useCallback(() => {
//         const todosSeleccionados = selectedITems.length === filteredItems.length;
//         setSelectedITems(todosSeleccionados ? [] : filteredItems);
//     }, [filteredItems, selectedITems]);

//     const todosSeleccionados = filteredItems.length > 0 && selectedITems.length === filteredItems.length;

//     const filteredItemsOrdenados = [
//         ...filteredItems.filter((item) => selectedITems.includes(item)),
//         ...filteredItems.filter((item) => !selectedITems.includes(item)),
//     ];
//     return (
//         <>
//             <Popover
//                 elevation={8}
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'left',
//                 }}
//                 open={open}
//                 onClose={onClose}
//             >
//                 <Stack height="auto" minWidth="320px">
//                     <Stack height={"auto"} py={2} px={1}>
//                         {topPanel ? (
//                             topPanel
//                         ) : (
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 placeholder="Escribe algo"
//                                 label="Buscar"
//                                 value={filterText}
//                                 onChange={handleChangeTextfield}
//                             />
//                         )}
//                     </Stack>

//                     <Stack height={"auto"} maxHeight={"300px"} overflow={"auto"} >

//                         {filteredItemsOrdenados.length > 2 && (
//                             <MenuItem dense={dense} onClick={controlSeleccionarTodos}>
//                                 <ListItemIcon>
//                                     <Checkbox checked={todosSeleccionados} />
//                                 </ListItemIcon>
//                                 Todos los items
//                             </MenuItem>
//                         )}

//                         {filteredItemsOrdenados.length > 0 ? (
//                             filteredItemsOrdenados.map((item, index) => (
//                                 <MenuItem dense={dense} key={index} onClick={() => handleCheckboxChange(item)}>
//                                     <ListItemIcon>
//                                         <Checkbox checked={selectedITems.includes(item)} />
//                                     </ListItemIcon>
//                                     {getItemLabel(item)}
//                                 </MenuItem>
//                             ))
//                         ) : (
//                             <MenuItem disabled>No se encontraron resultados</MenuItem>
//                         )}
//                     </Stack>
//                     {actions}
//                 </Stack>
//             </Popover>
//         </>
//     )
// }

// export const MultiSelect = ({ topPanel, actions, open, onClose, items, handleFilter, getItemLabel, anchorEl, dense }: MultiSelectProps) => {

//     const [filterText, setFilterText] = useState(" ");
//     const [selectedITems, setSelectedITems] = useState<any[]>([]);

//     const filteredItems = handleFilter(items, filterText);

//     const handleChangeTextfield = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         setFilterText(e.target.value);
//     }, []);

//     const handleCheckboxChange = useCallback(
//         (item: any) => {
//             setSelectedITems((prevSeleccionados) =>
//                 prevSeleccionados.includes(item)
//                     ? prevSeleccionados.filter((itemSeleccionado) => itemSeleccionado !== item)
//                     : [...prevSeleccionados, item]
//             );
//         },
//         []
//     );

//     const controlSeleccionarTodos = useCallback(() => {
//         const todosSeleccionados = selectedITems.length === filteredItems.length;
//         setSelectedITems(todosSeleccionados ? [] : filteredItems);
//     }, [filteredItems, selectedITems]);

//     const todosSeleccionados = filteredItems.length > 0 && selectedITems.length === filteredItems.length;

//     const filteredItemsOrdenados = [
//         ...filteredItems.filter((item) => selectedITems.includes(item)),
//         ...filteredItems.filter((item) => !selectedITems.includes(item)),
//     ];

//     return (
//         <Popover
//             elevation={8}
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//             }}
//             open={open}
//             onClose={onClose}
//         >
//             <Stack height="auto" minWidth="320px">
//                 <Stack height={"auto"} py={2} px={1}>
//                     {topPanel ? (
//                         topPanel
//                     ) : (
//                         <TextField
//                             fullWidth
//                             size="small"
//                             placeholder="Escribe algo"
//                             label="Buscar"
//                             value={filterText}
//                             onChange={handleChangeTextfield}
//                         />
//                     )}
//                 </Stack>

//                 <Stack height={"auto"} maxHeight={"300px"} overflow={"auto"} >

//                     {filteredItemsOrdenados.length > 2 && (
//                         <MenuItem dense={dense} onClick={controlSeleccionarTodos}>
//                             <ListItemIcon>
//                                 <Checkbox checked={todosSeleccionados} />
//                             </ListItemIcon>
//                             Todos los items
//                         </MenuItem>
//                     )}

//                     {filteredItemsOrdenados.length > 0 ? (
//                         filteredItemsOrdenados.map((item, index) => (
//                             <MenuItem dense={dense} key={index} onClick={() => handleCheckboxChange(item)}>
//                                 <ListItemIcon>
//                                     <Checkbox checked={selectedITems.includes(item)} />
//                                 </ListItemIcon>
//                                 {getItemLabel(item)}
//                             </MenuItem>
//                         ))
//                     ) : (
//                         <MenuItem disabled>No se encontraron resultados</MenuItem>
//                     )}
//                 </Stack>
//                 {actions ? (
//                     actions
//                 ) : (
//                     <Stack height={"auto"} flexDirection={"row"} justifyContent={"space-between"} py={2} px={1} >
//                         <Button size="small" color="primary" variant="text">
//                             Limpiar
//                         </Button>
//                         <Button size="small" color="primary" variant="contained">
//                             Aplicar
//                         </Button>
//                     </Stack>
//                 )}
//             </Stack>
//         </Popover>
//     );
// };
