import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
    const statusCheck=props.isCompleted
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
useEffect(() => {
if(statusCheck===true){
    handleClick()
    console.log(statusCheck);
}

}, [statusCheck])
  return (
    <>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClick} sx={{display:"none"}}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Rapor gönderimi başarıyla tamamlandı !
        </Alert>
      </Snackbar>
    </Stack>
    </>
  );
}