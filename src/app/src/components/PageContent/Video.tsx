import Video, { VideoProps } from 'src/ui/Video/Video';
import { GetVideoComponent } from 'src/repository/Video/functions';
import AnchorComponent from './AnchorComponent';
import { GetDictionaryPhrase, IsEditing } from 'components/Helpers/ContentUtil';
import { Field, Link, LinkField, RichText, Text } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  RichTextCopy: Field<string>;
  Label: Field<string>;
  Link: LinkField;
  VideoCaption: Field<string>;
  TranscriptLink: LinkField;
}

export type VideosDataProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const VideosMarkup = ({ fields, params }: VideosDataProps): JSX.Element => {
  const VideosDefaultComponent = (): JSX.Element => <span className="is-empty-hint">Video</span>;
  const seeTranscriptText = GetDictionaryPhrase('see-transcript');

  if (fields) {
    const VideosProps: VideoProps = {
      video: GetVideoComponent({ link: fields.Link, title: fields.Title }),
      transcript: <RichText field={fields.RichTextCopy} editable={IsEditing()} />,
      caption: <Text field={fields.VideoCaption} editable={IsEditing()} />,
      isEditing: IsEditing(),
      EditingLink: (
        <>
          Edit Video Link: <Link field={fields.Link} />
        </>
      ),
      transcriptToggleText: seeTranscriptText,
      transcriptLink: (
        <>
          Edit Transcipt Link: <Link field={fields.TranscriptLink} />
        </>
      ),
    };
    return (
      <AnchorComponent anchorId={params?.RenderingIdentifier}>
        <Video {...VideosProps} />
      </AnchorComponent>
    );
  }

  return IsEditing() ? <VideosDefaultComponent /> : <></>;
};

export const Default = (props: VideosDataProps): JSX.Element => {
  return VideosMarkup(props);
};
