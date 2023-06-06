import React from 'react';

const useIsMounted = function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(function setIsMounted() {
    isMounted.current = true;

    return function cleanupSetIsMounted() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

const useUpdateEffect = function useUpdateEffect(effect, dependencies) {
  const isMounted = useIsMounted();
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    let effectCleanupFunc = function noop() {};

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanupFunc = effect() || effectCleanupFunc;
    }
    return () => {
      effectCleanupFunc();
      if (!isMounted.current) {
        isInitialMount.current = true;
      }
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useUpdateEffect
