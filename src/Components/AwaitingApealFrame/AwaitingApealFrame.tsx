import { Button } from "@mui/material";
import { TextStyle16 } from "../../AppStyle";
import { Appeal } from "../../utils/AppealType";
import {
  DataBlock,
  FrameStyled,
  FiAndScoreBlock,
  PersonalAndDateBlock,
  SymptomsBlock,
  StateButtonBlock,
} from "./AwaitingApealFrameStyle";
import firebaseStore from "../../store/firebaseStore";
import { doc, updateDoc } from "firebase/firestore";

export const AwaitingApealFrame: React.FC<{ data: Appeal; changeList: (id: string) => void }> = ({
  data,
  changeList,
}) => {
  const firestore = firebaseStore.firestore;

  const changeStateClick = async (state: string) => {
    changeList(data.id);
    await updateDoc(doc(firestore, "forms", data.id), {
      state: state,
    });
  };

  return (
    <FrameStyled>
      <DataBlock>
        <FiAndScoreBlock>
          <TextStyle16>
            <strong>fi:</strong> {data.name} {data.surname}
          </TextStyle16>
          <TextStyle16>
            <strong>illness score:</strong> {data.illnessScore}
          </TextStyle16>
        </FiAndScoreBlock>
        <PersonalAndDateBlock>
          <TextStyle16>
            <strong>phone:</strong> {data.phone}
          </TextStyle16>
          <TextStyle16>
            <strong>date of visit:</strong> {data.date.replace("T", " ")}
          </TextStyle16>
        </PersonalAndDateBlock>
      </DataBlock>
      <SymptomsBlock>
        <TextStyle16>
          <strong>Sypmtoms:&nbsp;</strong>
        </TextStyle16>
        {data.symptomsList.map((elem, index) => (
          <TextStyle16 key={elem}>
            {elem}
            {index !== data.symptomsList.length - 1 ? <>,&nbsp;</> : <></>}{" "}
          </TextStyle16>
        ))}
      </SymptomsBlock>
      {data.additionalSymptoms ? (
        <DataBlock>
          <TextStyle16>
            <strong>Other sypmtoms: </strong>
            {data.additionalSymptoms}
          </TextStyle16>
        </DataBlock>
      ) : (
        <></>
      )}
      <StateButtonBlock>
        <Button onClick={(e) => changeStateClick("accepted")}>accept</Button>
        <Button onClick={(e) => changeStateClick("decline")}>decline</Button>
      </StateButtonBlock>
    </FrameStyled>
  );
};
