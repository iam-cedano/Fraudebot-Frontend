export type HomeContainerProps = {
    children: React.ReactNode;
}

export type ButtonProps = {
    label: string;
    variant: 'primary' | 'secondary';
    href: string;
    onClick?: () => void;
}

export type FeatureProps = {
    id: string;
    title: string;
    description: React.ReactNode;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
    buttons: ButtonProps[];
}

export type ReviewCardProps = {
    name: string;
    review: string;
    avatarUrl?: string;
}
