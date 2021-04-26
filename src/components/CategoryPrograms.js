import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";
import styles from '../css/CategoryPrograms.module.css';

const CategoryPrograms = ({categoryId}) => {
  const history = useHistory();
  const { fetchProgramsInCat } = useContext(RadioContext);
  const [programList, setProgramList ] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect( async () => {
    if (categoryId !== "0") {
      setProgramList(await fetchProgramsInCat(categoryId));
    }
  }, [categoryId]);

  useEffect( () => console.log('In categoryProg', programList),[programList]);

  const handleProgramNameClick = programId => {
    console.log('Clicked on a name', programId);
    history.push(`/program/${programId}`);
  }

  const renderProgramList = () => {
    if(programList) {
      return (
        <div className={styles.categoryProgramsContainer}>
          <h1>Här kommer listan..</h1>
          <div className={styles.programWrapper}>
            {programList.map(prog => (
              <div key={prog.id} onClick={() => handleProgramNameClick(prog.id)} className={styles.programName}>
                <p>{prog.name}</p>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div>
      {categoryId !== "0" ? renderProgramList() : <p>Ingen lista...</p>}
    </div>
  );
}

export default CategoryPrograms;