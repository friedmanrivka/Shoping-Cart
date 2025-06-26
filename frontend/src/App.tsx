import { Provider } from "react-redux"
import CssBaseline from "@mui/material/CssBaseline"
import { store } from "./store/store"
import ShoppingList from "./components/ShoppingList" 

import './App.css';

function App() {
  return (
     <Provider store={store}>
        <CssBaseline />
        <ShoppingList />
     </Provider>
  );
}

export default App;
