type Options = {
  year?: boolean;
  month?: boolean;
  day?: boolean;
};

export const findH2Text = (json: any) => {
  const cleanData = JSON.parse(json);
  const { blocks } = cleanData;

  const h2 = blocks.find(
    (block: any) => block.type === 'header' && block.data.level === 2
  );

  return h2?.data?.text ?? undefined;
};

export const formatPostDate = (date?: string | null, options?: Options) => {
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
