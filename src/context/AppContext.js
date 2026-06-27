import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userData, setUserData] = useState({
    name: 'علی رضایی',
    weight: 75,
    height: 178,
    age: 25,
    gender: 'مرد',
    goal: 'کاهش وزن',
  });
  const [addedEq, setAddedEq] = useState(new Set());
  const [waterFilled, setWaterFilled] = useState(5);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const bmi = (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1);

  const getCalories = () => {
    if (userData.goal === 'عضله‌سازی') return 2800;
    if (userData.goal === 'افزایش استقامت') return 2400;
    if (userData.goal === 'سلامت عمومی') return 2000;
    return 2150;
  };

  const toggleEquipment = (id) => {
    setAddedEq(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleWater = (i) => {
    setWaterFilled(prev => (i < prev ? i : i + 1));
  };

  const toggleExercise = (key) => {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      userData, setUserData,
      addedEq, toggleEquipment,
      waterFilled, toggleWater,
      completedExercises, toggleExercise,
      bmi, getCalories,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
