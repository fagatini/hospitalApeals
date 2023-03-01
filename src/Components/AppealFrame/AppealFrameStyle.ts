import styled from "styled-components";
import { ColumnWrapper, RowWrapper } from "../../AppStyle";

export const FrameStyled = styled(ColumnWrapper)`
    width: 600px;
    padding:10px 10px 10px 10px;
    box-sizing: border-box;
    margin-bottom:8px;

    background-color: #cfd7c7;
    box-shadow: 3px 2px 2px grey;
    
    border-radius:10px;
    border:1px solid black;
`

export const DataBlock = styled(RowWrapper)`
    justify-content:space-between;
    width:100%
`

export const FiAndScoreBlock = styled(ColumnWrapper)`
    align-items:flex-start;
    justify-content:space-between;
    width:fit-content
`

export const PersonalAndDateBlock = styled(ColumnWrapper)`
    align-items:flex-start;
    justify-content:space-between;
    width:320px;
`

export const SymptomsBlock = styled(RowWrapper)`
    width:100%;
    flex-wrap:wrap;
`