import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ColumnCenterWrapper, ShadowBox } from "../../AppStyle";
import { Button, FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ButtonBlock, LoginBlock, InputFontSize, TextFieldFontSize } from "./AdminLoginStyle";
import firebaseStore from "../../store/firebaseStore";

export const AdminLogin = () => {
  const auth = firebaseStore.auth;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isDataWrong, setIsDataWrong] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSignInClick = () => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        navigate("/admin");
      })
      .catch((error) => {
        setIsDataWrong(true);
      });
  };

  const onInputClick = () => {
    setIsDataWrong(false);
  };

  return (
    <ColumnCenterWrapper>
      <ShadowBox>
        <LoginBlock>
          <TextFieldFontSize
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            label="Email"
            sx={{ width: "300px" }}
            error={isDataWrong}
            onClick={(e) => onInputClick()}
          />
          <FormControl sx={{ width: "300px" }} variant="standard" error={isDataWrong}>
            <InputLabel sx={{ fontSize: 20 }}>Password</InputLabel>
            <InputFontSize
              type={showPassword ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onClick={(e) => onInputClick()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <ButtonBlock>
            <Button onClick={() => onSignInClick()}>sign in</Button>
            <Button onClick={() => navigate("/")}>back</Button>
          </ButtonBlock>
        </LoginBlock>
      </ShadowBox>
    </ColumnCenterWrapper>
  );
};
