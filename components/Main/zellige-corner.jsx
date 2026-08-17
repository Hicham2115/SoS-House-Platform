const zelligeStarPoints = "20,8 22.30,14.54 28.49,11.51 25.54,17.70 32,20 25.54,22.30 28.49,28.49 22.30,25.54 20,32 17.70,25.54 11.51,28.49 14.46,22.30 8,20 14.46,17.70 11.51,11.51 17.70,14.46";
const zelligeCrossPoints = "0,-5 1.41,-1.41 5,0 1.41,1.41 0,5 -1.41,1.41 -5,0 -1.41,-1.41";
export function ZelligeCorner({ id, corner, className, }) {
    return (<div className={className} style={{
            maskImage: `radial-gradient(circle at ${corner === "top-right" ? "top right" : "bottom left"}, black, transparent 70%)`,
        }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#f6f5fc"/>
            <polygon points={zelligeStarPoints} fill="#e4e1f6" stroke="#c2bce8" strokeWidth="0.8" strokeLinejoin="round"/>
            <polygon points={zelligeCrossPoints} fill="#c2bce8" transform="translate(0 0)"/>
            <polygon points={zelligeCrossPoints} fill="#c2bce8" transform="translate(40 0)"/>
            <polygon points={zelligeCrossPoints} fill="#c2bce8" transform="translate(0 40)"/>
            <polygon points={zelligeCrossPoints} fill="#c2bce8" transform="translate(40 40)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
      </svg>
    </div>);
}
