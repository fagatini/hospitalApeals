import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import TransferList from "../../Components/TransferList/TransferList";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ColumnSpaceBetweenWrapper, ShadowBox, TextStyle16, TextStyle24 } from "../../AppStyle";
import { DateScoreBlock, InfoBlock, SmallShadowBox, SymptomsBlock } from "./PatientFormStyle";
import { useNavigate } from "react-router-dom";
import firebaseStore from "../../store/firebaseStore";
import { isEmailValid, isPhoneValid } from "../../utils/RegExpValid";

export const PatientForm = () => {
  const [symptomsList, setSymptomsList] = useState<string[]>([]);
  const [additionalSymptoms, setAdditionalSymptoms] = useState("");

  const [illnessScore, setScore] = useState(0);
  const [date, setDate] = useState("");

  const [personalData, setPersonalData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [isWrongInputs, setIsWrongInputs] = useState({
    symp: false,
    date: false,
    name: false,
    surname: false,
    phone: false,
    email: false,
  });

  const firestore = firebaseStore.firestore;
  const navigate = useNavigate();

  const SympListChange = (list: number[], symptoms: string[]) => {
    let tmpArray: string[] = [];
    list.map((elem) => {
      tmpArray.push(symptoms[elem]);
    });
    setSymptomsList([...tmpArray]);
  };

  const onSubmitClick = async () => {
    if (isDataValid()) {
      await setDoc(doc(collection(firestore, "forms")), {
        symptomsList: symptomsList,
        additionalSymptoms: additionalSymptoms,
        illnessScore: illnessScore,
        date: date,
        name: personalData.name,
        surname: personalData.surname,
        phone: personalData.phone,
        email: personalData.email,
        dateOfCreation: serverTimestamp(),
        state: "awaiting",
      });
      navigate("/");
    }
  };

  const isDataValid = (): boolean => {
    let listOfErrors = {
      symp: !symptomsList.length && !additionalSymptoms,
      date: !date,
      name: personalData.name.length === 0,
      surname: personalData.surname.length === 0,
      phone: !isPhoneValid(personalData.phone),
      email: !!personalData.email && !isEmailValid(personalData.email),
    };
    setIsWrongInputs({ ...listOfErrors });

    for (const error in listOfErrors) {
      if (error) return true;
    }
    return false;
  };

  const onErrorFieldClick = (fieldName: string) => {
    switch (fieldName) {
      case "name":
        setIsWrongInputs({ ...isWrongInputs, name: false });
        break;
      case "date":
        setIsWrongInputs({ ...isWrongInputs, date: false });
        break;
      case "email":
        setIsWrongInputs({ ...isWrongInputs, email: false });
        break;
      case "phone":
        setIsWrongInputs({ ...isWrongInputs, phone: false });
        break;
      case "symp":
        setIsWrongInputs({ ...isWrongInputs, symp: false });
        break;
      case "surname":
        setIsWrongInputs({ ...isWrongInputs, surname: false });
        break;
    }
  };

  return (
    <ColumnSpaceBetweenWrapper>
      <h1>Appeal form</h1>
      <ShadowBox>
        <SymptomsBlock>
          <TextStyle24>Symptoms</TextStyle24>
          <TransferList changeListFunc={SympListChange}></TransferList>
          <TextField
            label="Other Symptoms"
            value={additionalSymptoms}
            error={isWrongInputs.symp}
            onClick={(e) => onErrorFieldClick("symp")}
            onChange={(e) => setAdditionalSymptoms(e.target.value)}
            multiline
            rows={2}
            sx={{ width: "600px" }}
          ></TextField>
        </SymptomsBlock>
      </ShadowBox>
      <InfoBlock>
        <SmallShadowBox>
          <DateScoreBlock>
            <TextStyle16>Date and score</TextStyle16>
            <TextField
              label="Date of visit"
              type="datetime-local"
              variant="standard"
              value={date}
              error={isWrongInputs.date}
              onClick={(e) => onErrorFieldClick("date")}
              onChange={(e) => setDate(e.target.value)}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
              <InputLabel>Illness score</InputLabel>
              <Select value={illnessScore} onChange={(e) => setScore(Number(e.target.value))}>
                {[...Array.from({ length: 10 }, (v, i) => i)].map((e) => (
                  <MenuItem key={e} value={e}>
                    {e + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={(e) => onSubmitClick()}>submit</Button>
          </DateScoreBlock>
        </SmallShadowBox>
        <SmallShadowBox>
          <TextStyle16>Personal data</TextStyle16>
          <TextField
            label="Name"
            variant="standard"
            value={personalData.name}
            error={isWrongInputs.name}
            onClick={(e) => onErrorFieldClick("name")}
            sx={{ width: 250 }}
            onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
          />
          <TextField
            label="Surname"
            variant="standard"
            value={personalData.surname}
            error={isWrongInputs.surname}
            onClick={(e) => onErrorFieldClick("surname")}
            sx={{ width: 250 }}
            onChange={(e) => setPersonalData({ ...personalData, surname: e.target.value })}
          />
          <TextField
            label="Phone number"
            variant="standard"
            value={personalData.phone}
            error={isWrongInputs.phone}
            onClick={(e) => onErrorFieldClick("phone")}
            sx={{ width: 250 }}
            onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
          />
          <TextField
            label="Email"
            variant="standard"
            value={personalData.email}
            error={isWrongInputs.email}
            onClick={(e) => onErrorFieldClick("email")}
            sx={{ width: 250 }}
            onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
          />
        </SmallShadowBox>
      </InfoBlock>
    </ColumnSpaceBetweenWrapper>
  );
};
