import styled from "styled-components";
import { ColumnSpaceBetweenWrapper, RowWrapper, ShadowBox } from "../../AppStyle";

export const SymptomsBlock = styled(ColumnSpaceBetweenWrapper)`
    height:405px;
    background-color: #cfd7c7;
`

export const SmallShadowBox = styled(ShadowBox)`
    padding:50px 50px 50px 50px;
`

export const InfoBlock = styled(RowWrapper)`
    width:800px;
    margin-bottom:45px;
    justify-content:space-between;
`

export const DateScoreBlock = styled(ColumnSpaceBetweenWrapper)`
    height:220px;
    background-color: #cfd7c7;
`