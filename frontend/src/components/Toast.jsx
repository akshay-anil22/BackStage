import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

// A self-contained, reusable Toast notification component.
const Toast = ({ message, type, onDismiss }) => {
    const isSuccess = type === 'success';

    // Dynamically set styles based on the 'type' prop (success or error)
    const containerStyles = {
        bgColor: isSuccess ? 'bg-yellow-100' : 'bg-red-100',
        textColor: isSuccess ? 'text-yellow-800' : 'text-red-800',
    };

    const Icon = isSuccess ? CheckCircle2 : XCircle;

    return (
        <div className="fixed  bottom-8 right-104 z-50 animate-fade-in-down">
            <div className={`flex items-center gap-4 p-4 rounded-lg shadow-lg ${containerStyles.bgColor} ${containerStyles.textColor}`}>
                <Icon size={24} />
                <p className="font-sans font-semibold">{message}</p>
                <button onClick={onDismiss} className="ml-4 font-bold text-lg leading-none">&times;</button>
            </div>
             {/* Scoped CSS for the animation to keep the component self-contained */}
             <style>{`
                @keyframes fade-in-down { 
                    from { opacity: 0; transform: translateY(-20px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                .animate-fade-in-down { 
                    animation: fade-in-down 0.5s ease-out forwards; 
                }
            `}</style>
        </div>
    );
};

export default Toast;
