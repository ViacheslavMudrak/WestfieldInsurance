import variables from 'src/sass/modules/exports.module.scss';
import useMediaQuery from './useMediaQuery';

const useIsTablet = (): boolean => {
  const isTablet = useMediaQuery({
    type: 'min-width',
    width: variables.breakPointMd,
  });

  return isTablet;
};

export default useIsTablet;
