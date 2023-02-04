import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Container maxWidth="sm">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <CssBaseline />
      <TodoList />
    </Container>
  );
}

export default App;
