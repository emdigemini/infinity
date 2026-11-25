type Daisy = {
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
};

const colors = [
  '#FFFDF0', // White
  '#F8A6C1', // Pink
  '#C5A5F5', // Lavender
  '#A9D6FF', // Baby blue
  '#FFF08A', // Yellow
  '#FFB74D', // Orange
];

const daisies: Daisy[] = [
  // Left edge
  { x: 5, y: 3, size: 27, color: colors[0], rotation: 10 },
  { x: 16, y: 8, size: 19, color: colors[1], rotation: 25 },
  { x: 4, y: 14, size: 22, color: colors[4], rotation: 0 },
  { x: 10, y: 19, size: 16, color: colors[5], rotation: 15 },
  { x: 6, y: 27, size: 25, color: colors[1], rotation: 30 },
  { x: 13, y: 33, size: 16, color: colors[3], rotation: 10 },
  { x: 4, y: 37, size: 19, color: colors[4], rotation: 20 },
  { x: 7, y: 44, size: 23, color: colors[0], rotation: 0 },
  { x: 18, y: 48, size: 25, color: colors[2], rotation: 15 },
  { x: 4, y: 55, size: 17, color: colors[1], rotation: 20 },
  { x: 10, y: 61, size: 26, color: colors[0], rotation: 5 },
  { x: 5, y: 70, size: 18, color: colors[2], rotation: 15 },
  { x: 15, y: 77, size: 15, color: colors[4], rotation: 0 },
  { x: 5, y: 85, size: 24, color: colors[0], rotation: 25 },
  { x: 12, y: 92, size: 22, color: colors[5], rotation: 10 },
  { x: 5, y: 97, size: 25, color: colors[1], rotation: 15 },

  // Right edge
  { x: 97, y: 2, size: 25, color: colors[0], rotation: 20 },
  { x: 81, y: 3, size: 22, color: colors[3], rotation: 10 },
  { x: 93, y: 9, size: 20, color: colors[4], rotation: 15 },
  { x: 98, y: 15, size: 21, color: colors[2], rotation: 0 },
  { x: 90, y: 20, size: 27, color: colors[0], rotation: 25 },
  { x: 95, y: 29, size: 17, color: colors[1], rotation: 15 },
  { x: 97, y: 34, size: 24, color: colors[3], rotation: 10 },
  { x: 96, y: 42, size: 25, color: colors[0], rotation: 0 },
  { x: 91, y: 49, size: 18, color: colors[5], rotation: 15 },
  { x: 97, y: 55, size: 18, color: colors[4], rotation: 10 },
  { x: 91, y: 62, size: 22, color: colors[1], rotation: 25 },
  { x: 97, y: 70, size: 17, color: colors[2], rotation: 10 },
  { x: 92, y: 77, size: 24, color: colors[0], rotation: 0 },
  { x: 96, y: 85, size: 17, color: colors[5], rotation: 20 },
  { x: 90, y: 91, size: 26, color: colors[3], rotation: 10 },
  { x: 96, y: 97, size: 24, color: colors[0], rotation: 15 },

  // Top and bottom decorations
  { x: 32, y: 1.5, size: 15, color: colors[0], rotation: 10 },
  { x: 56, y: 2.5, size: 17, color: colors[1], rotation: 20 },
  { x: 75, y: 1, size: 14, color: colors[4], rotation: 0 },
  { x: 55, y: 98, size: 18, color: colors[2], rotation: 15 },
  { x: 72, y: 97, size: 16, color: colors[4], rotation: 10 },
  { x: 32, y: 98, size: 15, color: colors[3], rotation: 25 },

   { x: 2, y: 6, size: 9, color: colors[4], rotation: 15 },
  { x: 12, y: 2, size: 8, color: colors[3], rotation: 25 },
  { x: 8, y: 11, size: 10, color: colors[0], rotation: 10 },
  { x: 19, y: 15, size: 9, color: colors[2], rotation: 30 },
  { x: 2, y: 22, size: 8, color: colors[5], rotation: 0 },
  { x: 15, y: 24, size: 11, color: colors[4], rotation: 20 },
  { x: 10, y: 30, size: 8, color: colors[3], rotation: 10 },
  { x: 2, y: 33, size: 10, color: colors[1], rotation: 15 },
  { x: 17, y: 38, size: 9, color: colors[0], rotation: 20 },
  { x: 2, y: 42, size: 8, color: colors[2], rotation: 10 },
  { x: 12, y: 53, size: 10, color: colors[5], rotation: 25 },
  { x: 18, y: 57, size: 8, color: colors[4], rotation: 0 },
  { x: 2, y: 63, size: 9, color: colors[3], rotation: 15 },
  { x: 15, y: 66, size: 10, color: colors[1], rotation: 20 },
  { x: 2, y: 74, size: 8, color: colors[4], rotation: 10 },
  { x: 10, y: 81, size: 9, color: colors[2], rotation: 25 },
  { x: 19, y: 84, size: 8, color: colors[0], rotation: 15 },
  { x: 2, y: 89, size: 10, color: colors[5], rotation: 10 },
  { x: 16, y: 95, size: 9, color: colors[3], rotation: 20 },

  // Extra tiny daisies - Right edge
  { x: 88, y: 5, size: 9, color: colors[1], rotation: 10 },
  { x: 98, y: 7, size: 8, color: colors[3], rotation: 20 },
  { x: 85, y: 13, size: 10, color: colors[4], rotation: 15 },
  { x: 98, y: 23, size: 9, color: colors[0], rotation: 0 },
  { x: 88, y: 26, size: 8, color: colors[2], rotation: 25 },
  { x: 98, y: 31, size: 10, color: colors[5], rotation: 10 },
  { x: 84, y: 37, size: 9, color: colors[1], rotation: 15 },
  { x: 98, y: 39, size: 8, color: colors[4], rotation: 20 },
  { x: 86, y: 46, size: 10, color: colors[3], rotation: 10 },
  { x: 98, y: 47, size: 9, color: colors[2], rotation: 15 },
  { x: 84, y: 57, size: 8, color: colors[0], rotation: 20 },
  { x: 98, y: 60, size: 10, color: colors[1], rotation: 10 },
  { x: 86, y: 66, size: 9, color: colors[4], rotation: 25 },
  { x: 98, y: 74, size: 8, color: colors[3], rotation: 15 },
  { x: 85, y: 80, size: 10, color: colors[5], rotation: 10 },
  { x: 98, y: 82, size: 9, color: colors[0], rotation: 20 },
  { x: 86, y: 88, size: 8, color: colors[2], rotation: 15 },
  { x: 98, y: 94, size: 10, color: colors[4], rotation: 25 },

  // Tiny flowers - Top and bottom
  { x: 23, y: 1, size: 8, color: colors[1], rotation: 10 },
  { x: 43, y: 2, size: 9, color: colors[4], rotation: 20 },
  { x: 65, y: 2, size: 8, color: colors[2], rotation: 15 },
  { x: 89, y: 1, size: 9, color: colors[5], rotation: 10 },
  { x: 24, y: 98, size: 9, color: colors[0], rotation: 20 },
  { x: 43, y: 97, size: 8, color: colors[1], rotation: 15 },
  { x: 63, y: 99, size: 10, color: colors[3], rotation: 10 },
  { x: 83, y: 98, size: 8, color: colors[4], rotation: 25 },
];

function DaisyFlower({ daisy }: { daisy: Daisy }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: `${daisy.x}%`,
        top: `${daisy.y}%`,
        width: daisy.size,
        height: daisy.size,
        transform: `translate(-50%, -50%) rotate(${daisy.rotation}deg)`,
      }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute inset-0"
          style={{
            transform: `rotate(${index * 45}deg)`,
          }}
        >
          <span
            className="absolute left-1/2 top-0 h-[42%] w-[27%] -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: daisy.color,
            }}
          />
        </span>
      ))}

      {/* Flower center */}
      <span className="absolute z-10 h-[23%] w-[23%] rounded-full bg-[#FFD54F]" />
    </div>
  );
}

export default function DaisyOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {daisies.map((daisy, index) => (
        <DaisyFlower key={index} daisy={daisy} />
      ))}
    </div>
  );
}
