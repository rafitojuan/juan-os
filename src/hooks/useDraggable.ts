import { useState, useCallback, useRef } from "react";

interface DragOptions {
  initialPosition: { x: number; y: number };
  onDragEnd?: (pos: { x: number; y: number }) => void;
  disabled?: boolean;
}

export function useDraggable({ initialPosition, onDragEnd, disabled }: DragOptions) {
  const [position, setPosition] = useState(initialPosition);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (e.button !== 0) return;

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: position.x,
        posY: position.y,
      };

      const onPointerMove = (moveEvent: PointerEvent) => {
        if (!dragRef.current) return;
        const dx = moveEvent.clientX - dragRef.current.startX;
        const dy = moveEvent.clientY - dragRef.current.startY;

        const newX = Math.max(0, dragRef.current.posX + dx);
        const newY = Math.max(0, dragRef.current.posY + dy);

        setPosition({ x: newX, y: newY });
      };

      const onPointerUp = () => {
        if (dragRef.current && onDragEnd) {
          onDragEnd(position);
        }
        dragRef.current = null;
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    },
    [disabled, position, onDragEnd]
  );

  return { position, setPosition, onPointerDown };
}
