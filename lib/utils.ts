export const addZero = (num: number): string => {
  return String(num).padStart(2, '0');
};

export const removeLeadingZero = (str: string = '') => {
  const int = parseInt(str, 10);

  return String(int);
};

export const createShowDate = (year: number, month: number, day: number) => {
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

export const splitShowDate = (showDate: string = ''): { year: string, month: string, day: string; } => {
  const [year, month, day] = showDate.split('-');

  return { year, month, day };
};

export const getParams = (query: string) => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params: any, param: string) => {
      const [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, {});
};

export const durationToHHMMSS = (duration: number) => {
  const prefix = duration < 0 ? '-' : '';
  let totalSeconds = Math.abs(duration);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60) || 0;
  const seconds = Math.floor(totalSeconds % 60) || 0;


  return prefix + [hours, hours ? addZero(minutes) : String(minutes), addZero(seconds)].filter(x => x).join(':');
};

export const simplePluralize = (str: string, count: number) => {
  return `${count} ${count === 1 ? str : str + 's'}`;
};

export const groupBy = (xs: any, key: any) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
