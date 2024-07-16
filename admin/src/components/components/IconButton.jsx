// components/IconButton.jsx
import { Button } from '@/components/ui/button';

const IconButton = ({ icon: Icon, label, onClick, className }) => {
    return (
        <Button onClick={onClick} className={`flex items-center gap-2 ${className}`}>
            <Icon className="text-xl" />
            <span>{label}</span>
        </Button>
    );
};

export default IconButton;
