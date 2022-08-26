import React, { FC, useState } from "react";
import styles from './styles.module.scss';

// types
type AutoCompleteSettings = {
  suggestions?: any;
  text?: string;
  locationId?: string;
}

// function component
const AutoComplete = () => {
  // inital values
  const initialState: AutoCompleteSettings = {
    suggestions: "",
    text: "",
    locationId: ""
  }

  const [data, setData] = useState(initialState);

  const onTextChanged = (e: any) => {
    let apikey = "lnCy6HmxuT7gv0QNIdht_8FeS0C5UMdnDSDPxLhGXh8";
    const value = e.target.value;
    setData({ locationId: "", text: value });
    if (value.length > 0) {
      setData({ text: value });
      fetch(
        `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${value}&maxresults=10&apiKey=${apikey}`
      ).then(response => response.json()
      ).then(data => {
        const options = data.suggestions.map(option => ({
          label: option.label,
          locationId: option.locationId
        }));
        setData({ suggestions: options });
      }).catch(err => {
        setData({ suggestions: [] });
      });
    } else {
      setData({ suggestions: [] });
    }
  };

  const renderSuggestions = () => {
    const suggestions = data.suggestions;
    if (suggestions != null && suggestions.length > 0) {
      return (
        <ul>
          {suggestions.map(item => {
            return (
              <li
                key={item.locationId}
                onClick={() => suggestionSelected(item)}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      );
    };
  };

  const suggestionSelected = item => {
    setData({
      text: item.label,
      locationId: item.locationId,
      suggestions: []
    });
  };

  return (
    <div className={styles.AutoCompleteText}>
      <input
        type="text"
        value={data.text}
        onChange={onTextChanged}
        placeholder="Start Typing!"
      />
      {renderSuggestions()}
    </div>
  );

}

export default AutoComplete;