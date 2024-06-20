import { useEffect, useState } from 'react';
import './top-btn.css'

const TopBtn = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const halfWindowHeight = window.innerHeight / 2;
        const scrollTop = document.documentElement.scrollTop;
        setIsVisible(scrollTop > halfWindowHeight);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button className="scroll-to-top-button" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
};

export default TopBtn