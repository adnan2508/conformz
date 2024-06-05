import MainLayout from "./components/layout/MainLayout";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <PrivateRoutes role={undefined}>
      <MainLayout />
    </PrivateRoutes>
  );
};
export default App;