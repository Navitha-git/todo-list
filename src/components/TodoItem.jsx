import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "auto",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const TodoItem = ({
  list,
  editBtnClick,
  deleteBtnClick,
  toggleComplete,
  togglePriority,
}) => {
  const getDescriptionEle = (desc) => {
    const widowSize = window.innerWidth;
    if (widowSize > 1000 && desc.length > 30) {
      return desc.substring(0, 45) + "...";
    } else if (widowSize < 450 && desc.length > 25) {
      return desc.substring(0, 25) + "...";
    } else return desc;
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="stretch">
      {list === undefined || list.length === 0 ? (
        <Typography align="center">No tasks found!</Typography>
      ) : (
        list.map((task) => (
          <Item
            key={task.id}
            style={{
              display: "flex",
              alignContent: "space-between",
              flexFlow: "column wrap",
              justifyContent: "center",
            }}
          >
            <span>
              <Checkbox
                checked={task.complete ? true : false}
                onClick={(e) => toggleComplete(task.id, task)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />

              <Tooltip title={task.description} placement="bottom">
                <span>
                  {task.complete ? (
                    <s> {getDescriptionEle(task.description)}</s>
                  ) : (
                    getDescriptionEle(task.description)
                  )}
                </span>
              </Tooltip>
            </span>

            <span>
              <IconButton
                aria-label="edit"
                size="large"
                onClick={(e) => editBtnClick(task)}
              >
                <EditRoundedIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                size="large"
                onClick={(e) => deleteBtnClick(task.id)}
              >
                <DeleteIcon />
              </IconButton>
              {task.priority ? (
                <IconButton
                  aria-label="markUnImp"
                  size="large"
                  onClick={() => togglePriority(task, false)}
                >
                  <StarRoundedIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="markImp"
                  size="large"
                  onClick={() => togglePriority(task, true)}
                >
                  <StarBorderRoundedIcon />
                </IconButton>
              )}
            </span>
          </Item>
        ))
      )}
    </Stack>
  );
};

export default TodoItem;
