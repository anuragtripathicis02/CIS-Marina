import Image from 'next/image';
import logo from '../../public/cis-marina-logo.png';

export function BrandLogo({ className, alt = 'CIS-Marina' }: { className?: string; alt?: string }) {
  return <Image src={logo} alt={alt} className={className} priority unoptimized />;
}