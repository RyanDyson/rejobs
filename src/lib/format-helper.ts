export const formatDate = (originalDate: string | Date) => {
  return new Date(originalDate);
};

export const formatStatus = (originalStatus: string) => {
  switch (originalStatus) {
    case "Start": {
      return "Started";
    }
  }
};
