import MainComponent from "./assets/MainComponent";
import Employees from "./components/Employees";

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center gap-[10rem]">
      <MainComponent />
      <Employees />
    </div>
  );
}

export default App;
