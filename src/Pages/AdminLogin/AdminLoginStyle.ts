import styled from "styled-components";
import { ColumnSpaceBetweenWrapper, RowWrapper } from "../../AppStyle";
import { Input, TextField } from "@mui/material";

export const LoginBlock = styled(ColumnSpaceBetweenWrapper)`
    height:190px;
`

export const ButtonBlock = styled(RowWrapper)`
    margin-top:10px;
    width:100%;
    justify-content:space-evenly;
`

export const TextFieldFontSize = styled(TextField)`
    &&& *{font-size:20px}
`

export const InputFontSize = styled(Input)`
    &&& *{font-size:20px}
`


