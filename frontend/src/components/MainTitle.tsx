const MainTitle: React.FunctionComponent<{ title: string[] }> = ({ title }) => {
    return (
      <h1 className="w-full text-left text-title_orange font-title_font text-7xl tracking-tight md:text-8xl">
        {title.map((line, index) => (
          <span key={index}>
            {line}
            {index < title.length - 1 && <br />}
          </span>
        ))}
      </h1>
    );
  };
  
  export default MainTitle;