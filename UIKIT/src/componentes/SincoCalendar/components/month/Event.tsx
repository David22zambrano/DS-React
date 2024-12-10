import { MyEvent } from '../../generales';
import { Box, Stack, Theme, Typography } from '@mui/material';


interface CustomEventProps {
    event: MyEvent;
}

export const Evento = ({ event }: CustomEventProps) => {
    return (
        <Stack gap={1} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-start"} bgcolor={"white"} borderRadius={1} >
            <Box
                width={"2px"}
                height={"15px"}
                borderRadius={1}
                sx={{ backgroundColor: (theme: Theme) => theme.palette.primary.main }}
                ml={.5}
            />
            <Typography variant="caption" noWrap color="text.secondary" pl={1}>
                {event.title}
            </Typography>
        </Stack >
    );
};


