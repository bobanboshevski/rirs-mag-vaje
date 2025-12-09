import {render, screen} from "@testing-library/react";
import {TopApartments} from "@/app/dashboard/components/TopApartments";
import {TopApartment} from "@/types/dashboardOverview";

describe("TopApartments", () => {
    const mockApartments: TopApartment[] = [
        {
            id: "apt_001",
            name: "Lakeview Apartment",
            revenue: 5000,
            bookings: 12,
            occupancyRate: 85,
        },
        {
            id: "apt_002",
            name: "Mountain View Suite",
            revenue: 4500,
            bookings: 10,
            occupancyRate: 78,
        },
        {
            id: "apt_003",
            name: "Downtown Loft",
            revenue: 3800,
            bookings: 8,
            occupancyRate: 65,
        },
    ];

    it("renders the component title with trophy icon", () => {
        render(<TopApartments apartments={mockApartments}/>);

        expect(screen.getByText("Top Performing Apartments")).toBeInTheDocument();
    });

    it("displays all apartments with correct names", () => {
        render(<TopApartments apartments={mockApartments}/>);

        expect(screen.getByText("Lakeview Apartment")).toBeInTheDocument();
        expect(screen.getByText("Mountain View Suite")).toBeInTheDocument();
        expect(screen.getByText("Downtown Loft")).toBeInTheDocument();
    });

    it("displays revenue with proper formatting", () => {
        render(<TopApartments apartments={mockApartments}/>);

        expect(screen.getByText("€5,000")).toBeInTheDocument();
        expect(screen.getByText("€4,500")).toBeInTheDocument();
        expect(screen.getByText("€3,800")).toBeInTheDocument();
    });

    it("displays booking counts", () => {
        render(<TopApartments apartments={mockApartments}/>);

        expect(screen.getByText("12 bookings")).toBeInTheDocument();
        expect(screen.getByText("10 bookings")).toBeInTheDocument();
        expect(screen.getByText("8 bookings")).toBeInTheDocument();
    });

    it("displays occupancy rates", () => {
        render(<TopApartments apartments={mockApartments}/>);

        expect(screen.getByText("85% occupied")).toBeInTheDocument();
        expect(screen.getByText("78% occupied")).toBeInTheDocument();
        expect(screen.getByText("65% occupied")).toBeInTheDocument();
    });

    it("displays ranking numbers 1, 2, 3", () => {
        render(<TopApartments apartments={mockApartments}/>);

        const rankings = screen.getAllByText(/^[1-3]$/);
        expect(rankings).toHaveLength(3);
        expect(rankings[0]).toHaveTextContent("1");
        expect(rankings[1]).toHaveTextContent("2");
        expect(rankings[2]).toHaveTextContent("3");
    });

    it("applies correct styling to first place ranking", () => {
        render(<TopApartments apartments={mockApartments}/>);

        const firstPlace = screen.getByText("1");
        expect(firstPlace).toHaveClass("bg-yellow-100", "text-yellow-700");
    });

    it("applies correct styling to second place ranking", () => {
        render(<TopApartments apartments={mockApartments}/>);

        const secondPlace = screen.getByText("2");
        expect(secondPlace).toHaveClass("bg-neutral-200", "text-neutral-700");
    });

    it("applies correct styling to third place ranking", () => {
        render(<TopApartments apartments={mockApartments}/>);

        const thirdPlace = screen.getByText("3");
        expect(thirdPlace).toHaveClass("bg-orange-100", "text-orange-700");
    });

    it("renders correctly with single apartment", () => {
        const singleApartment = [mockApartments[0]!];
        render(<TopApartments apartments={singleApartment}/>);

        expect(screen.getByText("Lakeview Apartment")).toBeInTheDocument();
        expect(screen.getByText("€5,000")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("renders correctly with empty apartments array", () => {
        render(<TopApartments apartments={[]}/>);

        expect(screen.getByText("Top Performing Apartments")).toBeInTheDocument();
        expect(screen.queryByText(/bookings/)).not.toBeInTheDocument();
    });

    it("handles large revenue numbers with proper formatting", () => {
        const highRevenueApartment: TopApartment[] = [
            {
                id: "apt_001",
                name: "Luxury Penthouse",
                revenue: 15000,
                bookings: 20,
                occupancyRate: 95,
            },
        ];

        render(<TopApartments apartments={highRevenueApartment}/>);

        expect(screen.getByText("€15,000")).toBeInTheDocument();
    });

    it("renders all apartment details together correctly", () => {
        const firstApartment: TopApartment = mockApartments[0]!;

        render(<TopApartments apartments={[firstApartment]}/>);

        const apartmentName = screen.getByText("Lakeview Apartment");
        const container = apartmentName.closest("div");

        expect(container).toBeInTheDocument();
        expect(screen.getByText("€5,000")).toBeInTheDocument();
        expect(screen.getByText("12 bookings")).toBeInTheDocument();
        expect(screen.getByText("85% occupied")).toBeInTheDocument();
    });
});