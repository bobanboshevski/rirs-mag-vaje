import Home from '@/app/page';
import {redirect} from 'next/navigation';

// Mock Next.js redirect
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('Landing page redirect', () => {
    it('redirects to /dashboard on load', async () => {
        await Home(); // Home() is an async server component

        expect(redirect).toHaveBeenCalledWith('/dashboard');
    });
});