export default function ProductGridSkeleton() {
  return (
    <div
      className="mx-auto flex-1 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      style={{
        maxWidth: 1200,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        columnGap: 16,
        rowGap: 20,
        alignContent: "start",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i}>
          <div
            className="animate-pulse"
            style={{
              width: "100%",
              aspectRatio: "173 / 200",
              borderRadius: 12,
              backgroundColor: "#fce7f3",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              width: "70%",
              height: 14,
              borderRadius: 4,
              backgroundColor: "#fce7f3",
              marginTop: 8,
            }}
          />
          <div
            className="animate-pulse"
            style={{
              width: "50%",
              height: 14,
              borderRadius: 4,
              backgroundColor: "#fce7f3",
              marginTop: 6,
            }}
          />
        </div>
      ))}
    </div>
  );
}
