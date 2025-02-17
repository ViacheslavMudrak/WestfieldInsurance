import {
  Field,
  ImageField,
  Link as JssLink,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { repositoryConstants } from 'src/repository/constants';
import { CustomSiteInfo } from 'src/repository/CustomSiteInfoService/customsiteinfoservice';
import { FindAnAgentForm } from 'src/repository/findAnAgent/types';
import { Author, Tag } from 'src/repository/shared/types';
import config from 'temp/config';
import TextFieldWrapper, { TextProps } from './TextFieldWrapper';

export function IsEditing(): boolean {
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext.pageEditing;
  return isEditing != undefined ? isEditing : false;
}

export function IsEmptyImageField(field?: ImageField): boolean {
  return field?.value?.src ? false : true;
}

export function IsEmptyTextField(field?: Field<string>): boolean {
  return field?.value ? false : true;
}

export function IsEmptyArray(array?: unknown[]): boolean {
  return array && array.length > 0 ? false : true;
}

export function GetHref(field: LinkField): string {
  const href =
    (field.value.href ?? '') +
    (field.value.querystring ? '?' + field.value.querystring : '') +
    (field.value.anchor ?? '');

  return href;
}

export function GetLink(field: LinkField): JSX.Element | string {
  field.value.href = getRelativeUrl(
    field?.value?.href ?? '',
    field?.value?.linktype == repositoryConstants.strings.internal
  );

  return field?.value?.href || IsEditing() ? <JssLink field={field} /> : '';
}

export function GetLinkIfDefined(field: LinkField): JSX.Element | undefined {
  field.value.href = getRelativeUrl(
    field?.value?.href ?? '',
    field?.value?.linktype == repositoryConstants.strings.internal
  );

  return field?.value?.href ? <JssLink field={field} /> : undefined;
}

export function getRelativeUrl(url: string, isInternal: boolean): string {
  try {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
      if (isInternal) {
        return new URL(url).pathname;
      }
    }

    return url;
  } catch (error) {
    return url;
  }
}

export function GetDynamicPhName(phName: string, params: { [key: string]: string }): string {
  const id = params.DynamicPlaceholderId;
  return `${phName}-${id}`;
}

export function GetNavigationTitleField(): Field<string> {
  const { sitecoreContext } = useSitecoreContext();

  return sitecoreContext.route?.fields?.NavigationTitle as Field<string>;
}

export function GetTextFieldWrapper(props: TextProps): JSX.Element | string | undefined {
  if (IsEditing() || props.field?.value) return <TextFieldWrapper {...props} />;
  return undefined;
}

String.prototype.replaceAll = function (strReplace, strWith) {
  const esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const reg = new RegExp(esc, 'ig');
  return this.replace(reg, strWith);
};

export function GetTranslations(controls: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  const { table, locale } = useI18n();
  const _table = table(locale()) as Record<string, string>;
  const keys = Object.keys(_table);

  controls.forEach((control) => {
    const find = keys.filter((key) => key?.startsWith(control));
    if (find?.length > 0) {
      find.forEach((key) => {
        const tokens = key.split('_');
        if (tokens && tokens.length > 1) {
          const label = tokens[1];
          out[label] = _table[key];
        }
      });
    }
  });
  return out;
}

export function AssertStrNotEmpty(str: string | undefined, error: string) {
  if (IsEmptyString(str)) {
    throw new Error(error);
  }
}

export function AssertNotUndefined(obj: unknown | undefined, error: string) {
  if (!obj) {
    throw new Error(error);
  }
}

export function IsEmptyString(str: string | undefined): boolean {
  return !str || !str.trim();
}

export function PrintDate(
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale = 'en-US'
): string {
  return date.toLocaleDateString(locale, options);
}

export function PrintBool(val: boolean): string {
  return val ? 'Yes' : 'No';
}

export function GetDate(year: string, month: string, day: string): Date {
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function FirstOrUndefined<T>(options: Array<T> | undefined): T | undefined {
  return options && options.length > 0 ? options[0] : undefined;
}

export function GetStyle(params: string, styleName: string, defaultValue: string): string {
  return (
    params
      ?.split(' ')
      .filter((x) => x.includes(styleName))[0] // cta is part of the SXA "CTA Styles" within sitecore. the value is "outline|cta"
      ?.split('|')[0] ?? defaultValue
  );
}

export function HasStyle(params: string, styleName: string): boolean {
  // "grey-background-color" is the value used under the SXA Styles folder named "Feature Banner Background Color"
  return params?.split(' ').filter((x) => x.includes(styleName)).length > 0;
}

export function GetSiteName(): string {
  const { sitecoreContext } = useSitecoreContext();

  return sitecoreContext.site?.name || '';
}

export function GetLanguage(): string {
  const { sitecoreContext } = useSitecoreContext();

  return sitecoreContext.language || 'en';
}

export function GetAgentSearch(findAnAgentForm: FindAnAgentForm) {
  const submitAgentSearch = (zipCode, insuranceType) => {
    window.open(
      findAnAgentForm.link.jsonValue.value.href +
        '?zipcode=' +
        zipCode +
        '&insurancetype=' +
        insuranceType,
      '_blank'
    );
  };

  return submitAgentSearch;
}

export function GetAuthors(authors: Author[]): string {
  return authors
    .map((author) => {
      return author.name;
    })
    .join(';');
}

export function GetTags(tags: Tag[]): string {
  return tags
    .map((tag) => {
      const tagParentPath = tag.url
        .toLowerCase()
        .substring(
          0,
          tag.url.toLowerCase().indexOf(tag.name.toLowerCase().replaceAll(' ', '-')) - 1
        )
        .toLowerCase();
      const parentTagName = tagParentPath.substring(
        tagParentPath.lastIndexOf('/') + 1,
        tagParentPath.length
      );
      return parentTagName.replaceAll('-', ' ') + ':' + tag.fields.Title.value;
    })
    .join(';');
}

export function GetItemId(siteName, propertyName) {
  const customSiteInfos: CustomSiteInfo[] = JSON.parse(config.customsiteinfos) as CustomSiteInfo[];
  const customSiteInfo = customSiteInfos.find(
    (element) => element.name?.toLowerCase() === siteName?.toLowerCase()
  );
  const otherProperty = customSiteInfo?.otherProperties as Record<string, string>;
  if (otherProperty && otherProperty[propertyName]) return otherProperty[propertyName];

  return '';
}

export function GetDictionaryPhrase(key: string): string {
  const { table, locale } = useI18n();
  const dictionaryData = table(locale()) as { [key: string]: string };
  const phrase = dictionaryData[key];
  return phrase ?? '';
}
