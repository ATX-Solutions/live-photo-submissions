import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Quotes from '../../pages/Quotes';
import Homepage from '../../pages/Homepage';
import NotFound from '../../pages/NotFound';

import AppNavigation from '../AppNavigation';

const App = () => {
    return (
        <Router>
            <AppNavigation />
            <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/quotes' exact component={Quotes} />
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
