import { setSeconds, setMinutes, setHours } from 'date-fns';

export default {
  maxPermited: 5,
  startBusinessHour: setSeconds(setMinutes(setHours(new Date(), 8), 0), 0),
  endBusinessHour: setSeconds(setMinutes(setHours(new Date(), 18), 0), 0),
};
