export const fillFormData = (form, data) => {
  if (form && data && Object.keys(data).length > 0) {
    Object.keys(data).forEach((name) => {
      if (form.elements[name]) form.elements[name].value = data[name];
    });
  }
};

export const getFormData = (form) => {
  return Array.from(form.elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;
      return { name, value };
    })
    .reduce((prev, curr) => {
      const result = { ...prev };
      result[curr.name] = curr.value;
      return result;
    }, {});
};
