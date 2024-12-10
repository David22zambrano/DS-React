import React, { useCallback, useState, useEffect } from 'react';
import {
    Modal,
    Box,
    Typography,
    Icon,
    IconButton,
    Button,
    Stack,
    Theme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { stateConfig } from './Data';
import { ModalProps } from './interfaces';

export const ModalSinco: React.FC<ModalProps> = ({
    open,
    onCancel,
    onAccept,
    title,
    description,
    state,
    bgIcon,
    ...props
}) => {
    const [openModal, setOpenModal] = useState(open);

    useEffect(() => {
        setOpenModal(open);
    }, [open]);

    const handleModal = useCallback(() => {
        setOpenModal(prev => !prev);
    }, []);

    const { color, icon, defaultDescription } = stateConfig[state];

    return (
        <Modal open={openModal} onClose={handleModal} {...props} sx={{
            boxShadow: 8
        }} >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "400px",
                    bgcolor: 'background.paper',
                    borderRadius: "4px",
                    boxShadow: 24,
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" >
                    <Stack direction="row" alignItems="center" p={1} gap={1.5}>
                        <Box>
                            <Icon color={color} sx={{
                                display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "100%", backgroundColor: (theme: Theme) => theme.palette[color]?.[100], width: "36px", height: "36px",
                                ".MuiSvgIcon-root ": {
                                    width: "25px",
                                    height: "25px"
                                }
                            }}>{icon}</Icon>
                        </Box>
                        <Typography variant="h6" color="text.primary" >{title}</Typography>
                    </Stack>
                    <IconButton onClick={handleModal}>
                        <Close color='action' />
                    </IconButton>
                </Stack>
                <Stack py={1} px={3} gap={1.5}>
                    <Typography variant="body1" >
                        {description || defaultDescription}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={1} p={1} borderRadius={2} justifyContent="flex-end" bgcolor={(theme: Theme) => theme.palette.grey[50]}
                    sx={{ borderRadius: "4px" }}
                >
                    <Button size="small" variant="text" color="inherit" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button size="small" variant="contained" color={color} onClick={onAccept}>
                        Aceptar
                    </Button>
                </Stack>
            </Box>
        </Modal >
    );
};
