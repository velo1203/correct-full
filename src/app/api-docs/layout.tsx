export default function ApiDocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 bg-background overflow-auto">
            {children}
        </div>
    );
}
