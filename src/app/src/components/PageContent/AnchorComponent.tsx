interface AnchorComponentProps {
  children: React.ReactNode;
  anchorId: string;
}

const AnchorComponent = (props: AnchorComponentProps): JSX.Element => {
  if (!!props.anchorId) {
    return (
      <>
        <span id={props.anchorId}></span>
        {props.children}
      </>
    );
  } else {
    return <>{props.children}</>;
  }
};

export default AnchorComponent;
