import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, where, query, orderBy } from "firebase/firestore";
import firebaseStore from "../../store/firebaseStore";
import { AppealFrame } from "../../Components/AppealFrame/AppealFrame";
import { Appeal } from "../../utils/AppealType";
import { ButtonBlock, ColumnWrapper } from "../../AppStyle";
import { Button } from "@mui/material";

export const Archive = () => {
  const [appealsList, setAppealsList] = useState<Appeal[]>([]);
  const auth = firebaseStore.auth;
  const firestore = firebaseStore.firestore;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const formsRef = collection(firestore, "forms");
      const q = query(formsRef, where("state", "!=", "awaiting"), orderBy("state"), orderBy("dateOfCreation", "desc"));
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

  return (
    <ColumnWrapper>
      <ButtonBlock>
        <Button onClick={(e) => navigate("/admin")}>to lobby</Button>
        <Button onClick={(e) => onSignOutClick()}>sign out</Button>
      </ButtonBlock>
      {appealsList.map((elem) => (
        <AppealFrame key={elem.id} data={elem}></AppealFrame>
      ))}
    </ColumnWrapper>
  );
};
