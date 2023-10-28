import { createTheme } from "@mui/material";
import { ptBR } from "@mui/material/locale";
export const theme = createTheme({
    typography:{
      fontFamily: [
        'Kanit',
        'sans serif'
      ].join(','),
      fontSize: 15
    },
    palette: {
      primary: {
        main: '#FEA1A1',        
      },
      secondary: {
        main: '#F9FBE7',
      },      
    },    
  },
  ptBR
  );