import { AuthProvider } from "./utils/authContext";
import { Header } from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
      </div>
    </AuthProvider>
  );
}

export default App;
