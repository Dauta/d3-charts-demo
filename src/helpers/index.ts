export const formatNumericValue = (value: number): string => {
  if (value > 1_000_000_000) {
    return `${Math.round(value / 1_00_000_000) / 10}B`;

  }

  if (value > 1_000_000) {
    return `${Math.round(value / 1_00_000) / 10}M`;
  }

  if (value > 1000) {
    return `${Math.round(value / 100) / 10}K`;
  }

  return `${Math.round(value * 100) / 100}`;
};
