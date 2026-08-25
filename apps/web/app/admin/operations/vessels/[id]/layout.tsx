export function generateStaticParams() {
  return [{ id: 'y1' }, { id: 'y2' }, { id: 'y3' }];
}

export const dynamicParams = false;

export default function VesselDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}