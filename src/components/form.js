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
    .reduce((prev, curr) => {
      prev[curr.name] = curr.value;
      return prev;
    }, {});
};
