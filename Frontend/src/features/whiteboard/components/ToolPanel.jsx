import React from 'react';

// Tool Icons
const PenIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-13 13a1 1 0 0 1-.707.293H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707l13-13zM15 6l-3 3 4 4 3-3-4-4z" /></svg>;
const EraserIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.78 2.22a2.5 2.5 0 0 0-3.54 0L8.46 10H3v5h5.46l7.78-7.78a2.5 2.5 0 0 0 0-3.54zm-1.41 1.41L19.5 4.76 14.76 9.5 13.64 8.36 18.37 3.63zM12 17H5v-2h7v2z" /></svg>;
const RectIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M3 3h18v18H3z" /></svg>;
const CircleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="12" cy="12" r="9" /></svg>;
const ClearIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;


const ToolPanel = ({ tool, setTool, color, setColor, lineWidth, setLineWidth, onClear, boardBg, setBoardBg }) => {
  const drawingColors = ['#000000', '#EF4444', '#3B82F6', '#22C55E', '#EAB308', '#A855F7'];
  const bgColors = ['#FFFFFF', '#1F2937']; // White, Dark

  const getToolClass = (toolName) => `p-2 rounded-md transition-colors ${tool === toolName ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`;
  
  return (
    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 bg-gray-800 rounded-lg shadow-2xl flex flex-col items-center space-y-4">
      {/* Drawing Tools */}
      <div className="flex flex-col space-y-2">
        <button onClick={() => setTool('pen')} className={getToolClass('pen')} title="Pen"><PenIcon /></button>
        <button onClick={() => setTool('rectangle')} className={getToolClass('rectangle')} title="Rectangle"><RectIcon /></button>
        <button onClick={() => setTool('circle')} className={getToolClass('circle')} title="Circle"><CircleIcon /></button>
      </div>

      <div className="w-full h-px bg-gray-600"></div>

      {/* Eraser and Clear */}
      <div className="flex flex-col space-y-2">
        <button onClick={() => setTool('eraser')} className={getToolClass('eraser')} title="Eraser"><EraserIcon /></button>
        <button onClick={onClear} className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700" title="Clear Canvas"><ClearIcon /></button>
      </div>

      <div className="w-full h-px bg-gray-600"></div>

      {/* Line Width */}
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="lineWidth" className="text-xs text-gray-400">Width</label>
        <input 
          id="lineWidth" type="range" min="1" max="50" value={lineWidth} 
          onChange={(e) => setLineWidth(e.target.value)} 
          className="w-20 h-1 accent-blue-500 cursor-pointer"
        />
      </div>

      <div className="w-full h-px bg-gray-600"></div>

      {/* Color Palette */}
      <div className="grid grid-cols-2 gap-2">
        {drawingColors.map(c => (
          <button 
            key={c} 
            onClick={() => setColor(c)} 
            style={{ backgroundColor: c }} 
            className={`w-6 h-6 rounded-full border-2 transition-transform transform hover:scale-110 ${color === c ? 'border-white scale-110' : 'border-gray-500'}`} 
          />
        ))}
      </div>
       <div className="w-full h-px bg-gray-600"></div>
       {/* Background Color */}
       <div className="flex flex-col items-center space-y-2">
        <label className="text-xs text-gray-400">BG</label>
        <div className="flex space-x-2">
        {bgColors.map(bg => (
          <button 
            key={bg} 
            onClick={() => setBoardBg(bg)} 
            style={{ backgroundColor: bg }} 
            className={`w-6 h-6 rounded-full border-2 transition-transform transform hover:scale-110 ${boardBg === bg ? 'border-white scale-110' : 'border-gray-500'}`} 
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;

