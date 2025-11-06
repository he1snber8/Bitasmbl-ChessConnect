import { useEffect } from "react";
import { io } from "socket.io-client";


export default function ChessBoard() {
useEffect(() => {
const socket = io("http://localhost:4000");
socket.emit("join_game");


socket.on("board_update", (state) => {
console.log("Board updated:", state);
});


return () => socket.disconnect();
}, []);


return (
<div className="grid grid-cols-8 w-80 h-80">
{Array.from({ length: 64 }).map((_, idx) => (
<div
key={idx}
className={`border border-gray-700 ${
Math.floor(idx / 8) % 2 === idx % 2
? "bg-gray-300"
: "bg-gray-600"
}`}
/>
))}
</div>
);
}
