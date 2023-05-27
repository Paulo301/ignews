import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  text: string;
  activeClassName: string;
}

export function ActiveLink({ text, activeClassName, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';

  return (
    <Link
      {...rest}
      className={className}
    >
      {text}
    </Link>
  );
}