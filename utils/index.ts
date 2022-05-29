type Options = {
  year?: boolean;
  month?: boolean;
  day?: boolean;
};

export const formatPostDate = (date?: string, options?: Options) => {
  let dateOptions: Intl.DateTimeFormatOptions | undefined = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (options) {
    const { year, month, day } = options;

    if (!year) {
      dateOptions.year = undefined;
    }

    if (!month) {
      dateOptions.month = undefined;
    }

    if (!day) {
      dateOptions.day = undefined;
    }
  }

  if (!date) return new Date().toLocaleDateString('en-US', dateOptions);

  return new Date(date).toLocaleDateString('en-US', dateOptions);
};
