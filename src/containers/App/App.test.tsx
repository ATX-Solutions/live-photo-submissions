import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import App from './App';

import { store } from './app/store';

test('healty check', () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>,
    );

    expect(1).toBe(1);
});
