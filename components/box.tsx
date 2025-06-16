
export default function Box({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full px-10 bg-[rgba(255,255,255,0.4)] backdrop-blur-lg rounded-2xl shadow-xl">
          {children}
          
          </div>
    );
}
