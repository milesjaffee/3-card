
export default function Box({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-10 bg-[rgba(255,255,255,0.4)] backdrop-blur-lg rounded-2xl shadow-xl" style={{ width: '50vw', maxWidth: '100%' }}>
            {children}
        </div>
    );
}
