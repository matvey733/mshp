module.exports = function isFormDataValid(formData) {
  for (const key in formData) {
    if (!formData[key]) return false;
  }
  return true;
}