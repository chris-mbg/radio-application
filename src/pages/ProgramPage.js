import { useContext, useEffect, useState } from 'react';
import { RadioContext } from '../contexts/RadioContext';
import styles from '../css/ProgramPage.module.css';

const ProgramPage = props => {

  const { programId } = props.match.params;
  const { fetchProgramInfo, fetchProgramSchedule, fetchAllEpisodesForProgram } = useContext(RadioContext);
  const [programInfo, setProgramInfo] = useState(null);

  useEffect( () => {
      async function fetchData() {
        let result = await fetchProgramInfo(programId);
        console.log(result)
        setProgramInfo(result);
      }
      fetchData();
  }, []);

  const renderProgramInfo = () => {
    return (
      <div>
        <h1>{programInfo.name}</h1>
        <p>{programInfo.channel.name}</p>
        <button>Favoritmarkera program</button>
        <p>{programInfo.description}</p>
        <img src={programInfo.programimage} />
      </div>
    )
  }


  return (
    <div>
      <h1>Programsida</h1>
      {programInfo ? renderProgramInfo() : null }
    </div>
  );
}

export default ProgramPage;