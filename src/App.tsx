import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { Container, Typography } from "@mui/material";
import AddhabitForm from "./components/addhabitForm";
import HabitsList from "./components/habitsList";
import HabitStats from "./components/habitStats";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center">
          Habit Tracker
        </Typography>
        <AddhabitForm />
        <HabitsList />
        <HabitStats />
      </Container>
    </Provider>
  );
}

export default App;
