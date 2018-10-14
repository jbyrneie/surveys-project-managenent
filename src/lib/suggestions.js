import deburr from 'lodash/deburr';

const client_suggestions = [
  { label: 'A1 Mountain Funds' },
  { label: 'A2 Mountain Funds' },
  { label: 'A3 Mountain Funds' },
  { label: 'A4 Mountain Funds' },
  { label: 'A5 Mountain Funds' },
  { label: 'B1 Mountain Funds' },
  { label: 'b2 Mountain Funds' },
  { label: 'b3 Mountain Funds' },
  { label: 'Blue Mountain Funds' },
  { label: 'Clear Mountain Funds' },
  { label: 'Dark Mountain Funds' },
  { label: 'Every Mountain Funds' },
  { label: 'Fine Mountain Funds' },
  { label: 'Glorious Mountain Funds' },
  { label: 'High Mountain Funds' },
  { label: 'Ignite Mountain Funds' },
  { label: 'Java Mountain Funds' },
  { label: 'Kape Mountain Funds' },
  { label: 'Long Mountain Funds' },
  { label: 'Mountain Funds' },
  { label: 'New Mountain Funds' },
  { label: 'Old Mountain Funds' },
  { label: 'Pure Mountain Funds' },
  { label: 'Quiet Mountain Funds' },
  { label: 'Real Mountain Funds' },
  { label: 'Silent Mountain Funds' },
  { label: 'True Mountain Funds' },
  { label: 'Up Mountain Funds' },
  { label: 'Very Mountain Funds' },
  { label: 'White Mountain Funds' },
  { label: 'Xylon Mountain Funds' },
  { label: 'Zebra Mountain Funds' },
];

const contact_suggestions = [
  { label: 'Adam' },
  { label: 'Andrew' },
  { label: 'Alfonsis' },
  { label: 'Brian' },
  { label: 'Brendan' },
  { label: 'Jack' },
  { label: 'James' },
  { label: 'John' },
];

const rm_suggestions = [
  { label: 'Adam RM' },
  { label: 'Andrew RM' },
  { label: 'Alfonsis RM' },
  { label: 'Brian RM' },
  { label: 'Brendan RM' },
  { label: 'Jack RM' },
  { label: 'James RM' },
  { label: 'John RM' },
];

export function getClientSuggestions(value) {
  console.log('getClientSuggestions: ', value);
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : client_suggestions.filter(suggestion => {
        console.log('suggestion: ', suggestion);
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        console.log('keep: ', keep);
        return keep;
      });
}

export function getContactSuggestions(value) {
  console.log('getContactSuggestions: ', value);
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : contact_suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

export function getRMSuggestions(value) {
  console.log('getRMSuggestions: ', value);
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : rm_suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
