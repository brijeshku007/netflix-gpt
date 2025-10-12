import { Provider } from "react-redux";
import { Body, ErrorBoundary } from "./components/common";
import { store } from "./store";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Body />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
