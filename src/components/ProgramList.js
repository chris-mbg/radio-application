import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";
import styles from "../css/ProgramList.module.css";
import useIsMountedRef from "../hooks/useIsMountedRef";

const ProgramList = ({ channelId }) => {
  const history = useHistory();
  const { fetchProgramsForChannel } = useContext(RadioContext);
  const [programList, setProgramList] = useState(null);

  const isMounted = useIsMountedRef();

  const fetchData = async (channelId) => {
    const result = await fetchProgramsForChannel(channelId);
    if(isMounted.current) {
      setProgramList(result);
    }
  };

  useEffect(() => {
    if(isMounted.current) {
      fetchData(channelId)
    }
  }, []);

  //useEffect(() => console.log(programList), [programList]);

  const renderProgramList = () => {
    const listToShow = programList.filter((prog) => prog.archived === false);
    //console.log("fr render func", listToShow);
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
      {programList && programList.length > 0 ? (<h2>Alla program i {programList[0].channel.name}</h2>) : <h2>Inga program finns tillgängliga för kanalen</h2>}
      {programList ? renderProgramList() : null}
    </div>
  );
};

export default ProgramList;
