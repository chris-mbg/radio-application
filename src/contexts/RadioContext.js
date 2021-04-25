import { createContext, useEffect, useState } from "react";

export const RadioContext = createContext();

const RadioContextProvider = (props) => {

  const [allChannels, setAllChannels] = useState(null);
  const [allCategories, setAllCategories] = useState(null);

  const fetchAllChannels = async () => {
    let allChannelsList = await fetch("/api/v1/channels/");
    allChannelsList = await allChannelsList.json();
    setAllChannels(allChannelsList);
  };

  const fetchSingleChannel = async (channelId) => {
    let channelInfo = await fetch(`/api/v1/channels/${channelId}`);
    channelInfo = await channelInfo.json();
    return channelInfo;
  };

  const fetchChannelSchedule = async (channelId) => {
    let channelSchedule = await fetch(`/api/v1/channels/schedule/${channelId}`);
    channelSchedule = await channelSchedule.json();
    return channelSchedule;
  };

  const fetchAllCategories = async () => {
    let categoriesList = await fetch("/api/v1/categories/");
    categoriesList = await categoriesList.json();
    setAllCategories(categoriesList);
  };

  const fetchProgramsInCat = async categoryId => {
    let programList = await fetch(`/api/v1/categories/${categoryId}`);
    programList = await programList.json();
    return programList;
  };

  const fetchProgramsForChannel = async channelId => {
    let programList = await fetch(`/api/v1/programs/channel/${channelId}`);
    programList = await programList.json();
    return programList;
  }

  const fetchProgramInfo = async programId => {
    let programInfo = await fetch(`/api/v1/programs/${programId}`);
    programInfo = await programInfo.json();
    return programInfo;
  }

  const fetchProgramSchedule = async programId => {
    let programSchedule = await fetch(`/api/v1/programs/schedule/${programId}`);
    programSchedule = await programSchedule.json();
    return programSchedule;
  }

  const fetchAllEpisodesForProgram = async programId => {
    let episodeList = await fetch(`/api/v1/episodes/${programId}`);
    episodeList = await episodeList.json();
    return episodeList;
  }

  useEffect(() => {
    fetchAllChannels();
    fetchAllCategories();
  }, []);

  const values = {
    allChannels,
    fetchSingleChannel,
    fetchChannelSchedule,
    allCategories,
    fetchProgramsInCat,
    fetchProgramsForChannel,
    fetchProgramInfo,
    fetchProgramSchedule,
    fetchAllEpisodesForProgram,
  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioContextProvider;
