import { Provider } from "react-redux";
import { store } from "./redux/store/index";
import Calendar from "./components/Calendar";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store/index";
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Calendar />
    </PersistGate>
  </Provider>
);

export default App;
