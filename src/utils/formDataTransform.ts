export const formDataTransform = <T extends {}>(obj: T) => {
  const formattedData = {} as { [key: string]: T[Extract<keyof T, string>] };

  for (const updatesKey in obj) {
    const dotIndex = updatesKey.indexOf(".");
    if (dotIndex > 0) {
      const key = updatesKey.slice(0, dotIndex);
      const value = updatesKey.slice(dotIndex + 1);

      const address = {} as { [key: string]: T[Extract<keyof T, string>] };
      address[value] = obj[updatesKey];

      formattedData[key] = { ...formattedData[key], ...address };
    } else {
      formattedData[updatesKey] = obj[updatesKey];
    }
  }

  return formattedData;
};
