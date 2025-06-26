export default function Footer(props) {
    return (
        <footer className="text-muted">
            <div><strong>{props.environment}</strong></div>
        </footer>
    )
}