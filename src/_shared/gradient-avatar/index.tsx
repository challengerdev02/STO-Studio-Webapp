import stringHash from 'string-hash';
import hslTriad from 'hsl-triad';
import hslRgb from 'hsl-rgb';

interface GradientAvatarProps {
  value: string;
  size?: number;
}
export const GradientAvatar = (props: GradientAvatarProps) => {
  const { value, size = 24 } = props;
  const hash = stringHash(value.toLowerCase());
  const colors = hslTriad(hash % 360, 1, 0.5);
  const color1 = hslRgb(colors[0][0], colors[0][1], colors[0][2]);
  const color2 = hslRgb(colors[1][0], colors[1][1], colors[1][2]);
  const color1str = `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`;
  const color2str = `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={value}>
          <stop stopColor={color1str} offset="0%" />
          <stop stopColor={color2str} offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect
          id="Rectangle"
          fill={`url(#${value})`}
          x="0"
          y="0"
          width={'80'}
          height="80"
        />
      </g>
    </svg>
  );
};
