export const Dashed = ({ style }: { style?: string }) => {
  return (
    <div
      className={`w-full border-b border-dashed border-gray-400 ${style}`}
    ></div>
  );
};
