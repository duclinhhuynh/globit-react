import { createContext, useContext } from 'react';
import CountryStore from './CountryStore';

// Create the store object
const store = {
    CountryStore: new CountryStore(),
};

// Create the context
export const StoreContext = createContext(store);

// Create the custom hook to access the store
export function useStore() {
    return useContext(StoreContext);
}

// Export the store object
export default store;
