import { createStore } from 'redux';
import testReducer from '../features/testArea/testReducer';

export const configureStore = () => {
    const store = createStore(testReducer);
    return store;
}
