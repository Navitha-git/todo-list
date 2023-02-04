import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import TodoService from "./TodoService";
import TodoItem from "./TodoItem";

export default function CustomizedInputBase() {
  const [todoList, setTodoList] = React.useState([]);
  const [copyTodoList, setCopyTodoList] = React.useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState();
  const [taskPriority, setTaskPriority] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  let textInput = useRef(null);

  const refreshTasks = () => {
    TodoService.getTaskList()
      .then((response) => {
        console.log(response);
        if (response) {
          console.log("BEFORE_SORT:", response?.data?.tasks);
          response?.data?.tasks.sort((a, b) => {
            return b.priority - a.priority;
          });
          console.log("AFTER_SORT:", response?.data?.tasks);
          setCopyTodoList(response?.data?.tasks);
          if (selectedFilter !== "ALL") {
            handleFilter(selectedFilter, response?.data?.tasks);
          } else {
            setTodoList(response?.data?.tasks);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleDeleteTodo = (id) => {
    const newTodos = todoList.filter((item) => item.id !== id);
    TodoService.deletTask(id)
      .then((response) => {
        console.log("DEL_TASK_THEN:", response);
      })
      .catch((error) => {
        console.log("NEW_TASK_ERROR:", error);
      });
    setTodoList(newTodos);
  };

  const handleEditTodo = (item) => {
    textInput.current.focus();
    setEditingTask(item);
    setTaskDescription(item.description);
  };

  const resetEdit = () => {
    setEditingTask(undefined);
    setTaskDescription("");
    setTaskPriority(false);
  };

  const editTask = () => {
    if (editingTask !== undefined) {
      TodoService.updateTask(editingTask.id, {
        task: {
          ...editingTask,
          description: taskDescription,
          priority: taskPriority,
        },
      })
        .then((response) => {
          console.log("EDIT_TASK_THEN:", response);
          refreshTasks();
          resetEdit();
        })
        .catch((error) => {
          console.log("EDIT_TASK_ERROR:", error);
        });
    }
  };

  const markComplete = (id, item) => {
    if (id !== undefined) {
      TodoService.updateTask(id, { task: { complete: !item.complete } })
        .then((response) => {
          console.log("COMPLETE_TASK_THEN:", response);
          refreshTasks();
        })
        .catch((error) => {
          console.log("COMPLETE_TASK_ERROR:", error);
        });
    }
  };

  const markPriority = (id, flag) => {
    if (id !== undefined) {
      TodoService.updateTask(id, { task: { priority: flag } })
        .then((response) => {
          console.log("COMPLETE_TASK_THEN:", response);
          refreshTasks();
        })
        .catch((error) => {
          console.log("COMPLETE_TASK_ERROR:", error);
        });
    }
  };

  const saveTask = (task) => {
    if (task) {
      TodoService.newTask({
        task: {
          description: taskDescription,
          complete: false,
          priority: taskPriority,
        },
      })
        .then((response) => {
          console.log("NEW_TASK_THEN:", response);
          setTaskDescription("");
          setTaskPriority(false);
          refreshTasks();
        })
        .catch((error) => {
          console.log("NEW_TASK_ERROR:", error);
        });
    }
  };

  const toggleTaskPriority = (item, flag) => {
    markPriority(item.id, flag);
  };

  const handleFilter = (type, data) => {
    console.log("FILTER:", type);
    setSelectedFilter(type);
    const list = data ? [...data] : copyTodoList;
    if (type === "DONE")
      setTodoList([
        ...list.filter((i) => {
          return i.complete;
        }),
      ]);
    else if (type === "NOT_DONE")
      setTodoList([
        ...list.filter((i) => {
          return !i.complete;
        }),
      ]);
    else if (type === "IMP")
      setTodoList([
        ...list.filter((i) => {
          return i.priority;
        }),
      ]);
    else setTodoList(copyTodoList);
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        marginTop: "20%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <TextField
          value={taskDescription}
          fullWidth
          label="Task description"
          id="taskDescription"
          onChange={(e) => {
            setTaskDescription(e.target.value);
          }}
          required
          autoFocus
          inputRef={textInput}
        />
        {editingTask === undefined && (
          <>
            {taskPriority ? (
              <IconButton
                aria-label="markUnImp"
                size="large"
                onClick={() => setTaskPriority(false)}
              >
                <Tooltip title="Mark as un-important" placement="bottom">
                  <StarRoundedIcon />
                </Tooltip>
              </IconButton>
            ) : (
              <IconButton
                aria-label="markUnImp"
                size="large"
                onClick={() => setTaskPriority(true)}
              >
                <Tooltip title="Mark as important" placement="bottom">
                  <StarBorderRoundedIcon />
                </Tooltip>
              </IconButton>
            )}
          </>
        )}
        {editingTask && editingTask.id !== undefined ? (
          <>
            <Button
              variant="contained"
              size="medium"
              onClick={editTask}
              disabled={!taskDescription}
            >
              Update
            </Button>
            <Button size="medium" onClick={resetEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            size="medium"
            className="btn btn-warning btn-sm  float-end pl-5  mt-3"
            onClick={(e) => saveTask(setTaskDescription)}
            disabled={!taskDescription}
          >
            Add
          </Button>
        )}
      </Stack>
      <Divider orientation="horizontal" style={{ margin: "15px 0px" }} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        style={{ marginBottom: "15px" }}
      >
        <Chip
          label="All"
          color="primary"
          variant={selectedFilter === "ALL" ? "filled" : "outlined"}
          onClick={() => handleFilter("ALL")}
        />
        <Chip
          label="Done"
          color="success"
          variant={selectedFilter === "DONE" ? "filled" : "outlined"}
          onClick={() => handleFilter("DONE")}
        />
        <Chip
          label="Not done"
          variant={selectedFilter === "NOT_DONE" ? "filled" : "outlined"}
          onClick={() => handleFilter("NOT_DONE")}
        />
        <Chip
          label="Important"
          color="warning"
          variant={selectedFilter === "IMP" ? "filled" : "outlined"}
          onClick={() => handleFilter("IMP")}
        />
      </Stack>

      <TodoItem
        list={todoList}
        editBtnClick={handleEditTodo}
        deleteBtnClick={handleDeleteTodo}
        toggleComplete={markComplete}
        togglePriority={toggleTaskPriority}
      />
    </Box>
  );
}
