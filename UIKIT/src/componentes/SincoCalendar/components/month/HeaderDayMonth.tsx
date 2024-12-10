import { Box, Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/es"; 
moment.locale("es");

export const HeaderDayMonth = ({ date }) => {
    const currentDate = moment(date).locale('es');
    
    return (
        <Box height={30} display="flex" alignItems="center" justifyContent="flex-start">
            <Typography variant="caption" color="text.secondary">
                {currentDate.format('dddd')}
            </Typography>
        </Box>
    );
};
