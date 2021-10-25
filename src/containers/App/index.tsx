import { Box } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from '../../pages/About';
import Homepage from '../../pages/Homepage';
import NotFound from '../../pages/NotFound';

import AppNavigation from '../AppNavigation';
import ImageDetails from '../../pages/ImageDetails';

const App = () => {
    return (
        <Router>
            <AppNavigation />
            <Box sx={{ p: 4 }}>
                <Switch>
                    <Route path='/' exact component={Homepage} />
                    <Route path='/about' exact component={About} />
                    <Route path='/images/:id' exact component={ImageDetails} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </Box>
        </Router>
    );
};

export default App;
