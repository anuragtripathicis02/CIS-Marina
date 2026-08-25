export function generateStaticParams() {
  return [{ id: 'y1' }, { id: 'y2' }, { id: 'y3' }];
}

export const dynamicParams = false;

export default function FleetDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}