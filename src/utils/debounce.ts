/* eslint-disable func-names, prefer-rest-params, @typescript-eslint/ban-types */
const debounce = <T extends Function>(functionToDebounce: T, delay: number): () => void => {
  let debounceTimer: ReturnType<typeof setTimeout>;
  return function () {
    const context = this; // eslint-disable-line @typescript-eslint/no-this-alias
    const functionArguments = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => functionToDebounce.apply(context, functionArguments), delay);
  };
};

export default debounce;
