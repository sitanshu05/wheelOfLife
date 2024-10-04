import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function FilledAlerts({type,text,setError}: {type:"success" | "info" | "warning" | "error",text:string,setError : ()=>{}}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity={type} onClose={() => setError()}>
        {text}
      </Alert>
    </Stack>
  );
}