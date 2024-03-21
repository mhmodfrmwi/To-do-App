export const saveToDataBase = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromDataBase = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data) || [];
};
