import Image from "next/image";

export default function UserAvatar({
  name,
  image,
  size,
  className = "",
}: {
  name: string;
  image?: string | null;
  size: number;
  className?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-primary font-semibold text-primary-content ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {image ? (
        <Image src={image} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        initial
      )}
    </span>
  );
}
