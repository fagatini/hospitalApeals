import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { symptoms } from "../../utils/symptomsList";

interface MyProps {
  items: number[];
  title: string;
  checked: number[];
  setChecked: (value: number[]) => void;
}

export const CustomList = ({ items, title, checked, setChecked }: MyProps) => {
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <>
      <div>{title}</div>
      <Paper
        sx={{
          width: 250,
          height: 230,
          overflow: "auto",
        }}
      >
        <List dense component="div" role="list">
          {items.map((value: number) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={symptoms[value]} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </>
  );
};
