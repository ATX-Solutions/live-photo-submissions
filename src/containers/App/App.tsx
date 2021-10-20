import { Button, Paper, Typography, Box, Chip } from '@mui/material';
import { useState } from 'react';

interface Quote {
    text: string;
    author: string;
    tag: string;
}

function App() {
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState({} as Quote);

    const getRandomQuote = async () => {
        setLoading(true);

        try {
            const { quotes } = await (await fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=1')).json();
            setQuote(quotes[0] as Quote);
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    return (
        <div className='App'>
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Button variant='contained' onClick={getRandomQuote} disabled={loading}>
                    Click me
                </Button>
            </Box>
            {quote.author && quote.text ? (
                <Paper elevation={6} sx={{ p: 4 }}>
                    <Typography variant='h5'>{quote.text}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Chip label={quote.tag} />
                        <Typography variant='overline' component='p'>
                            {quote.author}
                        </Typography>
                    </Box>
                </Paper>
            ) : null}
        </div>
    );
}

export default App;
