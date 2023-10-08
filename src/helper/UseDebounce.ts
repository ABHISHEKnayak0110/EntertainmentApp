
function useDebounce(func : Function, timeout = 300) {
  let timer :number | any;
  return (...args : Array<any>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export default useDebounce;
