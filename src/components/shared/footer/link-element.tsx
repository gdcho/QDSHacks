import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  type?: string;
  title?: string;
  link: string;
  description?: string;
  logo?: ReactNode;
};

export const LinkElement = ({
  type,
  title,
  link,
  description,
  logo,
}: Props) => {
  switch (type) {
    case "column":
      return (
        <p>
          <Link
            className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href={link}
          >
            {title}
          </Link>
          <span className="inline font-medium text-yellow-400 dark:text-blue-500">
            {" "}{description}
          </span>
        </p>
      );
    case "row":
      return (
        <Link
          className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href={link}
        >
          {title}
        </Link>
      );
    default:
      return (
        <Link
          className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {logo}
        </Link>
      );
  }
};