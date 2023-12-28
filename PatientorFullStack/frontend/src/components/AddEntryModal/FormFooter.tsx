import { Alert, Button } from '@mui/material';

interface FormFooterProps {
  errorMessage: string;
  closeModal: () => void;
}

const FormFooter = ({ errorMessage, closeModal }: FormFooterProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        gap: 14,
        alignItems: 'center',
      }}
    >
      {errorMessage && (
        <Alert severity="error" style={{ flex: 1 }}>
          {errorMessage}
        </Alert>
      )}
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
      <Button variant="contained" color="error" onClick={closeModal}>
        Cancel
      </Button>
    </div>
  );
};

export default FormFooter;
