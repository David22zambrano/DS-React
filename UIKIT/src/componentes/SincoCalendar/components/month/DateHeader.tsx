import { Typography, Stack } from "@mui/material";
import moment from "moment";

export const DateHeader = ({ date, onDrillDown }) => {
  const fechaActual = moment(date);
  const esHoy = fechaActual.isSame(moment(), 'day');

  return (
    <Stack alignItems="flex-start" justifyContent="center">
      <Typography
        variant="body2"
        px={1}
        py={0.5}
        style={{
          cursor: 'pointer',
          backgroundColor: esHoy ? "#2063A0" : 'transparent',
          borderRadius: "100%",
          padding: "4px"
        }}
        onClick={onDrillDown}
        color={esHoy ? 'white' : 'text.secondary'}
      >
        {fechaActual.format('DD')}
      </Typography>
    </Stack>
  );
};


// import { Typography, Stack } from "@mui/material";
// import moment from "moment";
// import { Views } from 'react-big-calendar';

// export const DateHeader = ({ date, onView  }) => {
//   const fechaActual = moment(date);
//   const esHoy = fechaActual.isSame(moment(), 'day');

//   const handleDateClick = () => {
//     onView(Views.DAY, fechaActual.toDate());
//   };

//   return (
//     <Stack alignItems={"flex-start"} justifyContent={"center"}>
//       <Typography
//         variant="body2"
//         px={1}
//         py={.5}
//         style={{
//           cursor: 'pointer',
//           backgroundColor: esHoy ? "#2063A0" : 'transparent',
//           borderRadius: "100%",
//           padding: "4px"
//         }}
//         onClick={handleDateClick}
//         color={esHoy ? 'white' : 'text.secondary'}
//       >
//         {fechaActual.format('DD')}
//       </Typography>
//     </Stack>
//   );
// };


