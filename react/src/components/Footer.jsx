export default function Footer(props) {
    return (
        <footer clasName="text-muted">
            <div><strong>{props.environment}</strong></div>
        </footer>
    )
}