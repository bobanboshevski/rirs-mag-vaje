import '@testing-library/jest-dom'

jest.mock('lucide-react', () => ({
    Trophy: () => <div>TrophyIcon</div>,
    // ... other icons
}));