import { createContext, useContext, useState, useEffect } from 'react';

const FeynmanContext = createContext();

export const useFeynmanContext = () => {
  const context = useContext(FeynmanContext);
  if (!context) {
    throw new Error('useFeynmanContext must be used within a FeynmanProvider');
  }
  return context;
};

export const FeynmanProvider = ({ children }) => {
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem('feynmanTopics');
    return savedTopics ? JSON.parse(savedTopics) : [];
  });

  useEffect(() => {
    localStorage.setItem('feynmanTopics', JSON.stringify(topics));
  }, [topics]);

  const addTopic = (topic) => {
    setTopics([...topics, topic]);
  };

  const deleteTopic = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  const updateTopic = (index, updatedTopic) => {
    const newTopics = [...topics];
    newTopics[index] = updatedTopic;
    setTopics(newTopics);
  };

  return (
    <FeynmanContext.Provider value={{
      topics,
      addTopic,
      deleteTopic,
      updateTopic
    }}>
      {children}
    </FeynmanContext.Provider>
  );
};
