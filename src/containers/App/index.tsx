import { Paper } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Archive from '../../pages/Archive';
import Homepage from '../../pages/Homepage';
import NotFound from '../../pages/NotFound';

import AppNavigation from '../AppNavigation';
import ImageDetails from '../../pages/ImageDetails';

const App = () => {
    return (
        <Router>
            <AppNavigation />
            <Paper sx={{ p: 4, m: 2 }} elevation={6}>
                <Switch>
                    <Route path='/' exact component={Homepage} />
                    <Route path='/archive' exact component={Archive} />
                    <Route path='/images/:id' exact component={ImageDetails} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </Paper>
        </Router>
    );
};

export default App;
