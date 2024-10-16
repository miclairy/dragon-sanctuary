import SvgIcon from './cloud.svg';

export interface SvgProps {
    className?: string;
    width?: number | string;
}

export const Cloud = ({ className = 'icon', width = '20px' }: SvgProps) => (
    <SvgIcon className={className} width={width} name="cloud" />
);