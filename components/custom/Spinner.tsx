interface SpinnerProps {
  width: number;
  height: number;
}

export default function Spinner({ width, height }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className="border-4 border-l-red-600 rounded-full animate-spin"
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
    </div>
  );
}
