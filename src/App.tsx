import { Provider } from "react-redux";
import { store } from "./redux/store/index";
import Calendar from "./components/Calendar";

const App = () => (
  <Provider store={store}>
    <Calendar />
  </Provider>
);

export default App;
