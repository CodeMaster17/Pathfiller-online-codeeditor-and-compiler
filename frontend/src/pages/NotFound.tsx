// src/pages/NotFound.js
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl">404 - Page Not Found</h1>
            <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
            <Button className='mt-2'>
                <Link to="/">
                    Go back to home
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
