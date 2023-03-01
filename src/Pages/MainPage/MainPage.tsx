import { useNavigate } from "react-router-dom";
import { ColumnCenterWrapper, ShadowBox } from "../../AppStyle";
import { Button } from "@mui/material";
import { Text24 } from "./MainPageStyle";

export const MainPage = () => {
  const navigate = useNavigate();

  const onAdminClick = () => {
    navigate("/login");
  };

  const onPatientClick = () => {
    navigate("/form");
  };

  return (
    <ColumnCenterWrapper>
      <ShadowBox>
        <Text24>You can leave appeal as patient</Text24>
        <Button onClick={(e) => onPatientClick()}>Patient</Button>
        <Text24>or login as administrator</Text24>
        <Button onClick={(e) => onAdminClick()}>Administrator</Button>
      </ShadowBox>
    </ColumnCenterWrapper>
  );
};
