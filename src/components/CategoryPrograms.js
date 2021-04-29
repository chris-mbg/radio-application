import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";
import styles from '../css/CategoryPrograms.module.css';

const CategoryPrograms = ({categoryId}) => {
  const history = useHistory();
  const { fetchProgramsInCat } = useContext(RadioContext);
  const [programList, setProgramList ] = useState(null);
  // const [isVisible, setIsVisible] = useState(false);

  const fetchData = async () => {
    if (categoryId !== "0") {
      let result = await fetchProgramsInCat(categoryId);
      setProgramList(result);
    }
  }
  
  // eslint-disable-next-line
  useEffect(() => fetchData(), [categoryId]);

  const handleProgramNameClick = programId => {
    console.log('Clicked on a name', programId);
    history.push(`/program/${programId}`);
  }

  const renderProgramList = () => {
    if(programList) {
      return (
        <div className={styles.categoryProgramsContainer}>
          <h2>Program i kategori: <span className={styles.catName}>{programList[0].programcategory.name}</span></h2>
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
    <div className={styles.componentContainer}>
      {categoryId !== "0" ? renderProgramList() : null}
    </div>
  );
}

export default CategoryPrograms;