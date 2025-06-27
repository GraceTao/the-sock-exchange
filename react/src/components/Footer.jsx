export default function Footer() {
    const bgStyle = import.meta.env.VITE_ENVIRONMENT === "development" ? "bg-yellow" : "bg-green";

    return (
        <footer className={`${bgStyle} text-center text-bold text-muted rounded`}>
            <div><strong>{import.meta.env.VITE_ENVIRONMENT.toUpperCase()}</strong></div>
        </footer>
    )
}