import { useState } from 'react';
import { Box, Typography, Paper, Container, Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  maxWidth: 900,
  width: '100%',
  mx: 'auto',
}));

function parseCSV(csv: string) {
  const lines = csv.split('\n').filter(Boolean);
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => line.split(','));
  return { headers, rows };
}

const MLTrainer = () => {
  const [csvData, setCsvData] = useState<{ headers: string[]; rows: string[][] } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvData(parseCSV(text));
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <StyledPaper>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1a237e', mb: 2 }}>
            Machine Learning Trainer
          </Typography>
          <Typography paragraph sx={{ color: '#1a237e' }}>
            Upload your historical temperature CSV file, preview the data, and train a forecasting model.
          </Typography>
          <Box sx={{ my: 3 }}>
            <Input type="file" inputProps={{ accept: '.csv' }} onChange={handleFileUpload} />
          </Box>
          {csvData && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ color: '#1a237e', mb: 2 }}>CSV Preview</Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      {csvData.headers.map((header, idx) => (
                        <TableCell key={idx}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {csvData.rows.slice(0, 10).map((row, idx) => (
                      <TableRow key={idx}>
                        {row.map((cell, cidx) => (
                          <TableCell key={cidx}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Showing first 10 rows.
              </Typography>
            </Box>
          )}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h6" sx={{ color: '#1a237e', mb: 2 }}>Model Training (Coming Soon)</Typography>
            <Typography variant="body1" sx={{ color: '#1a237e' }}>
              Here you will be able to select model parameters and train a forecasting model on your data.
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default MLTrainer; 