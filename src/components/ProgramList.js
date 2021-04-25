import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ProgramList.module.css";

const ProgramList = ({ channelId }) => {
  const history = useHistory();
  const { fetchProgramsForChannel } = useContext(RadioContext);
  const [programList, setProgramList] = useState(null);

  const fetchData = async (channelId) => {
    const result = await fetchProgramsForChannel(channelId);
    setProgramList(result);
  };

  useEffect(() => fetchData(channelId), []);
  useEffect(() => console.log(programList), [programList]);

  const renderProgramList = () => {
    const listToShow = programList.filter((prog) => prog.archived === false);
    console.log("fr render func", listToShow);
    return (
      <ul>
        {listToShow.map((prog) => (
          <li key={prog.id} onClick={() => history.push(`/program/${prog.id}`)}>
            {prog.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.programListContainer}>
      {programList ? renderProgramList() : null}
    </div>
  );
};

export default ProgramList;