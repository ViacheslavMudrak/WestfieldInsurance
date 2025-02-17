import { GetDictionaryPhrase, GetItemId } from 'components/Helpers/ContentUtil';
import { LeadershipBioResults } from './types';
import { SitecoreContextValue } from '@sitecore-jss/sitecore-jss-nextjs';

export function GetNextBioLink(
  currentBioId: string,
  bios: LeadershipBioResults[] | undefined,
  sitecoreContext: SitecoreContextValue
): JSX.Element {
  const readNextBioText = GetDictionaryPhrase('read-next-bio');
  let resultToReturn: JSX.Element = <a href="#">{readNextBioText}</a>;
  const biosLength = bios ? bios?.length : 0;
  if (bios && biosLength > 0) {
    const selectedBioIndex = bios.findIndex((x) => x.id === currentBioId);
    const nextBioIndex = selectedBioIndex == biosLength - 1 ? 0 : selectedBioIndex + 1;
    const homeItemPath = GetItemId(sitecoreContext.site?.name, 'HomeItemPath').toLowerCase();
    resultToReturn = (
      <a
        href={bios[nextBioIndex].path.toLowerCase().replace(homeItemPath, '').replaceAll(' ', '-')}
      >
        {readNextBioText}
      </a>
    );
  }

  return resultToReturn;
}
