type Props = {
    title: string;
  };
  
  export const HeaderTag = ({ title }: Props) => {
    return (
      <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">
        {title}
      </h4>
    );
  };