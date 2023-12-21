import { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { DiaryEntry, Visibility, Weather } from '../types';
import useTimeout from '../hooks/useTimeout';

interface NewDiaryFormProps {
  concatDiary: (diary: DiaryEntry) => void;
}

const NewDiaryForm = ({ concatDiary }: NewDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { timeOut } = useTimeout();

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({
      date,
      visibility: visibility as Visibility,
      comment,
      weather: weather as Weather,
    })
      .then((data) => {
        concatDiary(data);
      })
      .catch((error) => {
        let errorMessage;
        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          errorMessage = 'Something went wrong';
        }
        setErrorMessage(errorMessage);
        timeOut(() => {
          setErrorMessage('');
        }, 3500);
      });
  };

  return (
    <>
      <h2>Add new entry</h2>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <fieldset>
          <legend>Visibility</legend>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            onChange={(event) => setVisibility(event.target.value)}
          />
          <label htmlFor="poor">poor</label>
        </fieldset>
        <fieldset>
          <legend>Weather</legend>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            onChange={(event) => setWeather(event.target.value)}
          />
          <label htmlFor="windy">windy</label>
        </fieldset>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewDiaryForm;
