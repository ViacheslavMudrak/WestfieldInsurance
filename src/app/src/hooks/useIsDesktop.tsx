import variables from 'src/sass/modules/exports.module.scss';
import useMediaQuery from './useMediaQuery';

const useIsDesktop = (): boolean => {
  const isDesktop = useMediaQuery({
    type: 'min-width',
    width: variables.breakPointDefault,
  });

  return isDesktop;
};

export default useIsDesktop;
