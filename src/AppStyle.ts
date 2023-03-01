import { TextField } from '@mui/material'
import styled from 'styled-components'

export const ColumnWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const RowWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

export const ColumnCenterWrapper = styled(ColumnWrapper)`
    justify-content:center;
    height:100vh;
`

export const ColumnSpaceBetweenWrapper = styled(ColumnWrapper)`
    justify-content:space-between;
    height:100vh;
`

export const ShadowBox = styled(ColumnWrapper)`
    background-color: #cfd7c7;
    box-shadow: 10px 5px 5px grey;
    border-radius:10px;
    padding: 50px 100px 50px 100px;
    margin-bottom:30px;
    box-sizing: border-box;
`

export const TextStyle32 = styled.p`
    font-size: 24px;
    letter-spacing: 0.02em;
    font-feature-settings: 'salt' on, 'liga' off;
    margin:0;
`

export const TextStyle24 = styled.p`
    font-size: 24px;
    letter-spacing: 0.02em;
    font-feature-settings: 'salt' on, 'liga' off;
    margin:0;
`

export const TextStyle16 = styled.p`
    font-size: 16px;
    letter-spacing: 0.02em;
    font-feature-settings: 'salt' on, 'liga' off;
    margin:0;
`

export const TextFieldStyled = styled(TextField)`
    font-size: 24px;
    letter-spacing: 0.02em;
    font-feature-settings: 'salt' on, 'liga' off;
`

export const ButtonBlock = styled(RowWrapper)`
    width:600px;
    padding-bottom:5px;
    padding-top:10px;
    justify-content: space-between;
`