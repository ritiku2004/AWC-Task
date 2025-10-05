import React, { useRef, useEffect, useState } from 'react';
import { useSocket } from '../../../context/SocketProvider';

const Canvas = ({ roomId, color, lineWidth, tool, boardBg }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingActions, setDrawingActions] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const socket = useSocket();

  // --- Core Drawing Functions ---

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawingActions.forEach(action => {
      drawAction(context, action);
    });

    if (currentShape) {
      drawAction(context, currentShape);
    }
  };

  const drawAction = (context, action) => {
    context.strokeStyle = action.drawColor;
    context.lineWidth = action.width;

    if (action.tool === 'pen' || action.tool === 'eraser') {
      context.beginPath();
      context.moveTo(action.x0, action.y0);
      context.lineTo(action.x1, action.y1);
      context.stroke();
    } else if (action.tool === 'rectangle') {
      context.strokeRect(action.x0, action.y0, action.x1 - action.x0, action.y1 - action.y0);
    } else if (action.tool === 'circle') {
      const radius = Math.sqrt(Math.pow(action.x1 - action.x0, 2) + Math.pow(action.y1 - action.y0, 2));
      context.beginPath();
      context.arc(action.x0, action.y0, radius, 0, 2 * Math.PI);
      context.stroke();
    }
  };

  // --- Effects for Setup and Socket Handling ---

  useEffect(() => {
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext('2d');
    contextRef.current.lineCap = 'round';
    contextRef.current.lineJoin = 'round';
    
    const handleResize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      redrawCanvas();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []); // Runs once on mount

  useEffect(redrawCanvas, [drawingActions, currentShape]); // Redraw whenever actions change

  useEffect(() => {
    if (!socket) return;
    socket.emit('whiteboard:join', { roomId });

    const handleDraw = (action) => setDrawingActions(prev => [...prev, action]);
    const handleHistory = (history) => setDrawingActions(history);
    const handleClear = () => setDrawingActions([]);

    socket.on('whiteboard:draw', handleDraw);
    socket.on('whiteboard:history', handleHistory);
    socket.on('whiteboard:clear', handleClear);

    return () => {
      socket.off('whiteboard:draw', handleDraw);
      socket.off('whiteboard:history', handleHistory);
      socket.off('whiteboard:clear', handleClear);
    };
  }, [socket, roomId]);

  // --- Mouse Event Handlers ---

  let lastPos = { x: 0, y: 0 };

  const startDrawing = ({ nativeEvent }) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    lastPos = { x: offsetX, y: offsetY };
    
    if (tool === 'rectangle' || tool === 'circle') {
      setCurrentShape({
        tool,
        x0: offsetX, y0: offsetY,
        x1: offsetX, y1: offsetY,
        drawColor: color,
        width: lineWidth
      });
    }
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (currentShape) {
      const finalShape = { ...currentShape, roomId };
      socket.emit('whiteboard:draw', finalShape);
      setDrawingActions(prev => [...prev, finalShape]);
      setCurrentShape(null);
    }
  };

  const handleDraw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    if (tool === 'pen' || tool === 'eraser') {
      const action = {
        tool,
        x0: lastPos.x, y0: lastPos.y,
        x1: offsetX, y1: offsetY,
        drawColor: tool === 'eraser' ? boardBg : color,
        width: lineWidth,
        roomId,
      };
      // Draw locally and send to others
      drawAction(contextRef.current, action);
      socket.emit('whiteboard:draw', action);
      // Add to local history for redraws
      setDrawingActions(prev => [...prev, action]);
      lastPos = { x: offsetX, y: offsetY };
    } else if (currentShape) {
      setCurrentShape(prev => ({ ...prev, x1: offsetX, y1: offsetY }));
    }
  };

  return (
    <canvas 
      ref={canvasRef} 
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={handleDraw}
      onMouseLeave={finishDrawing}
      className="absolute top-0 left-0"
      style={{ backgroundColor: boardBg }}
    />
  );
};

export default Canvas;

