import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const RadioContext = createContext();

const RadioContextProvider = (props) => {
  const history = useHistory();

  const [allChannels, setAllChannels] = useState(null);
  const [singleChannel, setSingleChannel] = useState(null);
  const [allCategories, setAllCategories] = useState(null);

  const fetchAllChannels = async () => {
    const allChannelsList = await fetch("/api/v1/channels/");
    allChannelsList = await allChannelsList.json();
    setAllChannels(allChannelsList);
  };

  const fetchSingleChannel = async (channelId) => {
    let channelInfo = await fetch(`/api/v1/channels/${channelId}`);
    channelInfo = await channelInfo.json();
    setSingleChannel(channelInfo);
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


  useEffect(() => {
    fetchAllChannels();
    fetchAllCategories();
  }, []);

  const values = {
    allChannels,
    singleChannel,
    fetchSingleChannel,
    fetchChannelSchedule,
    allCategories,
    fetchProgramsInCat,
    
  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioContextProvider;
