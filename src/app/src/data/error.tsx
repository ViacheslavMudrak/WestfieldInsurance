import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import Button from 'src/ui/Button/Button';
import { ErrorProps } from 'src/ui/Error/Error';

export const exampleErrorProps = (props: ErrorProps): ErrorProps => {
  const { title, image, richTextCopy, link, accessToken, orgId } = props;

  return {
    title: title ? title : <div>{'Page not found'}</div>,
    image: image ? (
      image
    ) : (
      <Image width="590" height="470" alt="Alt goes here" src="/error-image.png" quality={100} />
    ),
    richTextCopy: richTextCopy ? (
      richTextCopy
    ) : (
      <RichText
        field={{
          value: 'This page does not exist.',
        }}
      />
    ),
    link: link ? (
      link
    ) : (
      <Button variant={'primary'} href="/" target="_blank">
        Home
      </Button>
    ),
    accessToken: accessToken ?? `xx6e955fb1-0830-44c9-9099-b079b79c7743`,
    orgId: orgId ?? `westfieldinsurancenonproduction144xzimyj`,
  };
};
