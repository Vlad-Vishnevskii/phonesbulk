export const ColoredText = ({ text }: { text: string }) => {
  const hasColon = text.includes(":");

  if (!hasColon) {
    // Если символ ":" отсутствует, возвращаем исходный текст
    return <div>{text}</div>;
  }

  // Разделяем текст на две части: до и после символа ":", включая сам символ в первую часть
  const indexOfColon = text.indexOf(":");
  const beforeColon = text.substring(0, indexOfColon + 1); // Включаем символ ":" в первую часть
  const afterColon = text.substring(indexOfColon + 1); // Текст после символа ":"

  return (
    <div>
      <span className="font-bold text-dark_green">{beforeColon}</span>

      {afterColon && <span>{afterColon}</span>}
    </div>
  );
};

export default ColoredText;
