import { TransformControls } from "@react-three/drei";

const DragBeaker = ({ objectRef }) => {
  if (!objectRef?.current) return null;

  return (
    <TransformControls object={objectRef.current} mode="translate" />
  );
};

export default DragBeaker;