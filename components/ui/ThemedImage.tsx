import Image from "next/image";

// A screenshot that follows the site theme when a dark variant exists.
// Both <Image>s are lazy, so the one hidden by `dark:` (display: none) is
// never downloaded. Without a dark variant it's a single image.
export function ThemedImage({
  src,
  darkSrc,
  alt,
  sizes,
  eager = false,
}: {
  src: string;
  darkSrc?: string;
  alt: string;
  sizes: string;
  eager?: boolean;
}) {
  if (!darkSrc) {
    return <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} className="object-cover" />;
  }
  return (
    <>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover dark:hidden" />
      <Image src={darkSrc} alt={alt} fill sizes={sizes} className="hidden object-cover dark:block" />
    </>
  );
}
