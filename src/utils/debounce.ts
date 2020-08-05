/* eslint-disable func-names, prefer-rest-params */
const debounce = (func: Function, delay: number) => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function () {
    // @ts-ignore
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
