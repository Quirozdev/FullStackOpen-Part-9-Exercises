import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api';

export const getAll = () => {
  return fetch(`${baseUrl}/diaries`)
    .then<DiaryEntry[]>((response) => response.json())
    .then((data) => data);
};

export const createDiary = (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  return fetch(`${baseUrl}/diaries`, {
    method: 'POST',
    body: JSON.stringify(newDiary),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then<DiaryEntry>(async (response) => {
      if (response.ok) {
        return response.json();
      }

      const errorMessage = await response.text();
      throw new Error(errorMessage);
    })
    .then((data) => {
      return data;
    });
};
