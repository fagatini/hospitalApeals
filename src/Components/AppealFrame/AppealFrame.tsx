import { TextStyle16 } from "../../AppStyle";
import { Appeal } from "../../utils/AppealType";
import { DataBlock, FrameStyled, FiAndScoreBlock, PersonalAndDateBlock, SymptomsBlock } from "./AppealFrameStyle";

export const AppealFrame: React.FC<{ data: Appeal }> = ({ data }) => {
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
          <TextStyle16>
            <strong>state:</strong> {data.state}
          </TextStyle16>
        </FiAndScoreBlock>
        <PersonalAndDateBlock>
          <TextStyle16>
            <strong>phone:</strong> {data.phone}
          </TextStyle16>
          <TextStyle16>
            <strong>email:</strong> {data.email}
            {data.email ? <></> : <>-</>}
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
            {index !== data.symptomsList.length - 1 ? <>,&nbsp;</> : <></>}
          </TextStyle16>
        ))}
      </SymptomsBlock>
      {data.additionalSymptoms ? (
        <DataBlock>
          <TextStyle16>
            <strong>Other sypmtoms:&nbsp;</strong>
            {data.additionalSymptoms}
          </TextStyle16>
        </DataBlock>
      ) : (
        <></>
      )}
    </FrameStyled>
  );
};
