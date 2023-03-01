import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { symptoms } from "../../utils/symptomsList";
import { CustomList } from "../CustomList/CustomList";
import { not, intersection } from "../../utils/tListFunc";

interface MyProps {
  changeListFunc: (list: number[], symptoms: string[]) => void;
}

export default function TransferList({ changeListFunc }: MyProps) {
  const [checked, setChecked] = useState<number[]>([]);
  const [left, setLeft] = useState<number[]>([]);
  const [right, setRight] = useState<number[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(Array.from({ length: symptoms.length }, (v, i) => i));
  }, []);

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    changeListFunc(right.concat(leftChecked), symptoms);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    changeListFunc(not(right, rightChecked), symptoms);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <CustomList items={left} title={"All symptoms"} checked={checked} setChecked={setChecked} />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <CustomList items={right} title={"Selected"} checked={checked} setChecked={setChecked} />
      </Grid>
    </Grid>
  );
}
