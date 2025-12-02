// app/admin/components/DashboardCard.tsx
export default function DashboardCard({
                                          title,
                                          value,
                                      }: {
    title: string;
    value: string | number;
}) {
    return (
        <div className="bg-white shadow rounded-xl p-6 border border-neutral-100">
            <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
            <p className="text-2xl font-semibold text-neutral-900 mt-2">{value}</p>
        </div>
    );
}