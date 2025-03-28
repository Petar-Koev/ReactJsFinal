export default function MovieDetailsList({ items }) {
  return (
    <>
      {items.map(({ label, value }) =>
        value ? (
          <p key={label}>
            <strong>{label}:</strong> {value}
          </p>
        ) : null
      )}
    </>
  );
}
