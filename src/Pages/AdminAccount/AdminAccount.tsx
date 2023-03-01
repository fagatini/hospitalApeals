import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, where, query, orderBy } from "firebase/firestore";
import firebaseStore from "../../store/firebaseStore";
import { Appeal } from "../../utils/AppealType";
import { ButtonBlock, ColumnWrapper } from "../../AppStyle";
import { Button } from "@mui/material";
import { AwaitingApealFrame } from "../../Components/AwaitingApealFrame/AwaitingApealFrame";

export const AdminAccount = () => {
  const [appealsList, setAppealsList] = useState<Appeal[]>([]);
  const auth = firebaseStore.auth;
  const firestore = firebaseStore.firestore;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const formsRef = collection(firestore, "forms");
      const q = query(formsRef, where("state", "==", "awaiting"), orderBy("dateOfCreation"));
      const allForms = await getDocs(q);
      const tmpArray: Appeal[] = [];
      allForms.forEach((doc) => {
        tmpArray.push({
          id: doc.id,
          date: doc.data().date,
          email: doc.data().email,
          illnessScore: doc.data().illnessScore,
          name: doc.data().name,
          phone: doc.data().phone,
          surname: doc.data().surname,
          symptomsList: doc.data().symptomsList,
          additionalSymptoms: doc.data().additionalSymptoms,
          state: doc.data().state,
        });
      });
      setAppealsList([...tmpArray]);
    })();
  }, []);

  const onSignOutClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {});
  };

  const onChangeState = (id: string) => {
    setAppealsList(appealsList.filter((elem) => elem.id !== id));
  };

  return (
    <ColumnWrapper>
      <ButtonBlock>
        <Button onClick={(e) => navigate("/archive")}>to archive</Button>
        <Button onClick={(e) => onSignOutClick()}>sign out</Button>
      </ButtonBlock>
      {appealsList.map((elem) => (
        <AwaitingApealFrame key={elem.id} data={elem} changeList={onChangeState}></AwaitingApealFrame>
      ))}
    </ColumnWrapper>
  );
};
